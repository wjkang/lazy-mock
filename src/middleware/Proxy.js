const request = require('superagent')
const url = require('url')
module.exports = (host, referer = 'http://www.baidu.com') => {
	let hostObj = url.parse(host)
	return async function(ctx, next) {
		let result = {}
		try {
			if (ctx.request.method.toUpperCase() === 'PUT' || ctx.request.method.toUpperCase() === 'POST') {
				result = await request(ctx.request.method, host + ctx.request.url)
					.set({
						...ctx.request.header,
						Referer: referer,
						Host: hostObj.hostname
					})
					.send({ ...ctx.request.body })
			} else {
				result = await request(ctx.request.method, host + ctx.request.url).set({
					...ctx.request.header,
					Referer: referer,
					Host: hostObj.hostname
				})
			}
			ctx.body = result.type.indexOf('html') > -1 ? result.text : result.body
		} catch (ex) {
			ctx.status = ex.status
			ctx.body = ex.response.text
		}
		console.log('proxy')
		return
	}
}
