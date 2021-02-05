export default function combineURLs(
  baseURL: string | undefined,
  relativeURL: string | undefined
): string {
  const tmpBaseURL = baseURL || "";
  const tmpRelativeURL = relativeURL || "";

  return tmpRelativeURL
    ? `${tmpBaseURL.replace(/\/+$/, "")}/${tmpRelativeURL.replace(/^\/+/, "")}`
    : tmpBaseURL;
}
