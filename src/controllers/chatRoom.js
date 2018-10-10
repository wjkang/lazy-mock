import chatRoomService from '../services/chatRoomService'
import * as responseTemplate from '../lib/responseTemplate'

export let getChatRoom = async (ctx) => {
    let id = ctx.query.id
    let chatRoom = await chatRoomService.getChatRoom(id)
    if (!chatRoom) {
        return responseTemplate.businessError(ctx, "chatRoom不存在!")
    }
    return responseTemplate.success(ctx, post)
}
export let getChatRoomPagedList = async (ctx, next) => {
    let pageIndex = ctx.query.pageIndex
    let pageSize = ctx.query.pageSize
    let sortBy = ctx.query.sortBy
    let descending = ctx.query.descending
    let filter ={
        
          id:ctx.query.id,
        
          name:ctx.query.name,
        
          createdBy:ctx.query.createdBy,
        
    }
    let pagedList = await chatRoomService.getChatRoomPagedList(pageIndex, pageSize, sortBy, descending, filter)
    responseTemplate.success(ctx, pagedList)
    return next()
}
export let delChatRoom = async (ctx) => {
    let id = ctx.query.id
    await chatRoomService.delChatRoom(id)
    return responseTemplate.success(ctx, null)
}

export let delChatRooms = async (ctx) => {
    let ids = JSON.parse(ctx.query.ids)
    for (let id of ids) {
        await chatRoomService.delChatRoom(id)
    }
    return responseTemplate.success(ctx, null)
}

export let saveChatRoom = async (ctx) => {
    let entity = ctx.request.body
    
      
    
      
        if(entity.name==""){
          return responseTemplate.businessError(ctx, "name不能为空!")
        }
      
    
      
        if(entity.createdBy==""){
          return responseTemplate.businessError(ctx, "createdBy不能为空!")
        }
      
    
    let result = await chatRoomService.saveChatRoom(entity)
    if (!result.success) {
        return responseTemplate.businessError(ctx, result.msg)
    }
    return responseTemplate.success(ctx, null)
}
