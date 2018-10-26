import chatMessageService from '../../services/chatMessageService';
export default {
    chatMessage: async function (context) {
        let msg = {
            type: 0,//broadcast=0,private chat=1,room chat=2
            contentType: 1,//text=1,img=2
            status: 2,//1=forRead,2=readed
            toId: "",
            fromId: context.req.args.from.id,
            message: context.req.args.msg,
            createdBy: context.req.args.from.id,
            createdDate: new Date().getTime()
        }
        await chatMessageService.saveChatMessage(msg);
        context.req.args.createdDate = msg.createdDate;
        context.server.emit(context.req.event, context.req.args);
    },
    privateChatMessage: async function (context) {
        let toClient = context.server.clients.get(context.req.args.to.user.id)
        var isToClientOpen = toClient && toClient.readyState == 1;
        let msg = {
            type: 1,//broadcast=0,private chat=1,room chat=2
            contentType: 1,//text=1,img=2
            status: isToClientOpen ? 2 : 1,//1=forRead,2=readed
            toId: context.req.args.to.user.id,
            fromId: context.req.args.from.id,
            message: context.req.args.msg,
            createdBy: context.req.args.from.id,
            createdDate: new Date().getTime()
        }
        await chatMessageService.saveChatMessage(msg);
        context.req.args.createdDate = msg.createdDate;
        context.server.emit(context.req.event, context.req.args);
    },
    roomChatMessage: async function (context) {
        let msg = {
            type: 2,//broadcast=0,private chat=1,room chat=2
            contentType: 1,//text=1,img=2
            status: 2,//1=forRead,2=readed
            toId: context.req.args.to.room.id,
            fromId: context.req.args.from.id,
            message: context.req.args.msg,
            createdBy: context.req.args.from.id,
            createdDate: new Date().getTime()
        }
        await chatMessageService.saveChatMessage(msg);
        context.req.args.createdDate = msg.createdDate;
        context.server.emit(context.req.event, context.req.args);
    }
}