/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-02 18:16:24
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-02 18:56:46
 * @Description 创建副本，避免引用类型影响
 */

import { merge } from "./utils";

export default function copyConfig(
  config: IAppletsRequestConfig,
): IAppletsRequestConfig {
  if (!config) {
    return config;
  }
  return merge({}, config) as IAppletsRequestConfig;
}
