import url from 'url';
var shortid = require('shortid');
function makeMessage(msg) {
    return JSON.stringify(msg);
}
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
        client.send(makeEvent({
            event: 'loginSuccess',
            args: {
                user: {
                    shortid: sid,
                    name: clientId
                }
            }
        }));
        server.emit('user login', {
            shortid: sid,
            name: clientId
        }, true);
        client.clientId = clientId;
        client.shortid = sid;
        server.clients.set(clientId, client);
        console.log(client.clientId + " Connected");
        next();
    }
}