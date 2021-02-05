export default function configAdapter(
  config: IMiniRequest.IHttpConfig,
): IMiniRequestWx.RequestOption {
  const reqConfig: IMiniRequestWx.RequestOption = {
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
