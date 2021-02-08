/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-02 18:16:24
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-08 13:39:12
 * @Description 创建副本，避免引用类型影响
 */

import { merge } from "./utils";

export default function copyConfig(
  config: IAppletsRequestConfig | undefined | null
): IAppletsRequestConfig {
  if (!config) {
    return {};
  }
  if (Array.isArray(config)) {
    return merge([], config);
  }

  return merge({}, config) as IAppletsRequestConfig;
}
