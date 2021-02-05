import CancelToken from "../cancel/CancelToken";
import isCancel from "../cancel/isCancel";
import defaults from "../defaults";
import isNetworkError from "../error/isNetworkError";
import isTimeout from "../error/isTimeout";
import combineURLs from "../helpers/combineURLs";
import isAbsoluteURL from "../helpers/isAbsoluteURL";
import transformUrl from "../helpers/transformUrl";
import { assign, isPlainObject } from "../helpers/utils";
import InterceptorManager from "./InterceptorManager";
import mergeConfig from "./mergeConfig";
import request from "./request";

interface IInterceptors {
  request: InterceptorManager<IMiniRequestConfig>;
  response: InterceptorManager<IMiniRequestResponse>;
}

interface IPromiseChain<T> {
  fulfilled:
    | IMiniRequest.IResolved<T>
    | ((config: IMiniRequestConfig) => IMiniRequestPromise);
  rejected?: IMiniRequest.IRejected;
}

export default class MiniRequest {
  MiniRequest = MiniRequest;

  CancelToken = CancelToken;

  isCancel = isCancel;

  defaults: IMiniRequestConfig = {};

  interceptors: IInterceptors;

  constructor(config?: IMiniRequestConfig) {
    if (config) {
      this.defaults = config;
    }

    this.interceptors = {
      request: new InterceptorManager<IMiniRequestConfig>(),
      response: new InterceptorManager<IMiniRequestResponse>(),
    };
  }

  request(
    options: string | IMiniRequestConfig,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise {
    let formattedConfig: IMiniRequestConfig = {};
    if (typeof options === "string") {
      formattedConfig = this.transformConfig(config);
      formattedConfig.url = options;
    } else {
      formattedConfig = options;
    }

    formattedConfig = mergeConfig(this.defaults, formattedConfig);

    const chain: IPromiseChain<any>[] = [
      {
        fulfilled: request,
        rejected: undefined,
      },
    ];

    this.interceptors.request.forEach(
      (interceptor) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        chain.unshift(interceptor)
      // eslint-disable-next-line function-paren-newline
    );

    this.interceptors.response.forEach(
      (interceptor) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        chain.push(interceptor)
      // eslint-disable-next-line function-paren-newline
    );

    let promise = Promise.resolve(formattedConfig);

    chain.forEach((interceptor) => {
      if (!interceptor) {
        return;
      }
      promise = promise.then(interceptor.fulfilled, interceptor.rejected);
    });

    return promise as IMiniRequestPromise;
  }

  get(url: string, config?: IMiniRequestConfig): IMiniRequestPromise {
    return this.requestWithMethod(url, "GET", config);
  }

  delete(url: string, config?: IMiniRequestConfig): IMiniRequestPromise {
    return this.requestWithMethod(url, "DELETE", config);
  }

  head(url: string, config?: IMiniRequestConfig): IMiniRequestPromise {
    return this.requestWithMethod(url, "HEAD", config);
  }

  options(url: string, config?: IMiniRequestConfig): IMiniRequestPromise {
    return this.requestWithMethod(url, "OPTIONS", config);
  }

  post(
    url: string,
    data?: IMiniRequest.IDataType,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise {
    return this.requestWithData(url, "POST", data, config);
  }

  put(
    url: string,
    data?: IMiniRequest.IDataType,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise {
    return this.requestWithData(url, "PUT", data, config);
  }

  create(config?: IMiniRequestConfig): MiniRequestInstance {
    const miniRequest = new MiniRequest(mergeConfig(defaults, config));
    const ins: MiniRequestInstance = MiniRequest.prototype.request.bind(miniRequest) as MiniRequestInstance;

    return assign(ins, miniRequest);
  }

  all(promises: IMiniRequestPromise[]): Promise<IMiniRequestResponse[]> {
    if (promises.length === 0) {
      throw new TypeError(`arguments length is 0`);
    }
    return Promise.all(promises);
  }

  getUri(config: IMiniRequestConfig): string {
    const { url, baseURL, params } = config;
    const tmpUrl = url || "";
    const combinedURL = isAbsoluteURL(tmpUrl)
      ? tmpUrl
      : combineURLs(baseURL || "", tmpUrl);
    const formattedUrl = transformUrl(
      combinedURL,
      params,
      config.paramsSerializer
    );
    return formattedUrl;
  }

  isTimeout = isTimeout;

  isNetworkError = isNetworkError;

  private requestWithMethod(
    url: string,
    method: IMiniRequest.IMethod,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise {
    return this.request({
      ...this.transformConfig(config),
      url,
      method,
    });
  }

  private requestWithData(
    url: string,
    method: IMiniRequest.IMethod,
    data?: IMiniRequest.IDataType,
    config?: IMiniRequestConfig
  ): IMiniRequestPromise {
    return this.requestWithMethod(url, method, {
      ...this.transformConfig(config),
      data,
    });
  }

  private transformConfig(config?: IMiniRequestConfig): IMiniRequestConfig {
    return isPlainObject(config) ? config : {};
  }
}
