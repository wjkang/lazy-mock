import userService from '../services/userService'
import menuService from '../services/memuService'
import routeService from '../services/routeService'
import interfaceService from '../services/interfaceService'
import * as responseTemplate from '../lib/responseTemplate'
let formatAccessMenus = (menus) => {
    let f = (item, children) => {
        item.children = []
        for (let child of children) {
            let itemChild = {
                title: child.title,
                path: child.path,
                icon: child.icon
            }
            if (child.children && child.children.length > 0) {
                f(itemChild, child.children)
            }
            item.children.push(itemChild)
        }
    }
    let list = []
    for (let menu of menus) {
        let item = {
            title: menu.title,
            path: menu.path,
            icon: menu.icon
        }
        if (menu.children && menu.children.length > 0) {
            f(item, menu.children)
        }
        list.push(item)
    }
    return list
}
let formatAccessRoutes = (routes) => {
    let f = (item, children) => {
        item.children = []
        for (let child of children) {
            let itemChild = {
                name: child.name,
                path: child.path,
                component: child.component,
                componentPath: child.componentPath,
                meta: {
                    title: child.title,
                    cache: child.cache
                }
            }
            if (child.children && child.children.length > 0) {
                f(itemChild, child.children)
            }
            item.children.push(itemChild)
        }
    }
    let list = []
    for (let route of routes) {
        let item = {
            name: route.name,
            path: route.path,
            component: route.component,
            componentPath: route.componentPath,
            meta: {
                title: route.title,
                cache: route.cache
            }
        }
        if (route.children && route.children.length > 0) {
            f(item, route.children)
        }
        list.push(item)
    }
    return list
}
export let getUser = async (ctx) => {
    let id = ctx.params.id
    let user = await userService.getUserById(id)
    if (!user) {
        return responseTemplate.businessError(ctx, "用户不存在")
    }
    return responseTemplate.success(ctx, user)
}
export let getUserInfo = async (ctx) => {
    let user = ctx.user;
    if (!user || !user.userId) {
        return responseTemplate.businessError(ctx, '获取用户信息失败!')
    }
    let [userInfo,
        userRole,
        permissions,
        accessMenus,
        accessRoutes,
        accessInterfaces,
        isAdmin
    ] = await Promise.all([
        userService.getUserById(user.userId),
        userService.getUserRole(user.userId),
        userService.getUserPermission(user.userId),
        menuService.getAccessMenuList(user.userId),
        routeService.getAccessRouteList(user.userId),
        interfaceService.getAccessInterfaceList(user.userId),
        userService.isAdmin(user.userId)
    ])
    if (!userInfo) {
        return responseTemplate.businessError(ctx, '获取用户信息失败!')
    }
    return responseTemplate.success(ctx, {
        userName: userInfo.name,
        userRoles: userRole,
        userPermissions: permissions,
        accessMenus: formatAccessMenus(accessMenus),
        accessRoutes: formatAccessRoutes(accessRoutes),
        accessInterfaces: accessInterfaces.map(s => { return { path: s.path, method: s.method } }),
        isAdmin: isAdmin ? 1 : 0,
        avatarUrl: 'https://api.adorable.io/avatars/85/abott@adorable.png'
    })
}

export let getUserPagedList = async (ctx) => {
    let pageIndex = ctx.query.pageIndex
    let pageSize = ctx.query.pageSize
    let sortBy = ctx.query.sortBy
    let descending = ctx.query.descending
    let filter = JSON.parse(ctx.query.filter)
    let pagedList = await userService.getUserPagedList(pageIndex, pageSize, sortBy, descending, filter)
    return responseTemplate.success(ctx, pagedList)
}

export let delUser = async (ctx) => {
    let id = ctx.query.id
    console.log(id)
    let result = await userService.delUser(id)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}

export let delUsers = async (ctx) => {
    let ids = JSON.parse(ctx.query.ids)
    for (let id of ids) {
        await userService.delUser(id)
    }
    return responseTemplate.success(ctx, null)
}

export let saveUser = async (ctx) => {
    let func = ctx.request.body
    if (func.name == "") {
        return responseTemplate.businessError(ctx, "账号不能为空!")
    }
    let result = await userService.saveUser(func)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}

export let editRoleUser = async (ctx) => {
    let roleUser = ctx.request.body
    await userService.editRoleUser(roleUser)
    return responseTemplate.success(ctx, null)
}