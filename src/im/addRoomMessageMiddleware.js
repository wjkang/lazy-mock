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
                name: context.req.args.name,
                userList: []
            });
        }
        next();
    }
}