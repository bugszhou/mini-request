interface ISourceReturn {
    token: CancelToken;
    cancel: CancelToken["cancel"];
}
export default class CancelToken {
    private reason;
    private promise;
    private promiseResolve;
    static source(): ISourceReturn;
    constructor(executor?: IAppletsRequest.IEmptyFN);
    cancel(message: string): void;
    execAbort(resolution: IAppletsRequest.IResolved<any>): any;
    throwIfRequested(): void;
}
export {};
