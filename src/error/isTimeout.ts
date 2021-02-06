import { isUndefined } from "../helpers/utils";

export default function isTimeout(
  response: IAppletsRequestRejectData
): boolean {
  if (isUndefined(response) || response === null) {
    return false;
  }
  return response.status === "TIMEOUT";
}
