/*
 * @Author: youzhao.zhou
 * @Date: 2021-01-31 11:14:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-05 23:42:16
 * @Description 处理请求headers和处理响应headers
 */

import { getCookie } from "../adapters/wx/storageCookies";
import { isPlainObject, isString, merge } from "./utils";

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

export default function assembleReqHeaders(
  headers: any,
  data: IMiniRequest.IDataType
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

export function combineCookiesStr(
  cookiesString: string | undefined,
  cookieName: string | undefined
): any {
  if (!isString(cookiesString)) {
    return `${cookieName}=${getCookie(cookieName)}`;
  }
  return `${cookiesString}; ${cookieName}=${getCookie(cookieName)}`;
}
