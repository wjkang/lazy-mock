export default () => {
    return function (context, next) {
        let server = context.server;
        let client = context.client;
        let code = context.code;
        let reason = context.message;
        server.clients.delete(client.clientId);
        if (code === 1003 && (reason === 'invalid clientId' || reason === 'exists clientId')) {
            console.log("'invalid clientId' or 'exists clientId' closed")
        } else {
            console.log(client.clientId + " closed");
            if (server.userMap) {
                server.userMap.delete(client.shortid);
                server.emit("user logout", {
                    id: client.shortid,
                    name: client.clientId
                });
            }
        }
        next();
    }
}
