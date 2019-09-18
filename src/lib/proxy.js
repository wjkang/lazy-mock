const request = require('superagent')
const url = require('url')

export default async function(ctx, host, referer = 'http://www.baidu.com') {
	let hostObj = url.parse(host)
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
	} catch (ex) {
		result.body = ex.response.text
	}
	return result
}
