interface IInterceptor<T> {
    fulfilled: IAppletsRequest.IResolved<T> | undefined;
    rejected: IAppletsRequest.IRejected | undefined;
}
export default class InterceptorManager<T> {
    private interceptors;
    constructor();
    use(fulfilled: IAppletsRequest.IResolved<T>, rejected?: IAppletsRequest.IRejected): IAppletsRequest.IInterceptorId;
    eject(interceptorId: IAppletsRequest.IInterceptorId): void;
    forEach(fn: (interceptor: IInterceptor<T>, interceptorId: IAppletsRequest.IInterceptorId) => void): void;
    size(): number;
}
export {};
