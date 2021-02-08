export default class AppletsRequestError {
    errMsg: string;
    config: IAppletsRequest.IHttpConfig;
    status: IAppletsRequestStatus;
    response: IAppletsRequestResponse | undefined;
    extra: null;
    constructor(message: string, config: IAppletsRequest.IHttpConfig, status: IAppletsRequestStatus, response: IAppletsRequestResponse | undefined, extra?: any);
}
export declare function createError(message: string, config: IAppletsRequest.IHttpConfig, status: IAppletsRequestStatus, response: IAppletsRequestResponse | undefined, extra?: any): AppletsRequestError;
