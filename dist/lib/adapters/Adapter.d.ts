export interface IResolveOptions {
    headers: Record<string, any>;
    status: number;
    data: any;
    response?: any;
}
interface IRejectOptions {
    errMsg: string;
    status: IAppletsRequestStatus;
    data?: any;
    extra?: any;
}
export default class Adapter {
    private reqConfig;
    constructor(config: IAppletsRequest.IHttpConfig);
    resolve(options: IResolveOptions, resolve: IAppletsRequest.IResolved<any>): void;
    reject(options: IRejectOptions, reject: IAppletsRequest.IRejected): void;
    abort(executor: (cancel: IAppletsRequest.ICanceler) => void): void;
}
export {};
