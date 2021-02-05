import { isUndefined } from "../helpers/utils";

export default function isNetworkError(response: IMiniRequestRejectData): boolean {
  if (isUndefined(response) || response === null) {
    return false;
  }
  return response.status === "NETWORK_ERROR";
}
