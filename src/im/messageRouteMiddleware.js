export default (routes)=>{
    if (context.req.type === 'event') {
        //context.server.emit(context.req.event, context.req.args, true);
        context.server.emit(context.req.event, context.req.args);
    }
    next();
}