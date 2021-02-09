declare namespace IAppletsRequest {
  type IAnyObject = Record<string, any>;

  type IEmptyFN = (...opts: any) => any;

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

  interface IHttpConfig extends IAppletsRequestConfig {
    method?: INormalizeMethod;
    Adapter: typeof Adapter;
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

  type ICancelFn = (canceler: IAppletsRequest.ICanceler) => boolean;

  interface IAdapterResolveOptions {
    headers: Record<string, any>;
    status: number;
    data: any;
    response?: any;
  }

  interface IAdapterRejectOptions {
    errMsg: string;
    status: IAppletsRequestStatus;
    data?: any;
    extra?: any;
  }
}

declare class AppletsRequest {
  AppletsRequest: typeof AppletsRequest;

  interceptors: {
    request: IAppletsRequest.IInterceptorManager<IAppletsRequestConfig>;
    response: IAppletsRequest.IInterceptorManager<IAppletsRequestResponse>;
  };

  defaults: IAppletsRequestConfig;

  request<IData = any>(
    config: IAppletsRequestConfig,
  ): IAppletsRequestPromise<IData>;

  /**
   * 支持两个参数
   * @param {string} url 请求的URL
   * @param {IAppletsRequestConfig} config 配置信息
   */
  request<IData = any>(
    url: string,
    config?: IAppletsRequestConfig,
  ): IAppletsRequestPromise<IData>;

  get<IData = any>(
    url: string,
    config?: IAppletsRequestConfig,
  ): IAppletsRequestPromise<IData>;

  delete<IData = any>(
    url: string,
    config?: IAppletsRequestConfig,
  ): IAppletsRequestPromise<IData>;

  head<IData = any>(
    url: string,
    config?: IAppletsRequestConfig,
  ): IAppletsRequestPromise<IData>;

  options<IData = any>(
    url: string,
    config?: IAppletsRequestConfig,
  ): IAppletsRequestPromise<IData>;

  /**
   * Post Request
   * @param url string
   * @param data string | Record<string, any> | ArrayBuffer
   * @param config IAppletsRequestConfig
   */
  post<IData = any>(
    url: string,
    data?: IAppletsRequest.IDataType,
    config?: IAppletsRequestConfig,
  ): IAppletsRequestPromise<IData>;

  put<IData = any>(
    url: string,
    data?: IAppletsRequest.IDataType,
    config?: IAppletsRequestConfig,
  ): IAppletsRequestPromise<IData>;

  // patch<IData = any>(
  //   url: string,
  //   data?: IAppletsRequest.IDataType,
  //   config?: IAppletsRequestConfig,
  // ): IAppletsRequestPromise<IData>;

  all<T>(promises: (T | Promise<T>)[]): Promise<T[]>;

  getUri(config: IAppletsRequestConfig): string;

  create(config?: IAppletsRequestConfig): AppletsRequestInstance;

  CancelToken: IAppletsRequest.ICancelToken;

  /**
   * 是否是取消返回
   * @param {IAppletsRequest.ICanceler} canceler 取消内容
   */
  isCancel: IAppletsRequest.ICancelFn;

  /**
   * 是否是Network Error，如：请求不可用
   * @param {IAppletsRequestResponse} response
   */
  isNetworkError(response: IAppletsRequestResponse): boolean;

  /**
   * 是否是超时错误
   * @param {IAppletsRequestResponse} response
   */
  isTimeout(response: IAppletsRequestResponse): boolean;
}

/**
 * Http Request Adapter
 */
declare class Adapter {
  constructor(config: IAppletsRequest.IHttpConfig);

  /**
   * 接口请求成功执行该方法
   * @param options response数据
   * @param resolve Promise.resolve
   */
  resolve(
    options: IAppletsRequest.IAdapterResolveOptions,
    resolve: IAppletsRequest.IResolved<any>,
  ): void;

  /**
   * 接口请求失败执行该方法
   * @param options response数据
   * @param reject Promise.reject
   */
  reject(
    options: IAppletsRequest.IAdapterRejectOptions,
    reject: IAppletsRequest.IRejected,
  ): void;

  /**
   * 取消接口请求
   * @param executor 监听执行取消接口请求操作的监听函数
   */
  cancel(executor: (cancel: IAppletsRequest.ICanceler) => void): void;
}

interface AppletsRequestInstance extends AppletsRequest {
  <IData = any>(config: IAppletsRequestConfig): IAppletsRequestPromise<IData>;

  /**
   * 支持两个参数
   *
   * first-param {string} url 请求的URL
   *
   * second-param {IAppletsRequestConfig} config 配置信息
   */
  <IData = any>(
    url: string,
    config?: IAppletsRequestConfig,
  ): IAppletsRequestPromise<IData>;
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
type IAppletsRequestStatus = "NETWORK_ERROR" | "TIMEOUT" | number;

interface IAppletsRequestConfig {
  adapter?: (config: IAppletsRequestConfig) => IAppletsRequestPromise;
  url?: string;
  method?: IAppletsRequest.IMethod;
  headers?: {
    [key: string]: string | Record<string, string>;
  };
  /**
   * body data
   */
  data?: IAppletsRequest.IDataType;
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
    | IAppletsRequest.IConfigTransformer
    | IAppletsRequest.IConfigTransformer[];

  transformRequest?:
    | IAppletsRequest.ITransformer
    | IAppletsRequest.ITransformer[];

  transformResponse?:
    | IAppletsRequest.ITransformer
    | IAppletsRequest.ITransformer[];

  /**
   * 取消请求
   */
  cancelToken?: IAppletsRequest.ICancelTokenInstance;

  withCredentials?: boolean;

  xsrfCookieName?: string;
  xsrfHeaderName?: string;

  autoCookies?: boolean;

  /**
   * 是否执行resolve成功
   */
  validateStatus?: (status: number) => boolean;

  /**
   * 自定义query序列化
   */
  paramsSerializer?: IAppletsRequest.IEmptyFN;

  baseURL?: string;

  [otherConfigName: string]: any;
}

interface IAppletsRequestError {
  config: IAppletsRequest.IHttpConfig;
  status: IAppletsRequestStatus;
  response: IAppletsRequestResponse;
}

type IAppletsRequestWxRequest = IAppletsRequestWx.RequestTask;

interface IAppletsRequestResponse<IData = any> {
  data: IData;
  status: number;
  headers: IAppletsRequest.IAnyObject;
  config: IAppletsRequest.IHttpConfig;
  cookies?: IAppletsRequest.IAnyObject;

  /**
   * http request adapters original response
   */
  originalRes?: any;

  /**
   * [微信小程序独有] 网络请求过程中一些调试信息
   *
   * 最低基础库： `2.10.4`
   */
  profile?: IAppletsRequestWx.RequestProfile;
}

type IAppletsRequestPromise<IData = any> = Promise<
  IAppletsRequestResponse<IData>
>;

interface IAppletsRequestRejectData {
  errMsg: string;
  config: IAppletsRequest.IHttpConfig;
  status: "NETWORK_ERROR" | "TIMEOUT";
  response?: IAppletsRequestResponse;
  extra?: any;
}

type IAppletsRequestAdapterError =
  | IAppletsRequestRejectData
  | IAppletsRequest.ICancelerIns;
