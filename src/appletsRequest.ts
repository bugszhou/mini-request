import AppletsRequest from "./core/AppletsRequest";
import getDefaults from "./defaults";

/**
 * 创建AppletsRequest实例
 * @param {IAppletsRequestConfig} config
 */
export function createAppletsRequestInstance(
  config?: IAppletsRequestConfig
): AppletsRequestInstance {
  const request = new AppletsRequest(config);

  return request.create(config);
}

/**
 * 默认miniRequest
 */
const miniRequest = createAppletsRequestInstance();

export default miniRequest;

export { AppletsRequest as AppletsRequest };

export { getDefaults as getDefaults };
