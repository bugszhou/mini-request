interface IInterceptor<T> {
  fulfilled: IMiniRequest.IResolved<T>;
  rejected: IMiniRequest.IRejected | undefined;
}

export default class InterceptorManager<T> {
  private interceptors: (IInterceptor<T> | null)[];

  constructor() {
    this.interceptors = [];
  }

  use(
    fulfilled: IMiniRequest.IResolved<T>,
    rejected?: IMiniRequest.IRejected,
  ): IMiniRequest.IInterceptorId {
    this.interceptors.push({
      fulfilled,
      rejected,
    });

    return this.interceptors.length - 1;
  }

  eject(interceptorId: IMiniRequest.IInterceptorId): void {
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
