import url from 'url';
function makeMessage(obj) {
    return JSON.stringify(obj);
}
export default () => {
    return function (context, next) {
        let req = context.req;
        let client = context.client;
        let server = context.server;
        let location = url.parse(req.url, true);
        let clientId = location.query.token || location.query.user;
        if (!clientId) {
            client.end(makeMessage({
                code: 500,
                msg: 'invalid clientId'
            }))
            client.close(1003, "invalid clientId");
        }
        if (server.clients.has(clientId)) {
            client.send(makeMessage({
                code: 500,
                msg: 'exists clientId'
            }))
            client.close(1003, "exists clientId");
            return;
        }
        client.send(makeMessage({
            code: 200,
            msg: 'Wellcome'
        }))
        client.clientId = clientId;
        server.clients.set(clientId, client);
        console.log(client.clientId + " Connected");
        next();
    }
}