import AppletsRequest from "./core/AppletsRequest";
/**
 * 创建AppletsRequest实例
 * @param {IAppletsRequestConfig} config
 */
export declare function createAppletsRequestInstance(config?: IAppletsRequestConfig): AppletsRequestInstance;
/**
 * 默认miniRequest
 */
declare const miniRequest: AppletsRequestInstance;
export default miniRequest;
export { AppletsRequest as AppletsRequest };
