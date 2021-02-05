import MiniRequest from "./core/MiniRequest";

/**
 * 创建MiniRequest实例
 * @param {IMiniRequestConfig} config
 */
export function createMiniRequestInstance(
  config?: IMiniRequestConfig,
): MiniRequestInstance {
  const request = new MiniRequest(config);

  return request.create(config);
}

/**
 * 默认miniRequest
 */
const miniRequest = createMiniRequestInstance();

export default miniRequest;
