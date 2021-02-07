/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-30 16:44:44
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-07 12:29:11
 * @Description 处理url，将params数据，以query的方式拼接到url上，
 * @example /demo?p1=12&p2=34
 *
 * 需要处理的逻辑有：
 * 1. 丢弃URL中哈希#部分
 * 2. 忽略null和undefined的数据
 * 3. 参数值为数组
 * 4. 参数值为对象
 * 5. 参数值为Date类型
 * 6. 可以出现在URL中的特殊字符
 * 7. 保留url中的参数
 */

import { isDate, isFunction, isObject, isPlainObject } from "./utils";

/**
 * @returns [key, val]
 */
export type IParamsEntries = [string, string];

function parseUrl(
  url: string,
  params: string | { [key: string]: any },
  paramsSerializer?: IAppletsRequest.IEmptyFN
): string {
  const tmpUrl = removeHash(url);

  if (typeof params === "string") {
    return assembleUrl(tmpUrl, params);
  }

  const paramsKeys = Object.keys(!isObject(params) ? {} : params);

  if (paramsKeys.length === 0 && !isFunction(paramsSerializer)) {
    return tmpUrl;
  }

  const queryStr = isFunction(paramsSerializer)
    ? paramsSerializer?.(params)
    : parseQueryStr(paramsKeys, params);

  if (!queryStr) {
    return tmpUrl;
  }

  return assembleUrl(tmpUrl, queryStr);
}

function assembleUrl(url: string, queryStr: string): string {
  return url.includes("?") ? `${url}&${queryStr}` : `${url}?${queryStr}`;
}

/**
 * 移除值为null和undefined的属性
 * @param val params中的value
 */
function removeNullAndUndefinedVal(val: any): boolean {
  if (val === null || typeof val === "undefined") {
    return false;
  }

  return true;
}

/**
 * 获取query str
 * @param paramsKeys string[]
 * @param params object
 * @returns demo=234&demo1=demo
 */
function parseQueryStr(paramsKeys: string[], params: any): string {
  const paramsEntries: IParamsEntries[] = paramsKeys
    .filter((paramsKey) => removeNullAndUndefinedVal(params[paramsKey]))
    .map((paramKey) => parseParam(paramKey, params[paramKey]));

  if (paramsEntries.length === 0) {
    return "";
  }

  return paramsEntries.reduce((preStr, curParam): string => {
    if (!curParam[0] || !curParam[1]) {
      return preStr;
    }

    return `${preStr ? `${preStr}&` : ""}${curParam.join("=")}`;
  }, "");
}

function parseParam(key: string, val: any): IParamsEntries {
  if (Array.isArray(val)) {
    return parseArrayVal(key, val);
  }

  if (isDate(val)) {
    return [encode(key), encode(val.toISOString())];
  }

  if (isPlainObject(val)) {
    return [encode(key), encode(JSON.stringify(val))];
  }

  return [key, val];
}

/**
 * 处理参数值类型为数组的参数
 * @param key 参数名
 * @param val 参数值
 * @returns [key, ${val[0]}&${key}[]=${val[1]}&....&${key}[]=${val[n]}]
 */
function parseArrayVal(key: string, val: any[]): IParamsEntries {
  const values = val.map((item, i) => {
    if (i === 0) {
      return item;
    }
    return `${encode(`${key}[]`)}=${encode(item)}`;
  });
  return [encode(`${key}[]`), values.join("&")];
}

function removeHash(url: string): string {
  return url.includes("#") ? url.slice(0, url.indexOf("#")) : url;
}

function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}

export default function transformUrl(
  url: string,
  params?: any,
  paramsSerializer?: IAppletsRequest.IEmptyFN
): string {
  if (!url) {
    return removeHash(url);
  }
  return parseUrl(url, params, paramsSerializer);
}
