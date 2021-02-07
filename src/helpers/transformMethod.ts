export default function transformMethod(
  method?: IAppletsRequest.IMethod | undefined
): IAppletsRequest.INormalizeMethod {
  if (!method || typeof method !== "string") {
    return "GET";
  }
  return method.toUpperCase() as IAppletsRequest.INormalizeMethod;
}
