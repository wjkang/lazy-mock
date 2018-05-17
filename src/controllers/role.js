import roleService from '../services/roleService'
import menuService from '../services/memuService'
import * as responseTemplate from '../lib/responseTemplate'

export let getRolePagedList = async (ctx, next) => {
    let pageIndex = ctx.query.pageIndex
    let pageSize = ctx.query.pageSize
    let sortBy = ctx.query.sortBy
    let descending = ctx.query.descending
    let filter = JSON.parse(ctx.query.filter)
    let pagedList = await roleService.getRolePagedList(pageIndex, pageSize, sortBy, descending, filter)
    responseTemplate.success(ctx, pagedList)
    return next()
}
export let delRole = async (ctx) => {
    let id = ctx.query.id
    await roleService.delRole(id)
    return responseTemplate.success(ctx, null)
}

export let delRoles = async (ctx) => {
    let ids = JSON.parse(ctx.query.ids)
    for (let id of ids) {
        await roleService.delRole(id)
    }
    return responseTemplate.success(ctx, null)
}

export let saveRole = async (ctx) => {
    let func = ctx.request.body
    if(func.name==""){
        return responseTemplate.businessError(ctx, "名称不能为空!")
    }
    if(func.code==""){
        return responseTemplate.businessError(ctx, "编码不能为空!")
    }
    let result = await roleService.saveRole(func)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}

export let savePermission = async (ctx) => {
    let data = ctx.request.body;
    data.permissions = data.permissions.map(s => {
        s = JSON.parse(s)
        return s
    })
    let menuWithChildren = await menuService.getMenuFunctions(data.moduleId)
    let menuIds = menuWithChildren.map(s => {
        return s.id
    })
    await roleService.savePermission(menuIds,data.roleId,data.permissions)
    return responseTemplate.success(ctx, null)
}