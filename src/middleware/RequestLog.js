import requestLogService from '../services/requestLogService'
module.exports = function () {
    return (ctx, next) => {
        if (ctx.url.indexOf("/requestlog/pagedlist") > -1) {
            return next()
        }
        const start = new Date()
        return next().then(async () => {
            const ms = new Date() - start
            let userId = ctx.user && ctx.user.userId ? ctx.user.userId : ''
            let ip = ctx.ip.split(":").pop()
            let log = {
                ip: ip,
                method: ctx.method,
                request: ctx.url.split("?")[0],
                time: ms,
                createdBy: userId,
                createdDate: start.getTime()
            }
            await requestLogService.addLog(log)
        })
    }
}