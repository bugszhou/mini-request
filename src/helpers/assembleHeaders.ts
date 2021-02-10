/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-31 11:14:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-10 17:10:35
 * @Description 处理请求headers和处理响应headers
 */
import { isPlainObject, isString, merge } from "./utils";

/**
 * 格式化请求头中key的格式
 * @param headers 请求头数据
 * @param normalizedNames 标准的请求头key值，如：["Content-Type"]
 * @example
 * // Returns {"Content-Type", "plain/text"}
 * formatterHeader({"content-type": "plain/text"}, ["Content-Type"]);
 * @returns {Object} 返回标准化的请求头数据
 */
export function formattedHeader(
  headers: any,
  normalizedNames: string[]
): Record<string, string> {
  const normalizedHeaders: Record<string, string> = {};
  if (!isPlainObject(headers)) {
    return normalizedHeaders;
  }

  if (normalizedNames.length === 0) {
    return headers;
  }

  const headerUpperKeyMapping: Record<string, string> = {};
  normalizedNames.forEach((key) => {
    headerUpperKeyMapping[key.toUpperCase()] = key;
  });

  Object.keys(headers).forEach((header) => {
    const upperHeader = header.toUpperCase();
    const normalizedKey = headerUpperKeyMapping[upperHeader];
    normalizedHeaders[normalizedKey || header] = headers[header];
  });

  return normalizedHeaders;
}

/**
 * 先将headers的key标准化处理，如果未设置Content-Type的，根据传输的数据类型，设置Content-Type的值
 * @param headers 请求头
 * @param data 请求body体中的数据
 * @example
 * // return {"Content-Type": "application/json; charset=utf-8"}
 * assembleReqHeaders({}, {username: "tome"});
 * @returns {Record<string, string>}
 */
export default function assembleReqHeaders(
  headers: any,
  data: IAppletsRequest.IDataType | undefined
): Record<string, string> {
  const reqHeaders = formattedHeader(Object.assign(headers || {}), [
    "Content-Type",
  ]);

  if (isPlainObject(data) && !reqHeaders["Content-Type"]) {
    reqHeaders["Content-Type"] = "application/json; charset=utf-8";
  }

  if (data === null || typeof data === "undefined") {
    delete reqHeaders["Content-Type"];
  }

  return reqHeaders;
}

/**
 * 合并headers中【headers.common】[headers[method]】数据，删除不需要的默认属性
 * @param headers 请求头数据
 * @param method 请求method
 * @example
 * // Return {"Content-Type": "plain/text", "Accept": "*"}
 * filterHeaders({
 *   common: {
 *     "Content-Type": "plain/text"
 *   },
 *   post: {
 *     "Accept": "*"
 *   }
 * }, "post");
 * @returns {Record<string, any>} 返回完整可用的headers
 *
 * {"Content-Type": "plain/text", "Accept": "*"}
 */
export function filterHeaders(
  headers: Record<string, any> | undefined,
  method: string
): Record<string, any> {
  if (!headers) {
    return {};
  }

  const mergedHeaders: Record<string, any> = merge(
    headers.common,
    headers[method.toLowerCase()],
    headers
  );

  [
    "delete",
    "get",
    "post",
    "head",
    "patch",
    "put",
    "options",
    "common",
  ].forEach((deleteMethod) => {
    delete mergedHeaders[deleteMethod];
  });

  return mergedHeaders;
}

/**
 * 和原有的cookie string拼接成新的cookie string
 * @param cookiesString header中已存在的cookie string
 * @param cookieName 需要新加入的cookie keyName
 * @example
 * // return token=tokenString; username=tom
 * combineCookieStr("token=tokenString", "username");
 * @returns {string} 拼接后的cookie string
 */
export function combineCookiesStr(
  cookiesString: string | undefined,
  cookieName: string | undefined,
  cookieVal: any
): any {
  if (!cookieName && String(cookieName) !== String(0)) {
    return cookiesString;
  }

  if (!isString(cookiesString)) {
    return !cookieVal && String(cookieVal) !== "0"
      ? cookieName
      : `${spliceCookieStr(cookieName as string, cookieVal)}`;
  }
  return `${cookiesString}; ${spliceCookieStr(
    cookieName as string,
    cookieVal
  )}`;
}

function spliceCookieStr(cookieName: string, cookieVal: any): string {
  return !cookieVal && String(cookieVal) !== "0"
    ? cookieName
    : `${cookieName}=${cookieVal}`;
}
