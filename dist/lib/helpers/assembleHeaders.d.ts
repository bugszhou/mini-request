export declare function formattedHeader(headers: any, normalizedNames: string[]): Record<string, string>;
export default function assembleReqHeaders(headers: any, data: IAppletsRequest.IDataType): Record<string, string>;
export declare function filterHeaders(headers: Record<string, any> | undefined, method: string): Record<string, any>;
export declare function combineCookiesStr(cookiesString: string | undefined, cookieName: string | undefined): any;
