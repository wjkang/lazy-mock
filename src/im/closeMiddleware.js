export default () => {
    return function (context, next) {
        let code = context.code;
        let reason = context.message;
        if (code === 1003 && (reason === 'invalid clientId' || reason === 'exists clientId')) {
            console.log("'invalid clientId' or 'exists clientId' closed")
        } else {
            console.log(this.clientId + " closed");
        }
        next();
    }
}