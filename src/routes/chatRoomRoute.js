import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
import PermissionCheck from '../middleware/PermissionCheck'

const router = new KoaRouter()
router
    .get('/chatRoom/get', controllers.chatRoom.getChatRoom)
    .get('/chatRoom/paged', controllers.chatRoom.getChatRoomPagedList)
    .del('/chatRoom/del', controllers.chatRoom.delChatRoom)
    .del('/chatRoom/batchdel', controllers.chatRoom.delChatRooms)
    .post('/chatRoom/save', controllers.chatRoom.saveChatRoom)

module.exports = router