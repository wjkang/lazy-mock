// emit才会调用此中间件
export default () => {
    return (context, next) => {
        let server = context.server;
        let event = context.event;
        for (let client of server.clients.values()) {
            client.send(makeEventMessage(event));
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