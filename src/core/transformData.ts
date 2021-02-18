/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-02 17:57:28
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-18 16:01:15
 * @Description transformRequest和transformResponse辅助函数
 */

import { forEach } from "../helpers/utils";

export type ITransformer =
  | IAppletsRequest.ITransformer
  | IAppletsRequest.ITransformer[];

/**
 * custom data format
 * @param data request data
 * @param headers request headers
 * @param fns transformData function in config
 */
export default function transformData(
  data: any,
  headers: any,
  fns: ITransformer | undefined
): IAppletsRequest.IDataType {
  let formattedData = data;

  forEach(fns, (fn) => {
    if (typeof fn === "function") {
      formattedData = fn(formattedData, headers);
    }
  });

  return formattedData;
}
