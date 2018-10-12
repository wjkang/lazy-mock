export default {
    chatMessage: async function (context) {
        context.server.emit(context.req.event, context.req.args);
    },
    privateChatMessage: async function (context) {
        context.server.emit(context.req.event, context.req.args);
    },
    roomChatMessage: async function (context) {
        context.server.emit(context.req.event, context.req.args);
    }
}