import roleService from '../services/roleService'
import menuService from '../services/memuService'
import * as responseTemplate from '../lib/responseTemplate'
export let getRole = async (ctx) => {
    let id = ctx.params.id
    let role = await roleService.getRole(id)
    if (!role) {
        return responseTemplate.businessError(ctx, "角色不存在")
    }
    return responseTemplate.success(ctx, role)
}
export let getRolePagedList = async (ctx) => {
    let pageIndex = ctx.query.pageIndex
    let pageSize = ctx.query.pageSize
    let sortBy = ctx.query.sortBy
    let descending = ctx.query.descending
    let filter = JSON.parse(ctx.query.filter)
    let pagedList = await roleService.getRolePagedList(pageIndex, pageSize, sortBy, descending, filter)
    return responseTemplate.success(ctx, pagedList)
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
    if (func.name == "") {
        return responseTemplate.businessError(ctx, "名称不能为空!")
    }
    if (func.code == "") {
        return responseTemplate.businessError(ctx, "编码不能为空!")
    }
    let result = await roleService.saveRole(func)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}
export let getRolePermissions = async (ctx) => {
    let roleId = ctx.params.roleId;
    let rolePermissions = await roleService.getRoleFunctions(roleId);
    return responseTemplate.success(ctx, rolePermissions)
}
export let savePermission = async (ctx) => {
    let data = ctx.request.body;
    await roleService.savePermission(data.roleId, data.permissions)
    return responseTemplate.success(ctx, null)
}