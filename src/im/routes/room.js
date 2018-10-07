var shortid = require('shortid');
export default {
    addRoom: function (context) {
        if (!context.server.roomMap) {
            context.server.roomMap = new Map();
        }
        let roomId = shortid.generate();
        context.req.args.id = roomId;
        context.server.roomMap.set(roomId, {
            id: roomId,
            name: context.req.args.name,
            userList: []
        });
        context.server.emit("addRoom", context.req.args);
        console.log("addRoom")
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
        context.server.emit("enterRoom", context.req.args);
        console.log("enterRoom")
    }
}