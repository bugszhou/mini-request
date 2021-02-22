import CancelToken from "../cancel/CancelToken";
import isCancel from "../cancel/isCancel";
import isNetworkError from "../error/isNetworkError";
import isTimeout from "../error/isTimeout";
import InterceptorManager from "./InterceptorManager";
interface IInterceptors {
    request: InterceptorManager<IAppletsRequestConfig>;
    response: InterceptorManager<IAppletsRequestResponse>;
}
export declare type URLType = string;
export default class AppletsRequest {
    AppletsRequest: typeof AppletsRequest;
    CancelToken: typeof CancelToken;
    defaults: IAppletsRequestConfig;
    interceptors: IInterceptors;
    isCancel: typeof isCancel;
    isTimeout: typeof isTimeout;
    isNetworkError: typeof isNetworkError;
    constructor(config?: IAppletsRequestConfig);
    request(options: URLType | IAppletsRequestConfig, config?: IAppletsRequestConfig): IAppletsRequestPromise;
    get(url: string, config?: IAppletsRequestConfig): IAppletsRequestPromise;
    delete(url: string, config?: IAppletsRequestConfig): IAppletsRequestPromise;
    head(url: string, config?: IAppletsRequestConfig): IAppletsRequestPromise;
    options(url: string, config?: IAppletsRequestConfig): IAppletsRequestPromise;
    post(url: string, data?: IAppletsRequest.IDataType, config?: IAppletsRequestConfig): IAppletsRequestPromise;
    put(url: string, data?: IAppletsRequest.IDataType, config?: IAppletsRequestConfig): IAppletsRequestPromise;
    create(config?: IAppletsRequestConfig): AppletsRequestInstance;
    all(promises: IAppletsRequestPromise[]): Promise<IAppletsRequestResponse[]>;
    getUri(config: IAppletsRequestConfig): string;
    private requestWithMethod;
    private requestWithData;
    private transformConfig;
}
export {};
