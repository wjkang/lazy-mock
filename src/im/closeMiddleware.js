export default () => {
    return function (context, next) {
        let server = context.server;
        let client = context.client;
        let code = context.code;
        let reason = context.message;
        server.clients.delete(client.clientId);
        if (code === 1003 && (reason === 'invalid token' || reason === 'user online')) {
            console.log("'invalid token' or 'user online' closed")
        } else {
            console.log(client.clientId + " closed");
            if (server.userMap) {
                let user = server.userMap.get(client.clientId);
                server.emit("user logout", {
                    id: user.id,
                    name: user.name
                });
                server.userMap.delete(client.clientId);
            }
        }
        next();
    }
}
