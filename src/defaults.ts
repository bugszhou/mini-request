// import getDefaultAdapter from "./adapters";
import normalizeHeaderName from "./helpers/normalizeHeaderName";
import setContentTypeIfUnset from "./helpers/setContentTypeIfUnset";
import { isPlainObject } from "./helpers/utils";

const DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded";

const defaults: IAppletsRequestConfig = {
  // adapter: getDefaultAdapter(),

  method: "GET",

  timeout: 10000,

  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
    ...getDefaultHeaders(),
  },

  transformConfig: [],

  transformRequest: [
    (data, headers): IAppletsRequest.IDataType => {
      normalizeHeaderName(headers, "Accept");
      normalizeHeaderName(headers, "Content-Type");

      if (isPlainObject(data)) {
        setContentTypeIfUnset(headers, "application/json; charset=utf-8");
      }
      return data;
    },
  ],

  transformResponse: [],

  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",

  validateStatus(status): boolean {
    if (status >= 200 && status < 300) {
      return true;
    }

    return false;
  },
};

function getDefaultHeaders(): any {
  const headers: any = {};
  ["delete", "get", "head", "options"].forEach((method) => {
    headers[method] = {};
  });
  ["post", "put", "patch"].forEach((method) => {
    headers[method] = {
      "Content-Type": DEFAULT_CONTENT_TYPE,
    };
  });

  return headers;
}

export const STORAGE_COOKIES_KEY = "miniRequest:cookies";

export default defaults;
