import chatMessageService from '../services/chatMessageService'
import * as responseTemplate from '../lib/responseTemplate'

export let getChatMessage = async (ctx) => {
    let id = ctx.query.id
    let chatMessage = await chatMessageService.getChatMessage(id)
    if (!chatMessage) {
        return responseTemplate.businessError(ctx, "chatMessage不存在!")
    }
    return responseTemplate.success(ctx, post)
}
export let getChatMessagePagedList = async (ctx, next) => {
    let pageIndex = ctx.query.pageIndex
    let pageSize = ctx.query.pageSize
    let sortBy = ctx.query.sortBy
    let descending = ctx.query.descending
    let filter = {

        id: ctx.query.id,

        type: ctx.query.type,

        contentType: ctx.query.contentType,

        status: ctx.query.status,

        toId: ctx.query.toId,

        fromId: ctx.query.fromId,

        message: ctx.query.message,

        createdBy: ctx.query.createdBy,

        createdDate: ctx.query.createdDate,

        maxCreatedDate: ctx.query.maxCreatedDate

    }
    let pagedList = await chatMessageService.getChatMessagePagedList(pageIndex, pageSize, sortBy, descending, filter)
    responseTemplate.success(ctx, pagedList)
    return next()
}
export let delChatMessage = async (ctx) => {
    let id = ctx.query.id
    await chatMessageService.delChatMessage(id)
    return responseTemplate.success(ctx, null)
}

export let delChatMessages = async (ctx) => {
    let ids = JSON.parse(ctx.query.ids)
    for (let id of ids) {
        await chatMessageService.delChatMessage(id)
    }
    return responseTemplate.success(ctx, null)
}

export let saveChatMessage = async (ctx) => {
    let entity = ctx.request.body




    if (entity.type == "") {
        return responseTemplate.businessError(ctx, "type不能为空!")
    }



    if (entity.contentType == "") {
        return responseTemplate.businessError(ctx, "contentType不能为空!")
    }



    if (entity.status == "") {
        return responseTemplate.businessError(ctx, "status不能为空!")
    }



    if (entity.toId == "") {
        return responseTemplate.businessError(ctx, "toId不能为空!")
    }



    if (entity.fromId == "") {
        return responseTemplate.businessError(ctx, "fromId不能为空!")
    }



    if (entity.message == "") {
        return responseTemplate.businessError(ctx, "message不能为空!")
    }



    if (entity.createdBy == "") {
        return responseTemplate.businessError(ctx, "createdBy不能为空!")
    }



    if (entity.createdDate == "") {
        return responseTemplate.businessError(ctx, "createdDate不能为空!")
    }


    let result = await chatMessageService.saveChatMessage(entity)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}
