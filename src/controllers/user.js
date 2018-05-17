import userService from '../services/userService'
import * as responseTemplate from '../lib/responseTemplate'

export let getUserInfo = async (ctx) => {
    let user = ctx.user;
    if (!user || !user.userId) {
        return responseTemplate.businessError(ctx, '获取用户信息失败!')
    }
    let [userInfo, userRole, permissions,isAdmin] = await Promise.all([userService.getUserById(user.userId), userService.getUserRole(user.userId), userService.getUserPermission(user.userId),userService.isAdmin(user.userId)])
    if (!userInfo) {
        return responseTemplate.businessError(ctx, '获取用户信息失败!')
    }
    return responseTemplate.success(ctx, {
        userName: userInfo.name,
        userRole: userRole,
        userPermission: permissions,
        isAdmin:isAdmin?1:0,
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
    if(func.name==""){
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