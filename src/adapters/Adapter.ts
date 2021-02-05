/* eslint-disable max-len */
/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-05 14:31:47
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-05 14:43:44
 * @Description http request adapter
 * 1. 自定义请求适配器接口规范
 * 2. 执行成功需要调用resolve
 * 3. 执行失败需要调用reject
 * 4. 监听用户取消时间执行abort
 *
 * @example:
 * 1. 创建实例：const adapter = new Adapter(config);
 * 2. 请求成功：adapter.resolve({headers: any, status: 200, data: {}, response: any}, resolve);
 * 3. 请求失败：adapter.reject({errMsg: "Request Timeout", status: "TIMEOUT", data: any, extra: any}, reject);
 * 4. 监听用户取消行为：adapter.abort((reason) => {
 *    // do something
 *    reject(reason);
 * });
 */
import { isUndefined } from "../helpers/utils";

export interface IResolveOptions {
  headers: Record<string, any>;
  status: number;
  data: any;
  response?: any;
}

interface IRejectOptions {
  errMsg: string;
  status: IMiniRequestStatus;
  data?: any;
  extra?: any;
}

export default class Adapter {
  private reqConfig: IMiniRequest.IHttpConfig;

  constructor(config: IMiniRequest.IHttpConfig) {
    this.reqConfig = config;
  }

  resolve(options: IResolveOptions, resolve: IMiniRequest.IResolved<any>): void {
    if (isUndefined(options) || options === null) {
      resolve({
        headers: {},
        status: 200,
        data: {},
        config: this.reqConfig,
        originalRes: null,
      });
    }

    resolve({
      headers: options.headers,
      config: this.reqConfig,
      data: options.data,
      status: options.status,
      originalRes: isUndefined(options.response) ? null : options.response,
    });
  }

  reject(options: IRejectOptions, reject: IMiniRequest.IRejected): void {
    if (isUndefined(options) || options === null) {
      reject({
        status: "NETWORK_ERROR",
        errMsg: "Reject arguments Error",
        config: this.reqConfig,
        extra: null,
      });
    }

    reject({
      config: this.reqConfig,
      status: options.status,
      data: options.data,
      errMsg: options.errMsg,
      extra: isUndefined(options.extra) ? null : options.extra,
    });
  }

  abort(executor: (cancel: IMiniRequest.ICanceler) => void): void {
    if (!this.reqConfig.cancelToken) {
      return;
    }

    this.reqConfig.cancelToken.execAbort((reason) => {
      executor(reason);
    });
  }
}
