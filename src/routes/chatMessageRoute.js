import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
import PermissionCheck from '../middleware/PermissionCheck'

const router = new KoaRouter()
router
    .get('/chatMessage/get', controllers.chatMessage.getChatMessage)
    .get('/chatMessage/paged', controllers.chatMessage.getChatMessagePagedList)
    .del('/chatMessage/del', controllers.chatMessage.delChatMessage)
    .del('/chatMessage/batchdel', controllers.chatMessage.delChatMessages)
    .post('/chatMessage/save', controllers.chatMessage.saveChatMessage)

module.exports = router