import Request from '../internet/Request'
import HttpClient from '../internet/HttpClient'
import Interrupt from '../interrupt/ReleaseLog.Interrupt'
console.log(process.env.API_HOST)
export default class ReleaseLogApi {
	public static httpClient: HttpClient
	constructor() {
		this.initClient()
	}
	public sendMessage(message: any): Promise<void> {
		return new Promise((resolve, reject) => {
			const api = process.env.API_HOST + `/release_log`
			const request = new Request({
				url: api,
				method: 'post',
				data: message,
				withCredentials: false,
				success: (res: any) => {
					resolve(res)
				},
				falied: (res: any) => {
					console.log(res)
				},
				error: (res: any) => {
					reject(res)
				}
			}).Request(ReleaseLogApi.httpClient as HttpClient)
			request.request()
		})
	}
	private initClient() {
		if (!ReleaseLogApi.httpClient) {
			ReleaseLogApi.httpClient = new HttpClient('')
			new Interrupt().init()
		}
	}
}
