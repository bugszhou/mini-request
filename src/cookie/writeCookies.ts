import { STORAGE_COOKIES_KEY } from "../defaults";
import { isFunction } from "../helpers/utils";

export default function writeCookies(
  config: IAppletsRequestConfig,
  cookies: any
): void {
  if (!config.autoCookies || !isFunction(config.writeCookies)) {
    return;
  }

  config.writeCookies?.(STORAGE_COOKIES_KEY, cookies);
}
