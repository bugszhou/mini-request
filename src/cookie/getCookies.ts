import { STORAGE_COOKIES_KEY } from "../defaults";
import { isFunction, isUndefined } from "../helpers/utils";

export default function getCookies(
  config: IAppletsRequestConfig
): Record<string, any> {
  if (!config || !isFunction(config.readCookies)) {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return config.readCookies!(STORAGE_COOKIES_KEY) as Record<string, any>;
}

export function getCookie(
  cookies: Record<string, any>,
  cookieName: string | undefined
): string {
  if (!cookies || !cookieName) {
    return "";
  }
  const cookie = cookies[cookieName];

  return isUndefined(cookie) || cookie === null ? "" : cookies[cookieName];
}
