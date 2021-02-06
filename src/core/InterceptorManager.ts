interface IInterceptor<T> {
  fulfilled: IAppletsRequest.IResolved<T>;
  rejected: IAppletsRequest.IRejected | undefined;
}

export default class InterceptorManager<T> {
  private interceptors: (IInterceptor<T> | null)[];

  constructor() {
    this.interceptors = [];
  }

  use(
    fulfilled: IAppletsRequest.IResolved<T>,
    rejected?: IAppletsRequest.IRejected,
  ): IAppletsRequest.IInterceptorId {
    this.interceptors.push({
      fulfilled,
      rejected,
    });

    return this.interceptors.length - 1;
  }

  eject(interceptorId: IAppletsRequest.IInterceptorId): void {
    if (!this.interceptors[interceptorId]) {
      return;
    }
    this.interceptors[interceptorId] = null;
  }

  forEach(fn: (interceptor: IInterceptor<T>) => void): void {
    this.interceptors.forEach((interceptor) => {
      if (typeof fn === "function" && interceptor !== null) {
        fn(interceptor);
      }
    });
  }
}
