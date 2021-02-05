import { isUndefined } from "./utils";

export default function setContentTypeIfUnset(
  headers: any,
  value: string
): void {
  if (
    !isUndefined(headers) &&
    headers &&
    !isUndefined(headers["Content-Type"])
  ) {
    headers["Content-Type"] = value;
  }
}
