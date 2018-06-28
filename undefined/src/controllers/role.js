import roleService from '../services/roleService'
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
    let entity = ctx.request.body
    
      
    
      
        if(entity.name==""){
          return responseTemplate.businessError(ctx, "角色名称不能为空!")
        }
      
    
    let result = await roleService.saveRole(entity)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}
