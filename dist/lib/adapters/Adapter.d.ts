export default class Adapter {
    private reqConfig;
    constructor(config: IAppletsRequest.IHttpConfig);
    /**
     * 接口请求成功执行该方法
     * @param options response数据
     * @param resolve Promise.resolve
     */
    resolve(options: IAppletsRequest.IAdapterResolveOptions, resolve: IAppletsRequest.IResolved<any>): void;
    /**
     * 接口请求失败执行该方法
     * @param options response数据
     * @param reject Promise.reject
     */
    reject(options: IAppletsRequest.IAdapterRejectOptions, reject: IAppletsRequest.IRejected): void;
    /**
     * 取消接口请求
     * @param listener 监听执行取消接口请求操作的监听函数
     */
    subscribeCancelEvent(listener: (reason: IAppletsRequest.ICancelerIns) => any): any;
    private copyAdapterConfig;
}
