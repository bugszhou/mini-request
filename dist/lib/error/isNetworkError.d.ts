/**
 * 根据response.status的值来判断是不是NETWORK_ERROR(网络错误)，如：请求不可用等
 * @param response 任何类型的响应数据
 * @example
 * // return true
 * isNetworkError({status: "NETWORK_ERROR"});
 * // return false
 * isNetworkError({status: "TIMEOUT"});
 * // return false
 * isNetworkError({});
 * @returns true or false
 *
 */
export default function isNetworkError(response: any): boolean;
