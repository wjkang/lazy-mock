import chatRoomUserService from '../services/chatRoomUserService'
import * as responseTemplate from '../lib/responseTemplate'

export let getChatRoomUser = async (ctx) => {
    let id = ctx.query.id
    let chatRoomUser = await chatRoomUserService.getChatRoomUser(id)
    if (!chatRoomUser) {
        return responseTemplate.businessError(ctx, "chatRoomUser不存在!")
    }
    return responseTemplate.success(ctx, post)
}
export let getChatRoomUserPagedList = async (ctx, next) => {
    let pageIndex = ctx.query.pageIndex
    let pageSize = ctx.query.pageSize
    let sortBy = ctx.query.sortBy
    let descending = ctx.query.descending
    let filter ={
        
          id:ctx.query.id,
        
          userId:ctx.query.userId,
        
          roomId:ctx.query.roomId,
        
    }
    let pagedList = await chatRoomUserService.getChatRoomUserPagedList(pageIndex, pageSize, sortBy, descending, filter)
    responseTemplate.success(ctx, pagedList)
    return next()
}
export let delChatRoomUser = async (ctx) => {
    let id = ctx.query.id
    await chatRoomUserService.delChatRoomUser(id)
    return responseTemplate.success(ctx, null)
}

export let delChatRoomUsers = async (ctx) => {
    let ids = JSON.parse(ctx.query.ids)
    for (let id of ids) {
        await chatRoomUserService.delChatRoomUser(id)
    }
    return responseTemplate.success(ctx, null)
}

export let saveChatRoomUser = async (ctx) => {
    let entity = ctx.request.body
    
      
    
      
        if(entity.userId==""){
          return responseTemplate.businessError(ctx, "userId不能为空!")
        }
      
    
      
        if(entity.roomId==""){
          return responseTemplate.businessError(ctx, "roomId不能为空!")
        }
      
    
    let result = await chatRoomUserService.saveChatRoomUser(entity)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}
