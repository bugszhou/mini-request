import { isUndefined } from "../helpers/utils";

export default function isCancel(canceler: any): boolean {
  if (isUndefined(canceler)) {
    return false;
  }
  return canceler && canceler.isCancel;
}
