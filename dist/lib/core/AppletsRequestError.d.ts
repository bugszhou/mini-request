export default class AppletsRequestError {
    errMsg: string;
    config: IAppletsRequest.IHttpConfig;
    status: IAppletsRequestStatus;
    response: IAppletsRequestResponse | undefined;
    extra: null;
    constructor(message: string, config: IAppletsRequest.IHttpConfig, status: IAppletsRequestStatus, response: IAppletsRequestResponse | undefined, extra?: any);
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
export declare function createError(message: string, config: IAppletsRequest.IHttpConfig, status: IAppletsRequestStatus, response: IAppletsRequestResponse | undefined, extra?: any): AppletsRequestError;
