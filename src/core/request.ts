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
import storageCookies, { getCookie } from "../adapters/wx/storageCookies";
import { isPlainObject } from "../helpers/utils";
import parseCookies from "../helpers/parseCookie";
import { createError } from "./MiniRequestError";
import combineURLs from "../helpers/combineURLs";
import isAbsoluteURL from "../helpers/isAbsoluteURL";

async function request(
  config: IMiniRequestConfig,
): Promise<IMiniRequestResponse> {
  const transformedConfig = formattedConfig(config);

  try {
    const res = await config.adapter!(transformedConfig);

    throwIfCancellationRequested(transformedConfig);

    if (isPlainObject(res.headers)) {
      res.cookies = parseCookies(
        formattedHeader(res.headers, ["Set-Cookie"])["Set-Cookie"],
      );
    }

    if (config.autoCookies) {
      storageCookies(res.cookies);
    }

    if (
      typeof config.validateStatus === "function" &&
      config.validateStatus(res.status)
    ) {
      res.data = transformData(
        res.data,
        res.headers,
        transformedConfig.transformResponse,
      );

      return res;
    }

    return Promise.reject(
      createError(
        `Request failed with status code ${res.status}`,
        res.config,
        res.status,
        res,
      ),
    );
  } catch (reason) {
    if (isCancel(reason)) {
      return Promise.reject(reason);
    }

    throwIfCancellationRequested(transformedConfig);

    const err = reason as IMiniRequestRejectData;

    if (err && err.response) {
      err.response.data = transformData(
        err.response.data,
        err.response.headers,
        transformedConfig.transformResponse,
      );
    }

    return Promise.reject(
      createError(err.errMsg, err.config, err.status, err.response, err.extra),
    );
  }
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config: IMiniRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

function formattedConfig(config: IMiniRequestConfig): IMiniRequest.IHttpConfig {
  throwIfCancellationRequested(config);

  const { baseURL, url, params } = config;
  const combinedURL = isAbsoluteURL(url) ? url : combineURLs(baseURL, url!);
  const formattedUrl = transformUrl(
    combinedURL!,
    params,
    config.paramsSerializer,
  );
  const method = transformMethod(config.method);

  let transformedConfig: IMiniRequestConfig = {
    ...config,
    // 过滤headers中无用的配置
    headers: filterHeaders(config.headers, method),
  };

  // 先执行data转换
  transformedConfig.data = transformData(
    transformedConfig.data,
    transformedConfig.headers,
    transformedConfig.transformRequest,
  );

  transformedConfig.headers = assembleReqHeaders(
    transformedConfig.headers,
    transformedConfig.data,
  );

  // 后执行config转换，最后返回config副本，避免引用类型导致数据混乱问题
  transformedConfig = transformConfig(
    transformedConfig,
    config.transformConfig,
  );

  // 添加Cookie头
  const cookiesStr = getCookiesStr(transformedConfig);
  if (cookiesStr) {
    transformedConfig.headers!.Cookies = cookiesStr;
  }

  // xsrf 防御
  const xsrfToken = getCookie(transformedConfig.xsrfCookieName);
  if (xsrfToken) {
    transformedConfig.headers![transformedConfig.xsrfHeaderName!] = xsrfToken;
  }

  return {
    ...transformedConfig,
    url: formattedUrl,
    method,
    headers: transformedConfig.headers as Record<string, string>,
    getRequestTask: formattedGetRequestTaskFunction(
      transformedConfig.getRequestTask,
    ),
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

function getCookiesStr(config: IMiniRequestConfig): string {
  if (config.withCredentials || isURLSameOrigin()) {
    return combineCookiesStr(
      config.headers!.Cookies as string,
      config.xsrfCookieName,
    );
  }
  return "";
}

export default request;
