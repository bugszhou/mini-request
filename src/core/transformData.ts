/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-02 17:57:28
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-05 23:11:21
 * @Description transformRequest和transformResponse辅助函数
 */

import { forEach } from "../helpers/utils";

export type ITransformer =
  | IAppletsRequest.ITransformer
  | IAppletsRequest.ITransformer[];

export default function transformData(
  data: any,
  headers: any,
  fns: ITransformer | undefined,
): IAppletsRequest.IDataType {
  let formattedData = data;

  forEach(fns, (fn) => {
    if (typeof fn === "function") {
      formattedData = fn(data, headers);
    }
  });

  return formattedData;
}
