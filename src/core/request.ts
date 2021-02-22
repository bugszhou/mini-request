/* eslint-disable @typescript-eslint/no-non-null-assertion */
import assembleReqHeaders, {
  combineCookiesStr,
  filterHeaders,
  formattedHeader,
} from "../helpers/assembleHeaders";
import transformMethod from "../helpers/transformMethod";
import transformUrl from "../helpers/transformUrl";
import transformConfig from "./transformConfig";
import transformData from "./transformData";
import isCancel from "../cancel/isCancel";
import isURLSameOrigin from "../helpers/isURLSameOrigin";
import getCookies, { getCookie } from "../cookie/getCookies";
import { isPlainObject } from "../helpers/utils";
import parseCookies from "../cookie/parseCookie";
import { createError } from "./AppletsRequestError";
import combineURLs from "../helpers/combineURLs";
import isAbsoluteURL from "../helpers/isAbsoluteURL";
import Adapter from "../adapters/Adapter";
import writeCookies from "../cookie/writeCookies";

async function request(
  config: IAppletsRequestConfig
): Promise<IAppletsRequestResponse> {
  const transformedConfig = formattedConfig(config);

  try {
    const res = await config.adapter!(transformedConfig);

    throwIfCancellationRequested(transformedConfig);

    if (isPlainObject(res.headers)) {
      res.cookies = parseCookies(
        formattedHeader(res.headers, ["Set-Cookie"])["Set-Cookie"]
      );
    }

    writeCookies(config, res.cookies);

    if (
      typeof config.validateStatus === "function" &&
      config.validateStatus(res.status)
    ) {
      res.data = transformData(
        res.data,
        res.headers,
        transformedConfig.transformResponse
      );

      return res;
    }

    return Promise.reject(
      createError(
        `Request failed with status code ${res.status}`,
        res.config,
        res.status,
        res
      )
    );
  } catch (reason) {
    if (isCancel(reason)) {
      return Promise.reject(reason);
    }

    throwIfCancellationRequested(transformedConfig);

    const err = reason as IAppletsRequestRejectData;

    if (err && err.response) {
      err.response.data = transformData(
        err.response.data,
        err.response.headers,
        transformedConfig.transformResponse
      );
    }

    if (err instanceof TypeError) {
      return Promise.reject(
        createError(err.message, err.config, "SCRIPT_ERROR", err.response, err)
      );
    }

    return Promise.reject(
      createError(err.errMsg, err.config, err.status, err.response, err.extra)
    );
  }
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config: IAppletsRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

function formattedConfig(
  config: IAppletsRequestConfig
): IAppletsRequest.IHttpConfig {
  throwIfCancellationRequested(config);

  const { baseURL, url, params } = config;
  const combinedURL = isAbsoluteURL(url) ? url : combineURLs(baseURL, url!);
  const formattedUrl = transformUrl(
    combinedURL!,
    params,
    config.paramsSerializer
  );
  const method = transformMethod(config.method);

  let transformedConfig: IAppletsRequestConfig = {
    ...config,
    // 过滤headers中无用的配置
    headers: filterHeaders(config.headers, method),
  };

  // 先执行data转换
  transformedConfig.data = transformData(
    transformedConfig.data,
    transformedConfig.headers,
    transformedConfig.transformRequest
  );

  transformedConfig.headers = assembleReqHeaders(
    transformedConfig.headers,
    transformedConfig.data
  );

  // 后执行config转换，最后返回config副本，避免引用类型导致数据混乱问题
  transformedConfig = transformConfig(
    transformedConfig,
    config.transformConfig
  );

  // 添加Cookie头
  const cookiesStr = getCookiesStr(transformedConfig);
  if (cookiesStr) {
    transformedConfig.headers!.Cookies = cookiesStr;
  }

  // xsrf 防御
  const xsrfToken = getCookie(
    getCookies(config),
    transformedConfig.xsrfCookieName
  );
  if (xsrfToken) {
    transformedConfig.headers![transformedConfig.xsrfHeaderName!] = xsrfToken;
  }

  return {
    ...transformedConfig,
    url: formattedUrl,
    method,
    headers: transformedConfig.headers as Record<string, string>,
    getRequestTask: formattedGetRequestTaskFunction(
      transformedConfig.getRequestTask
    ),
    Adapter,
  };
}

function formattedGetRequestTaskFunction(fn: any): () => any {
  if (typeof fn === "function") {
    return fn;
  }
  return (): void => {
    // empty
  };
}

function getCookiesStr(config: IAppletsRequestConfig): string {
  if (config.withCredentials || isURLSameOrigin()) {
    return combineCookiesStr(
      config.headers!.Cookies as string,
      config.xsrfCookieName,
      getCookie(getCookies(config), config.xsrfCookieName)
    );
  }
  return "";
}

export default request;
