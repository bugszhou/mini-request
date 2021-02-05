export default function transformMethod(
  method: IMiniRequest.IMethod | undefined,
): IMiniRequest.INormalizeMethod {
  if (!method || typeof method !== "string") {
    return "GET";
  }
  return method.toUpperCase() as IMiniRequest.INormalizeMethod;
}
