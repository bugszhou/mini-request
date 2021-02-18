/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-31 21:52:37
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-18 15:36:25
 * @Description 处理错误
 */

export default class AppletsRequestError {
  errMsg: string;

  config: IAppletsRequest.IHttpConfig;

  status: IAppletsRequestStatus;

  response: IAppletsRequestResponse | undefined;

  extra = null;

  constructor(
    message: string,
    config: IAppletsRequest.IHttpConfig,
    status: IAppletsRequestStatus,
    response: IAppletsRequestResponse | undefined,
    extra?: any
  ) {
    // super(message);

    this.errMsg = message;
    this.config = config;
    this.status = status;
    this.response = response;
    this.extra = extra;

    // Object.setPrototypeOf(this, AppletsRequestError.prototype);
  }
}

/**
 * 构建错误对象
 * @example
 * createError("Err Msg", config, status, response, extra)
 * @returns
 * {
 *  errMsg: string,
 *  config: config,
 *  status: http status,
 *  response: adapter response,
 *  extra: any other info,
 * }
 */
export function createError(
  message: string,
  config: IAppletsRequest.IHttpConfig,
  status: IAppletsRequestStatus,
  response: IAppletsRequestResponse | undefined,
  extra?: any
): AppletsRequestError {
  const tmpStatus = !status && status !== 0 ? "NETWORK_ERROR" : status;

  return new AppletsRequestError(message, config, tmpStatus, response, extra);
}
