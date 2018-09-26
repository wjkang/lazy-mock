import url from 'url';
var shortid = require('shortid');

function makeEvent(event) {
    return JSON.stringify({
        type: 'event',
        event: event.event,
        args: event.args
    })
}

export default () => {
    return function (context, next) {
        let req = context.req;
        let client = context.client;
        let server = context.server;
        let location = url.parse(req.url, true);
        let clientId = location.query.token || location.query.user;
        if (!clientId) {
            client.end(makeEvent({
                event: 'loginError',
                args: 'invalid token or user'
            }))
            client.close(1003, "invalid clientId");
        }
        if (server.clients.has(clientId)) {
            client.send(makeEvent({
                event: 'loginError',
                args: 'user online'
            }))
            client.close(1003, "exists clientId");
            return;
        }
        let sid = shortid.generate();
        let user = {
            id: sid,
            name: clientId
        };
        client.clientId = clientId;
        client.shortid = sid;
        server.clients.set(clientId, client);
        if (!server.userMap) {
            server.userMap = new Map();
        }
        if (!server.roomMap) {
            server.roomMap = new Map();
        }
        server.userMap.set(sid, user);
        server.emit('user login', {
            id: sid,
            name: clientId
        }, true);
        client.send(makeEvent({
            event: 'loginSuccess',
            args: {
                user: user,
                userList: [...server.userMap.values()],
                roomList: [...server.roomMap.values()]
            }
        }));
        console.log(client.clientId + " Connected");
        next();
    }
}