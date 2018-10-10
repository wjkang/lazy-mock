import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
import PermissionCheck from '../middleware/PermissionCheck'

const router = new KoaRouter()
router
    .get('/chatRoomUser/get', controllers.chatRoomUser.getChatRoomUser)
    .get('/chatRoomUser/paged', controllers.chatRoomUser.getChatRoomUserPagedList)
    .del('/chatRoomUser/del', controllers.chatRoomUser.delChatRoomUser)
    .del('/chatRoomUser/batchdel', controllers.chatRoomUser.delChatRoomUsers)
    .post('/chatRoomUser/save', controllers.chatRoomUser.saveChatRoomUser)

module.exports = router