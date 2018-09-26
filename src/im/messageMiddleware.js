export default () => {
    return (context, next) => {
        if (context.req.type === 'event') {
            //context.server.emit(context.req.event, context.req.args, true);
            context.server.emit(context.req.event, context.req.args);
        }
        next();
    }
}