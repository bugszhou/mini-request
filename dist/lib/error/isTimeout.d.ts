/**
 * 根据response.status的值来判断是不是TIMEOUT(超时)
 * @param response 任何类型的响应数据
 * @example
 * // return true
 * isTimeout({status: "TIMEOUT"});
 * // return false
 * isTimeout({status: "NETWORK_ERROR"});
 * // return false
 * isTimeout({});
 * @returns true or false
 *
 */
export default function isTimeout(response: any): boolean;
