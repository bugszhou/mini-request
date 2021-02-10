import Cancel from "./Cancel";

interface ISourceReturn {
  token: CancelToken;
  cancel: CancelToken["cancel"];
}

export default class CancelToken {
  private reason: Cancel | undefined;

  private promise: Promise<IAppletsRequest.ICancelerIns>;

  private promiseResolve!: IAppletsRequest.IResolved<any>;

  static source(): ISourceReturn {
    let cancel: (message: string) => void;

    const token = new CancelToken((cancelFn) => {
      cancel = cancelFn;
    });
    return {
      token,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      cancel: cancel!,
    };
  }

  constructor(executor?: IAppletsRequest.IEmptyFN) {
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

  subscribeCancelEvent(
    listener: IAppletsRequest.IResolvedReturn<IAppletsRequest.ICancelerIns>
  ): any {
    return this.promise.then(listener);
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason;
    }
  }
}
