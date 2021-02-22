/**
 * 将baseURL和relativeURL组合成完整的URL
 * @param baseURL defaults中配置的baseURL
 * @param relativeURL 请求的相对URL
 * @example
 * // returns https://xxx.com/api/login
 * combineURLs("https://xxx.com", "/api/login")
 * @returns {string} Returns baseURL and relativeURL are spliced together
 */
export default function combineURLs(baseURL: string | undefined, relativeURL: string | undefined): string;
