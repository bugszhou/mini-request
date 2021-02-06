export default function configAdapter(
  config: IAppletsRequest.IHttpConfig,
): IAppletsRequestWx.RequestOption {
  const reqConfig: IAppletsRequestWx.RequestOption = {
    url: config.url || "",
    method: config.method,
    data: config.data,
    header: config.headers,
    dataType: "json",
    timeout: config.timeout,
  };

  const dataType = config.dataType || "json";
  reqConfig.dataType = dataType;

  if (config.responseType && config.responseType !== "json") {
    reqConfig.dataType = "其他";
  }
  return reqConfig;
}
