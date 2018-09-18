import url from 'url';
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
                args: 'invalid clientId'
            }))
            client.close(1003, "invalid clientId");
        }
        if (server.clients.has(clientId)) {
            client.send(makeEvent({
                event: 'loginError',
                args: 'exists clientId'
            }))
            client.close(1003, "exists clientId");
            return;
        }
        client.send(makeEvent({
            event: 'loginSuccess',
            args: ''
        }))
        client.clientId = clientId;
        server.clients.set(clientId, client);
        console.log(client.clientId + " Connected");
        next();
    }
}