import { AxiosRequestConfig } from 'axios'
import HttpClient from './HttpClient'

export default class Request implements AxiosRequestConfig {
  public transformRequest = undefined;
  public transformResponse = undefined;
  public withCredentials = false; // 跨域
  public adapter = undefined;
  public auth = undefined;
  public xsrfCookieName?: string | undefined;
  public xsrfHeaderName?: string | undefined;
  public maxContentLength?: number | undefined;
  public maxRedirects?: number | undefined;
  public socketPath?: string | null | undefined;
  public httpAgent?: any;
  public httpsAgent?: any;
  public proxy = undefined;
  public url?: string;
  public method = undefined;
  public baseURL?: string;
  public headers?: any;
  public params?: any = undefined;
  public paramsSerializer?: () => string;
  public data = undefined;
  public timeout?: number;
  public responseType = undefined; // 'json', 'arraybuffer','blob','document','text' ,'stream'
  public onUploadProgress = undefined;
  public onDownloadProgress = undefined;
  public validateStatus = undefined;
  public cancelToken ?: any = undefined;
  public success?: (event: any) => void;
  public error?: (event: any) => void;
  private client: HttpClient;
  private errorTryTimes = 1; // 请求失败已重复次数
  private errorTryCount = 3; // 请求失败可重复次数
  private cancelAble: boolean = false;
  private cancelRequest?: any = undefined;
  constructor(request: any) {
    if (HttpClient.instance) {
      this.client = HttpClient.instance
    } else {
      throw Error('client is undefined')
    }
    this.init(request);
  }
  public Request(client: HttpClient) {
    if (client) {
      this.client = client;
    } else if (HttpClient.instance) {
      this.client = HttpClient.instance;
    } else {
      throw Error('client is undefined')
    }
    return this
  }
  /**
   * url
   * method
   * responseType
   * params
   * data
   * timeout
   * success
   * error
   * cancelAble 是否可取消
   */
  public init(request: any) {
    this.url = request.url;
    this.method = request.method ? request.method : 'get';
    this.responseType = request.responseType ? request.responseType : 'json';
    this.params = request.params ? request.params : undefined;
    this.data = request.data ? request.data : undefined;
    this.timeout = request.timeout ? request.timeout : undefined;
    this.success = request.success ? request.success : undefined;
    this.error = request.error ? request.error : undefined;
    this.cancelAble = request.cancelAble ? request.cancelAble : false;
    this.onUploadProgress = request.onUploadProgress ? request.onUploadProgress : undefined;
    this.onDownloadProgress = request.onDownloadProgress ? request.onDownloadProgress : undefined;
    this.errorTryCount = request.errorTryCount ? request.errorTryCount : 3; // 默认失败可重试3次
    this.withCredentials = request.withCredentials !== undefined ? request.withCredentials : true;
  }
  public cancel() {
    if (this.cancelRequest) {
      this.cancelRequest('cancel')
      this.cancelRequest = undefined
    }
  }
  public request() {
    this.headers = this.client.getHeaders()
    if (this.cancelAble) {
      const CancelToken = this.client.getCancelToken()
      if (CancelToken) {
        this.cancelToken = new CancelToken((c: any) => {
          this.cancelRequest = c;
        })
      }
    }
    this.client.request(this).then((response: any) => {
      this.processSuccess(response)
    }).catch((err: any) => {
      this.processError(err)
    })
  }
  public get() {
    this.headers = this.client.getHeaders()
    if (this.cancelAble) {
      const CancelToken = this.client.getCancelToken()
      if (CancelToken) {
        this.cancelToken = new CancelToken((c: any) => {
          this.cancelRequest = c;
        })
      }
    }
    this.client.get(this.url, this).then((response: any) => {
      this.processSuccess(response)
    }).catch((err: any) => {
      this.processError(err)
    })
  }
  public post() {
    this.headers = this.client.getHeaders()
    if (this.cancelAble) {
      const CancelToken = this.client.getCancelToken()
      if (CancelToken) {
        this.cancelToken = new CancelToken((c: any) => {
          this.cancelRequest = c;
        })
      }
    }
    this.client.post(this.url, this.data, this).then((response: any) => {
      this.processSuccess(response)
    }).catch((err: any) => {
      this.processError(err)
    })
  }
  /**
   * 响应调用的request success和error方法
   * @param request 请求集合，失败时不会自动发送请求，允许失败次数此方法设置无效
   */
  public all(request: Request[]) {
    const arr: Array<() => any> = []
    request.forEach((item) => {
      arr.push(() => {
        this.client.request(this)
      })
    })
    const success = (acct: any, perms: any) => {
      if (this.success) {
        this.success({ acct, perms })
      }
    };
    const err = (e: any) => {
      if (this.error) {
        this.error(e)
      }
    }
    this.client.all(arr, success, err)
  }
  // 是否重复请求
  private tryAgain() {
    if (this.errorTryTimes < this.errorTryCount) {
      this.errorTryTimes++
      this.request()
      return true
    }
    return false
  }
  private processSuccess(response: any) {
    try {
      if (this.success) {
        this.success(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  private processError(err: any) {
    if ((this.cancelToken && this.cancelToken.reason && this.cancelToken.reason.message === 'cancel') ||
      !this.tryAgain()) {
      if (this.error) {
        this.error(err)
      }
    }
  }
}
