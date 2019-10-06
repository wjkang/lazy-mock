import axios, { AxiosStatic, AxiosRequestConfig } from 'axios';
export default class HttpClient {
  public static instance?: HttpClient;
  public static requestInterceptor: number = -1;
  public static responseInterceptor: number = -1;
  private httpInstance: AxiosStatic;
  private interruptBeforeRequest?: (config: any) => any;
  private interruptBeforeResponse?: (response: any) => any;
  constructor(domain: string) {
    this.httpInstance = axios;
    axios.defaults.baseURL = domain;
    axios.defaults.timeout = 15000;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    if (!HttpClient.instance) {
      HttpClient.instance = this;
    }
  }
  /**
   * 自定义client
   * @param client 自定义client
   */
  public setHtttpClient(client: AxiosStatic) {
    this.httpInstance = client;
  }
  public getCancelToken() {
    return this.httpInstance.CancelToken;
  }
  public request(params: AxiosRequestConfig) {
    if (this.httpInstance) {
      return this.httpInstance(params);
    } else {
      throw Error('no client');
    }
  }
  public get(url: string | undefined, params: any) {
    if (this.httpInstance && url) {
      return this.httpInstance.get(url, params);
    } else {
      throw Error('no client or url error');
    }
  }
  public post(url: string | undefined, data: any, params: AxiosRequestConfig) {
    if (this.httpInstance && url) {
      return this.httpInstance.post(url, data, params);
    } else {
      throw Error('no client or url error');
    }
  }
  public all(array: Array<() => {}>, success: (acct: any, perms: any) => any, err: (e: any) => any) {
    if (this.httpInstance) {
      return this.httpInstance
        .all(array)
        .then(
          axios.spread((acct, perms) => {
            // 两个请求现在都执行完成
            success(acct, perms);
          })
        )
        .catch((e: any) => {
          err(e);
        });
    } else {
      throw Error('no client');
    }
  }
  public getHeaders() {
    if (this.httpInstance) {
      return this.httpInstance.defaults.headers;
    } else {
      return {};
    }
  }
  public setInterruptBeforeRequest(interrupt?: (res: any) => any) {
    this.interruptBeforeRequest = interrupt;
    if (this.httpInstance) {
      // 配置发送请求前的拦截器 可以设置token信息
      if (HttpClient.requestInterceptor !== -1) {
        this.httpInstance.interceptors.request.eject(HttpClient.requestInterceptor);
      }
      HttpClient.requestInterceptor = this.httpInstance.interceptors.request.use(
        (config: any) => {
          if (interrupt) {
            return interrupt(config);
          } else {
            return config;
          }
        },
        (error: any) => {
          if (interrupt) {
            return interrupt({
              requestError: 'error',
              error
            });
          } else {
            return Promise.reject(error);
          }
        }
      );
    } else {
      throw Error('no client');
    }
  }
  public setInterruptBeforeResponse(interupt?: (res: any) => any) {
    this.interruptBeforeResponse = interupt;
    if (this.httpInstance) {
      if (HttpClient.responseInterceptor !== -1) {
        this.httpInstance.interceptors.response.eject(HttpClient.responseInterceptor);
      }
      HttpClient.responseInterceptor = this.httpInstance.interceptors.response.use(
        (response: any) => {
          if (interupt) {
            return interupt(response);
          } else {
            return response;
          }
        },
        (error: any) => {
          if (interupt) {
            return interupt({
              responseError: 'error',
              error
            });
          } else {
            return Promise.reject(error);
          }
        }
      );
    } else {
      throw Error('no client');
    }
  }
  public addRequestInterrupt(requestInterrupt?: (res: any) => any, responseInterrupt?: (res: any) => any) {
    const requestDo = requestInterrupt ? requestInterrupt : this.interruptBeforeRequest
    const responseDo = responseInterrupt ? responseInterrupt : this.interruptBeforeResponse
    this.setInterruptBeforeRequest(requestDo)
    this.setInterruptBeforeResponse(responseDo)
  }
}
