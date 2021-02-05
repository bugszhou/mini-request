import Cancel from "./Cancel";

interface ISourceReturn {
  token: CancelToken;
  cancel: CancelToken["cancel"];
}

export default class CancelToken {
  private reason: Cancel | undefined;

  private promise: Promise<string>;

  private promiseResolve: IMiniRequest.IResolved<any> = (): any => {
    // empty
  };

  static source(): ISourceReturn {
    let cancel = (): void => {
      // empty
    };
    const token = new CancelToken((cancelFn) => {
      cancel = cancelFn;
    });
    return {
      token,
      cancel,
    };
  }

  constructor(executor?: IMiniRequest.IEmptyFN) {
    this.promise = new Promise((resolve) => {
      this.promiseResolve = resolve;
    });

    if (typeof executor === "function") {
      executor(this.cancel.bind(this));
    }
  }

  cancel(message: string): void {
    if (this.reason) {
      return;
    }
    this.reason = new Cancel(message);
    this.promiseResolve(this.reason);
  }

  execAbort(resolution: IMiniRequest.IResolved<any>): any {
    return this.promise.then(resolution);
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason;
    }
  }
}
