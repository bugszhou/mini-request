import { isFunction, isUndefined } from "../helpers/utils";
import wxRequest from "./wx/weappRequest";

export type IAdapterFn = (config: IAppletsRequestConfig) => IAppletsRequestPromise;

export default function getDefaultAdapter(): IAdapterFn {
  if (!isUndefined(wx) && isFunction(wx.request)) {
    return wxRequest as IAdapterFn;
  }
  return Promise.resolve;
}
