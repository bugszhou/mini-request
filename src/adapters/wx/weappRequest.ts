/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-04 16:09:10
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-09 15:56:12
 * @Description request adapter
 *
 * 1. 执行成功需要返回IAppletsRequestResponse，执行失败即为reject返回IAppletsRequestAdapterError
 * 2. 如果取消返回IAppletsRequest.ICanceler
 */

import { isUndefined, merge } from "../../helpers/utils";
import Adapter, { IResolveOptions } from "../Adapter";
import configAdapter from "./configAdapter";

export default function weappRequest(
  config: IAppletsRequest.IHttpConfig
): IAppletsRequestPromise {
  function requestSuccess(res: any): IResolveOptions {
    if (isUndefined(res) || res === null) {
      return {
        headers: {},
        status: 200,
        data: {},
        response: res,
      };
    }

    return {
      headers: res.header,
      status: res.statusCode,
      data: dataParser(res.data),
      response: res,
    };
  }

  /**
   * 获取错误类型
   * @param err
   * @param timeout
   * @returns NETWORK_ERROR | TIMEOUT
   * @example {
   *    msg: `Timeout of 2000 ms exceeded`,
   *    type: "TIMEOUT",
   *  }
   */
  function failType(
    err: any,
    timeout: number | undefined
  ): { msg: string; type: "NETWORK_ERROR" | "TIMEOUT" } {
    if (
      err &&
      (err.errMsg || "").toString().toLowerCase().includes("timeout")
    ) {
      return {
        msg: `Timeout of ${timeout || ""} ms exceeded`,
        type: "TIMEOUT",
      };
    }
    return {
      msg: `Network Error`,
      type: "NETWORK_ERROR",
    };
  }

  /**
   * JSON parse data
   * @param data
   */
  function dataParser(data: any): any {
    if (typeof data !== "string") {
      return data;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  function getReqConfig(
    originalConfig: IAppletsRequestWx.RequestOption
  ): IAppletsRequest.IHttpConfig {
    if (isUndefined(originalConfig) || originalConfig === null) {
      return {};
    }
    const tmpConfig: any = merge({}, originalConfig);
    tmpConfig.headers = originalConfig.header;
    delete tmpConfig.header;
    return tmpConfig;
  }

  return new Promise((resolve, reject) => {
    const reqConfig = configAdapter(config);

    const adapter = new Adapter(getReqConfig(reqConfig));

    let request = wx.request({
      ...reqConfig,
      success(res: any) {
        adapter.resolve(requestSuccess(res), resolve);
      },
      fail(err: any) {
        const errData = failType(err, reqConfig.timeout);
        const rejectData = {
          errMsg: errData.msg,
          status: errData.type,
          extra: err,
        };

        adapter.reject(rejectData, reject);
      },
      complete() {
        request = null;
      },
    });

    adapter.cancel((reason) => {
      reject(reason);
      request.abort();
      request = null;
    });

    if (typeof config.getRequestTask === "function") {
      config.getRequestTask(request);
    }
  });
}
