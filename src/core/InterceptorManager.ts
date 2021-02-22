import { isFunction, isUndefined } from "../helpers/utils";

interface IInterceptor<T> {
  fulfilled: IAppletsRequest.IResolved<T> | undefined;
  rejected: IAppletsRequest.IRejected | undefined;
}

function isValidInterceptor(executor: any): boolean {
  if (isUndefined(executor)) {
    return true;
  }

  if (isFunction(executor)) {
    return true;
  }

  return false;
}

export default class InterceptorManager<T> {
  private interceptors: (IInterceptor<T> | null)[];

  constructor() {
    this.interceptors = [];
  }

  use(
    fulfilled: IAppletsRequest.IResolved<T>,
    rejected?: IAppletsRequest.IRejected
  ): IAppletsRequest.IInterceptorId {
    const interceptor: IInterceptor<T> = {
      fulfilled: isValidInterceptor(fulfilled) ? fulfilled : undefined,
      rejected: isValidInterceptor(rejected) ? rejected : undefined,
    };
    this.interceptors.push(interceptor);

    return this.interceptors.length - 1;
  }

  eject(interceptorId: IAppletsRequest.IInterceptorId): void {
    if (!this.interceptors[interceptorId]) {
      return;
    }
    this.interceptors[interceptorId] = null;
  }

  forEach(
    fn: (
      interceptor: IInterceptor<T>,
      interceptorId: IAppletsRequest.IInterceptorId
    ) => void
  ): void {
    this.interceptors.forEach((interceptor, interceptorId) => {
      if (typeof fn === "function" && interceptor !== null) {
        fn(interceptor, interceptorId);
      }
    });
  }

  size(): number {
    return this.interceptors.length;
  }
}
