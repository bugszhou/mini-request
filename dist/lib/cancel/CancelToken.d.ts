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
    subscribeCancelEvent(listener: IAppletsRequest.IResolvedReturn<IAppletsRequest.ICancelerIns>): any;
    throwIfRequested(): void;
}
export {};
