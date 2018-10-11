// emit才会调用此中间件
export default () => {
    return (context, next) => {
        let server = context.server;
        let event = context.event;
        let msgType = event.args.type;//broadcast=0,private chat=1,room chat=2, single system message=-1
        if (msgType > 0) {
            if (msgType == 1) {
                let to = event.args.to.user;
                let from = event.args.from;
                for (let client of server.clients.values()) {
                    if (to.id == client.clientId || from.id == client.clientId) {
                        client.send(makeEventMessage(event));
                    }
                }
            }
            else if (msgType == 2) {
                let to = event.args.to.room;
                let room = server.roomMap.get(to.id);
                for (let client of server.clients.values()) {
                    if (room.userList.some((user) => user.id == client.clientId)) {
                        client.send(makeEventMessage(event));
                    }
                }
            }
        } else if (msgType === -1) {
            let to = event.args.to;
            for (let client of server.clients.values()) {
                if (to == client.clientId) {
                    client.send(makeEventMessage(event));
                }
            }
        } else {
            for (let client of server.clients.values()) {
                client.send(makeEventMessage(event));
            }
        }
        next();
    }
}
function makeEventMessage(event) {
    return JSON.stringify({
        type: 'event',
        event: event.event,
        args: event.args
    })
}