export let businessError = (ctx,msg) => {
    ctx.body = {
        statusCode: 500,
        msg: msg,
        data: null
    }
}

export let success = (ctx,data) => {
    ctx.body = {
        statusCode: 200,
        msg: '',
        data: data
    }
}