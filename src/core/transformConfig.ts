/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-02 18:26:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-02 19:19:24
 * @Description 执行transform config，并且转换成对应环境的配置文件
 */

import copyConfig from "../helpers/copyConfig";
import { forEach } from "../helpers/utils";

export default function transformConfig(
  config: IAppletsRequestConfig,
  fns: IAppletsRequestConfig["transformConfig"],
): IAppletsRequestConfig {
  let formattedConfig = config;

  forEach(fns, (fn) => {
    if (typeof fn === "function") {
      formattedConfig = fn(config);
    }
  });

  return copyConfig(formattedConfig);
}
