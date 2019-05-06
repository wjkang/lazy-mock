import interfaceService from '../services/interfaceService'
import * as responseTemplate from '../lib/responseTemplate'

export let getInterface = async (ctx) => {
    let id = ctx.params.id
    console.log(id)
    let entity = await interfaceService.getInterface(id)
    if (!entity) {
        return responseTemplate.businessError(ctx, "接口不存在!")
    }
    return responseTemplate.success(ctx, entity)
}
export let getInterfacePagedList = async (ctx, next) => {
    let pageIndex = ctx.query.pageIndex
    let pageSize = ctx.query.pageSize
    let sortBy = ctx.query.sortBy
    let descending = ctx.query.descending
    let filter = {
        id: ctx.query.id,
        name: ctx.query.name,
        path: ctx.query.path,
        method: ctx.query.method,
        isLocked: ctx.query.isLocked,
        description: ctx.query.description,
        functionId: ctx.query.functionId
    }
    let pagedList = await interfaceService.getInterfacePagedList(pageIndex, pageSize, sortBy, descending, filter)
    return responseTemplate.success(ctx, pagedList)
}
export let delInterface = async (ctx) => {
    let id = ctx.query.id
    await interfaceService.delInterface(id)
    return responseTemplate.success(ctx, null)
}

export let delInterfaces = async (ctx) => {
    let ids = JSON.parse(ctx.query.ids)
    for (let id of ids) {
        await interfaceService.delInterface(id)
    }
    return responseTemplate.success(ctx, null)
}

export let saveInterface = async (ctx) => {
    let entity = ctx.request.body
    if (entity.name == "") {
        return responseTemplate.businessError(ctx, "名称不能为空!")
    }
    if (entity.path == "") {
        return responseTemplate.businessError(ctx, "接口地址不能为空!")
    }
    if (entity.method == "") {
        return responseTemplate.businessError(ctx, "接口方法不能为空!")
    }
    let result = await interfaceService.saveInterface(entity)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}
export let relateInterface = async (ctx) => {
    let functionInterface = ctx.request.body
    await interfaceService.relate(functionInterface)
    return responseTemplate.success(ctx, null)
}
