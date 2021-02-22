/**
 * 格式化请求头中key的格式
 * @param headers 请求头数据
 * @param normalizedNames 标准的请求头key值，如：["Content-Type"]
 * @example
 * // Returns {"Content-Type", "plain/text"}
 * formatterHeader({"content-type": "plain/text"}, ["Content-Type"]);
 * @returns {Object} 返回标准化的请求头数据
 */
export declare function formattedHeader(headers: any, normalizedNames: string[]): Record<string, string>;
/**
 * 先将headers的key标准化处理，如果未设置Content-Type的，根据传输的数据类型，设置Content-Type的值
 * @param headers 请求头
 * @param data 请求body体中的数据
 * @example
 * // return {"Content-Type": "application/json; charset=utf-8"}
 * assembleReqHeaders({}, {username: "tome"});
 * @returns {Record<string, string>}
 */
export default function assembleReqHeaders(headers: any, data: IAppletsRequest.IDataType | undefined): Record<string, string>;
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
export declare function filterHeaders(headers: Record<string, any> | undefined, method: string): Record<string, any>;
/**
 * 和原有的cookie string拼接成新的cookie string
 * @param cookiesString header中已存在的cookie string
 * @param cookieName 需要新加入的cookie keyName
 * @example
 * // return token=tokenString; username=tom
 * combineCookieStr("token=tokenString", "username");
 * @returns {string} 拼接后的cookie string
 */
export declare function combineCookiesStr(cookiesString: string | undefined, cookieName: string | undefined, cookieVal: any): any;
