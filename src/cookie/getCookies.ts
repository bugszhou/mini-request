import { STORAGE_COOKIES_KEY } from "../defaults";
import { isFunction, isString } from "../helpers/utils";

export default function getCookies(
  config: IAppletsRequestConfig
): Record<string, any> {
  if (!isFunction(config.readCookies)) {
    return {};
  }

  return config.readCookies?.(STORAGE_COOKIES_KEY) as Record<string, any>;
}

export function getCookie(
  cookies: Record<string, any>,
  cookieName: string | undefined
): string {
  try {
    if (!cookies || !cookieName || !isString(cookies[cookieName])) {
      return "";
    }

    return cookies[cookieName];
  } catch (e) {
    console.error(e);
    return "";
  }
}
