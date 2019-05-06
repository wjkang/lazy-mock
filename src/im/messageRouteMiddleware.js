export default (routes) => {
    return async (context, next) => {
        if (context.req.type === 'event') {
            if (routes[context.req.event]) {
                await routes[context.req.event](context);
            } else {
                context.server.emit(context.req.event, context.req.args);
            }
        }
        next();
    }
}