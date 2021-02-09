/* eslint-disable max-len */
/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-05 14:31:47
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-09 16:54:10
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

export default class Adapter {
  private reqConfig: IAppletsRequest.IHttpConfig;

  constructor(config: IAppletsRequest.IHttpConfig) {
    this.reqConfig = config;
  }

  /**
   * 接口请求成功执行该方法
   * @param options response数据
   * @param resolve Promise.resolve
   */
  resolve(
    options: IAppletsRequest.IAdapterResolveOptions,
    resolve: IAppletsRequest.IResolved<any>
  ): void {
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

  /**
   * 接口请求失败执行该方法
   * @param options response数据
   * @param reject Promise.reject
   */
  reject(
    options: IAppletsRequest.IAdapterRejectOptions,
    reject: IAppletsRequest.IRejected
  ): void {
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

  /**
   * 取消接口请求
   * @param executor 监听执行取消接口请求操作的监听函数
   */
  cancel(executor: (cancel: IAppletsRequest.ICanceler) => void): void {
    if (!this.reqConfig.cancelToken) {
      return;
    }

    this.reqConfig.cancelToken.execAbort((reason) => {
      executor(reason);
    });
  }
}
