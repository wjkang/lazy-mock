import functionService from '../services/functionService'
import * as responseTemplate from '../lib/responseTemplate'

export let getFunctionPagedList = async (ctx) => {
    let pageIndex = ctx.query.pageIndex
    let pageSize = ctx.query.pageSize
    let sortBy = ctx.query.sortBy
    let descending = ctx.query.descending
    let filter = JSON.parse(ctx.query.filter)
    let pagedList = await functionService.getFunctionPagedList(pageIndex, pageSize, sortBy, descending, filter)
    return responseTemplate.success(ctx, pagedList)
}
export let delFuntion = async (ctx) => {
    let id = ctx.query.id
    await functionService.delFuntion(id)
    return responseTemplate.success(ctx, null)
}

export let delFuntions = async (ctx) => {
    let ids = JSON.parse(ctx.query.ids)
    for (let id of ids) {
        await functionService.delFuntion(id)
    }
    return responseTemplate.success(ctx, null)
}

export let saveFuntion = async (ctx) => {
    let func = ctx.request.body
    if(func.name==""){
        return responseTemplate.businessError(ctx, "名称不能为空!")
    }
    if(func.code==""){
        return responseTemplate.businessError(ctx, "编码不能为空!")
    }
    if(!func.moduleId){
        return responseTemplate.businessError(ctx, "请选择模块!")
    }
    let result = await functionService.saveFunction(func)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}