export default () => {
    return (context, next) => {
        let message = context.message;
        let client = context.client;
        client.send('received ' + message)
        console.log(message)
        next();
    }
}