declare namespace IMiniRequest {
  type IAnyObject = Record<string, any>;

  type IEmptyFN = (...opts) => any;

  type IMethod =
    | "get"
    | "GET"
    | "post"
    | "POST"
    | "delete"
    | "DELETE"
    | "put"
    | "PUT"
    | "TRACE"
    | "trace"
    | "CONNECT"
    | "connect"
    | "head"
    | "HEAD"
    | "options"
    | "OPTIONS";

  type INormalizeMethod =
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT";

  interface IHttpConfig extends IMiniRequestConfig {
    method?: INormalizeMethod;
  }

  type IDataType = string | Record<string, any> | ArrayBuffer;

  type IInterceptorId = number;

  interface IInterceptorManager<T> {
    use(fulfilled: IResolved<T>, rejected?: IRejected): IInterceptorId;

    eject(interceptorId: IInterceptorId): void;
  }

  interface IResolved<T> {
    (data: T): T | Promise<T>;
  }

  interface IRejected {
    (error: any): any;
  }

  type IConfigTransformer = (config: IHttpConfig) => IHttpConfig;

  type ITransformer = (data: any, headers?: any) => any;

  interface ICanceler {
    (message?: string): void;
  }

  interface ICancelerIns {
    message: string;
    isCancel: boolean;
  }

  interface ICancelToken {
    new (): ICancelTokenInstance;
    new (executor: (cancel: ICanceler) => void): ICancelTokenInstance;

    source(): ICancelTokenSource;
  }

  interface ICancelTokenInstance {
    cancel(message: string): void;

    throwIfRequested(): void;

    execAbort(resolution: IResolved<any>): any;
  }

  interface ICancelTokenSource {
    token: ICancelTokenInstance;
    cancel: ICancelTokenInstance["cancel"];
  }

  type ICancelFn = (canceler: IMiniRequest.ICanceler) => boolean;
}

declare class MiniRequest {
  MiniRequest: typeof MiniRequest;

  interceptors: {
    request: IMiniRequest.IInterceptorManager<IMiniRequestConfig>;
    response: IMiniRequest.IInterceptorManager<IMiniRequestResponse>;
  };

  defaults: IMiniRequestConfig;

  request<IData = any>(config: IMiniRequestConfig): IMiniRequestPromise<IData>;

  /**
   * 支持两个参数
   * @param {string} url 请求的URL
   * @param {IMiniRequestConfig} config 配置信息
   */
  request<IData = any>(
    url: string,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise<IData>;

  get<IData = any>(
    url: string,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise<IData>;

  delete<IData = any>(
    url: string,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise<IData>;

  head<IData = any>(
    url: string,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise<IData>;

  options<IData = any>(
    url: string,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise<IData>;

  /**
   * Post Request
   * @param url string
   * @param data string | Record<string, any> | ArrayBuffer
   * @param config IMiniRequestConfig
   */
  post<IData = any>(
    url: string,
    data?: IMiniRequest.IDataType,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise<IData>;

  put<IData = any>(
    url: string,
    data?: IMiniRequest.IDataType,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise<IData>;

  // patch<IData = any>(
  //   url: string,
  //   data?: IMiniRequest.IDataType,
  //   config?: IMiniRequestConfig,
  // ): IMiniRequestPromise<IData>;

  all<T>(promises: (T | Promise<T>)[]): Promise<T[]>;

  getUri(config: IMiniRequestConfig): string;

  create(config?: IMiniRequestConfig): MiniRequestInstance;

  CancelToken: IMiniRequest.ICancelToken;

  /**
   * 是否是取消返回
   * @param {IMiniRequest.ICanceler} canceler 取消内容
   */
  isCancel: IMiniRequest.ICancelFn;

  /**
   * 是否是Network Error，如：请求不可用
   * @param {IMiniRequestResponse} response
   */
  isNetworkError(response: IMiniRequestResponse): boolean;

  /**
   * 是否是超时错误
   * @param {IMiniRequestResponse} response
   */
  isTimeout(response: IMiniRequestResponse): boolean;
}

interface MiniRequestInstance extends MiniRequest {
  <IData = any>(config: IMiniRequestConfig): IMiniRequestPromise<IData>;

  /**
   * 支持两个参数
   *
   * first-param {string} url 请求的URL
   *
   * second-param {IMiniRequestConfig} config 配置信息
   */
  <IData = any>(
    url: string,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise<IData>;
}

/**
 * 请求发生错误的状态类型：
 *
 * 字符串值类型说明：
 *
 *  NETWORK_ERROR：网络错误，请求没发出去
 *
 *  TIMEOUT：网络超时
 *
 * number类型：参考http status code，如：404、500
 */
type IMiniRequestStatus = "NETWORK_ERROR" | "TIMEOUT" | number;

interface IMiniRequestConfig {
  adapter?: (config: IMiniRequestConfig) => IMiniRequestPromise;
  url?: string;
  method?: IMiniRequest.IMethod;
  headers?: {
    [key: string]: string | Record<string, string>;
  };
  /**
   * body data
   */
  data?: IMiniRequest.IDataType;
  /**
   * query data
   */
  params?: any;
  responseType?: "text" | "arraybuffer" | "json";
  timeout?: number;
  /**
   * 获取网络请求任务对象
   */
  getRequestTask?: (request: any) => any;

  /**
   * 转换config
   */
  transformConfig?:
    | IMiniRequest.IConfigTransformer
    | IMiniRequest.IConfigTransformer[];

  transformRequest?: IMiniRequest.ITransformer | IMiniRequest.ITransformer[];

  transformResponse?: IMiniRequest.ITransformer | IMiniRequest.ITransformer[];

  /**
   * 取消请求
   */
  cancelToken?: IMiniRequest.ICancelTokenInstance;

  withCredentials?: boolean;

  xsrfCookieName?: string;
  xsrfHeaderName?: string;

  autoCookies?: boolean;

  /**
   * 是否执行resolve成功
   */
  validateStatus?: (number) => boolean;

  /**
   * 自定义query序列化
   */
  paramsSerializer?: IMiniRequest.IEmptyFN;

  baseURL?: string;

  [otherConfigName: string]: any;
}

interface IMiniRequestError {
  config: IMiniRequest.IHttpConfig;
  status: IMiniRequestStatus;
  response: IMiniRequestResponse;
}

type IMiniRequestWxRequest = IMiniRequestWx.RequestTask;

interface IMiniRequestResponse<IData = any> {
  data: IData;
  status: number;
  headers: IMiniRequest.IAnyObject;
  config: IMiniRequest.IHttpConfig;
  cookies?: IMiniRequest.IAnyObject;

  /**
   * http request adapters original response
   */
  originalRes?: any;

  /**
   * [微信小程序独有] 网络请求过程中一些调试信息
   *
   * 最低基础库： `2.10.4`
   */
  profile?: IMiniRequestWx.RequestProfile;
}

type IMiniRequestPromise<IData = any> = Promise<IMiniRequestResponse<IData>>;

interface IMiniRequestRejectData {
  errMsg: string;
  config: IMiniRequest.IHttpConfig;
  status: "NETWORK_ERROR" | "TIMEOUT";
  response?: IMiniRequestResponse;
  extra?: any;
}

type IMiniRequestAdapterError =
  | IMiniRequestRejectData
  | IMiniRequest.ICancelerIns;
