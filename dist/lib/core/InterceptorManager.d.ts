interface IInterceptor<T> {
    fulfilled: IAppletsRequest.IResolved<T>;
    rejected: IAppletsRequest.IRejected | undefined;
}
export default class InterceptorManager<T> {
    private interceptors;
    constructor();
    use(fulfilled: IAppletsRequest.IResolved<T>, rejected?: IAppletsRequest.IRejected): IAppletsRequest.IInterceptorId;
    eject(interceptorId: IAppletsRequest.IInterceptorId): void;
    forEach(fn: (interceptor: IInterceptor<T>) => void): void;
}
export {};
