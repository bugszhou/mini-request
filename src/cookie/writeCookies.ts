import { STORAGE_COOKIES_KEY } from "../defaults";
import { isFunction } from "../helpers/utils";

export default function writeCookies(
  config: IAppletsRequestConfig,
  cookies: any
): void {
  if (!config.autoCookies || !isFunction(config.writeCookies)) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  config.writeCookies!(STORAGE_COOKIES_KEY, cookies);
}
