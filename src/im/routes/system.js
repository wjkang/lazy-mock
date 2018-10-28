export default {
    ping: function (context) {
        context.req.args = {
            msg: context.req.args,
            type: -1,
            to: context.client.clientId
        };
        context.server.emit("pong", context.req.args);
    }
}