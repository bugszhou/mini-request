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
  request: InterceptorManager<IAppletsRequestConfig>;
  response: InterceptorManager<IAppletsRequestResponse>;
}

interface IPromiseChain<T> {
  fulfilled:
    | IAppletsRequest.IResolved<T>
    | ((config: IAppletsRequestConfig) => IAppletsRequestPromise)
    | undefined;
  rejected?: IAppletsRequest.IRejected;
}

export default class AppletsRequest {
  AppletsRequest = AppletsRequest;

  CancelToken = CancelToken;

  isCancel = isCancel;

  defaults: IAppletsRequestConfig = {};

  interceptors: IInterceptors;

  constructor(config?: IAppletsRequestConfig) {
    if (config) {
      this.defaults = config;
    }

    this.interceptors = {
      request: new InterceptorManager<IAppletsRequestConfig>(),
      response: new InterceptorManager<IAppletsRequestResponse>(),
    };
  }

  request(
    options: string | IAppletsRequestConfig,
    config?: IAppletsRequestConfig
  ): IAppletsRequestPromise {
    let formattedConfig: IAppletsRequestConfig = {};
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

    this.interceptors.request.forEach((interceptor) =>
      chain.unshift(interceptor)
    );

    this.interceptors.response.forEach((interceptor) =>
      chain.push(interceptor)
    );

    let promise = Promise.resolve(formattedConfig);

    chain.forEach((interceptor) => {
      if (!interceptor) {
        return;
      }
      promise = promise.then(interceptor.fulfilled, interceptor.rejected);
    });

    return promise as IAppletsRequestPromise;
  }

  get(url: string, config?: IAppletsRequestConfig): IAppletsRequestPromise {
    return this.requestWithMethod(url, "GET", config);
  }

  delete(url: string, config?: IAppletsRequestConfig): IAppletsRequestPromise {
    return this.requestWithMethod(url, "DELETE", config);
  }

  head(url: string, config?: IAppletsRequestConfig): IAppletsRequestPromise {
    return this.requestWithMethod(url, "HEAD", config);
  }

  options(url: string, config?: IAppletsRequestConfig): IAppletsRequestPromise {
    return this.requestWithMethod(url, "OPTIONS", config);
  }

  post(
    url: string,
    data?: IAppletsRequest.IDataType,
    config?: IAppletsRequestConfig
  ): IAppletsRequestPromise {
    return this.requestWithData(url, "POST", data, config);
  }

  put(
    url: string,
    data?: IAppletsRequest.IDataType,
    config?: IAppletsRequestConfig
  ): IAppletsRequestPromise {
    return this.requestWithData(url, "PUT", data, config);
  }

  create(config?: IAppletsRequestConfig): AppletsRequestInstance {
    const miniRequest = new AppletsRequest(mergeConfig(defaults, config));
    const ins: AppletsRequestInstance = AppletsRequest.prototype.request.bind(
      miniRequest
    ) as AppletsRequestInstance;

    return assign(ins, miniRequest);
  }

  all(promises: IAppletsRequestPromise[]): Promise<IAppletsRequestResponse[]> {
    if (promises.length === 0) {
      throw new TypeError(`arguments length is 0`);
    }
    return Promise.all(promises);
  }

  getUri(config: IAppletsRequestConfig): string {
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
    method: IAppletsRequest.IMethod,
    config?: IAppletsRequestConfig
  ): IAppletsRequestPromise {
    return this.request({
      ...this.transformConfig(config),
      url,
      method,
    });
  }

  private requestWithData(
    url: string,
    method: IAppletsRequest.IMethod,
    data?: IAppletsRequest.IDataType,
    config?: IAppletsRequestConfig
  ): IAppletsRequestPromise {
    return this.requestWithMethod(url, method, {
      ...this.transformConfig(config),
      data,
    });
  }

  private transformConfig(
    config?: IAppletsRequestConfig
  ): IAppletsRequestConfig {
    return isPlainObject(config) ? config : {};
  }
}
