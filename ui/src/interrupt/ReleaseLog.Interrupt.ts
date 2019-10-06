import ReleaseLogApi from '../api/ReleaseLog.Api'
export default class Interrupt {
	constructor() {}
	public init() {
		console.log(ReleaseLogApi.httpClient)
		ReleaseLogApi.httpClient.setInterruptBeforeRequest((config: any) => {
			if (config.requestError) {
				// 出错了
				return Promise.reject(config.error)
			} else {
				config.headers.post['Content-Type'] = 'application/json'
				return config
			}
		})
		ReleaseLogApi.httpClient.setInterruptBeforeResponse((response: any) => {
			if (response.responseError) {
				console.log(response.error)
				if (
					response.error.response &&
					response.error.response.status === 500 &&
					response.error.response.data &&
					parseInt(response.error.response.data.code, 10) === 500
				) {
					return Promise.reject({
						message: response.error.response.data.message
					})
				}
				if (
					response.error.response &&
					response.error.response.status === 400 &&
					response.error.response.data &&
					parseInt(response.error.response.data.code, 10) === 400
				) {
					return Promise.reject({
						code: 400,
						message: response.error.response.data.message
					})
				}
				return Promise.reject({ message: '网络异常' })
			} else {
				if (response.data && response.data.code === 500) {
					return Promise.reject({ message: '服务器错误' })
				}
				return response
			}
		})
	}
}
