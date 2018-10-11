import roomService from '../../services/chatRoomService';
export default {
    addRoom: async function (context) {
        let client = context.client;
        let result = await roomService.saveChatRoom({
            ...context.req.args,
            createdBy: client.clientId
        });
        if (!result.success) {
            context.server.emit("BusinessError", {
                type: -1,
                to: client.clientId,
                msg: result.msg
            });
            return;
        }
        context.server.roomMap.set(result.data.id, {
            id: result.data.id,
            name: result.data.name,
            userList: []
        });
        context.server.emit("addRoom", { ...result.data });
    },
    enterRoom: function (context) {
        let room = context.server.roomMap.get(context.req.args.room.id);
        room.userList.push({ ...context.req.args.user });
        context.server.emit("enterRoom", context.req.args);
        console.log("enterRoom")
    },
    leaveRoom: function (context) {
        let room = context.server.roomMap.get(context.req.args.room.id);
        room.userList.splice(room.userList.findIndex((user) => user.id == context.req.args.user.id), 1);
        context.server.emit("leaveRoom", context.req.args);
        console.log("leaveRoom")
    }
}