import { forEach } from "./utils";

export default function normalizeHeaderName(
  headers: any,
  normalizedHeaderName: string
) {
  if (!normalizedHeaderName) {
    return;
  }
  forEach(headers, (headerValue, headerName: string) => {
    if (
      headerName !== normalizedHeaderName &&
      headerName.toUpperCase() === normalizedHeaderName.toUpperCase()
    ) {
      headers[normalizedHeaderName] = headerValue;
      delete headers[headerName];
    }
  });
}
