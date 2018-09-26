var shortid = require('shortid');
export default () => {
    return (context, next) => {
        if (context.req.type === 'event' && context.req.event === 'addRoom') {
            if (!context.server.roomMap) {
                context.server.roomMap = new Map();
            }
            let roomId = shortid.generate();
            context.req.args.id = roomId;
            context.server.roomMap.set(roomId, {
                id:roomId,
                name: context.req.args.name,
                userList: []
            });
        }
        if (context.req.type === 'event' && context.req.event === 'enterRoom') {
            let room = context.server.roomMap.get(context.req.args.room.id);
            room.userList.push({ ...context.req.args.user });
        }

        if (context.req.type === 'event' && context.req.event === 'leaveRoom') {
            let room = context.server.roomMap.get(context.req.args.room.id);
            room.userList.splice(room.userList.findIndex((user) => user.id == context.req.args.user.id), 1);
        }

        next();
    }
}