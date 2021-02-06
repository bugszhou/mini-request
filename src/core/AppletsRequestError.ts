/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-31 21:52:37
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-05 23:14:19
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
    extra?: any,
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

export function createError(
  message: string,
  config: IAppletsRequest.IHttpConfig,
  status: IAppletsRequestStatus,
  response: IAppletsRequestResponse | undefined,
  extra?: any,
): AppletsRequestError {
  const tmpStatus = !status && status !== 0 ? "NETWORK_ERROR" : status;

  return new AppletsRequestError(message, config, tmpStatus, response, extra);
}
