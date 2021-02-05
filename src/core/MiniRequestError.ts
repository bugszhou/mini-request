/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-31 21:52:37
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-05 23:14:19
 * @Description 处理错误
 */

export default class MiniRequestError {
  errMsg: string;

  config: IMiniRequest.IHttpConfig;

  status: IMiniRequestStatus;

  response: IMiniRequestResponse | undefined;

  extra = null;

  constructor(
    message: string,
    config: IMiniRequest.IHttpConfig,
    status: IMiniRequestStatus,
    response: IMiniRequestResponse | undefined,
    extra?: any,
  ) {
    // super(message);

    this.errMsg = message;
    this.config = config;
    this.status = status;
    this.response = response;
    this.extra = extra;

    // Object.setPrototypeOf(this, MiniRequestError.prototype);
  }
}

export function createError(
  message: string,
  config: IMiniRequest.IHttpConfig,
  status: IMiniRequestStatus,
  response: IMiniRequestResponse | undefined,
  extra?: any,
): MiniRequestError {
  const tmpStatus = !status && status !== 0 ? "NETWORK_ERROR" : status;

  return new MiniRequestError(message, config, tmpStatus, response, extra);
}
