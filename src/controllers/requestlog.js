import requestLogService from '../services/requestLogService'
import * as responseTemplate from '../lib/responseTemplate'

export let getRequestLogPagedList = async (ctx) => {
    let pageIndex = ctx.query.pageIndex
    let pageSize = ctx.query.pageSize
    let sortBy = ctx.query.sortBy
    let descending = ctx.query.descending
    let pagedList = await requestLogService.getRequestLogPagedList(pageIndex, pageSize, sortBy, descending)
    return responseTemplate.success(ctx, pagedList)
}