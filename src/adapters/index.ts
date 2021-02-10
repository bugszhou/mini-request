import transformMethod from "../helpers/transformMethod";
import Adapter from "./Adapter";

export type IAdapterFn = (
  config: IAppletsRequestConfig
) => IAppletsRequestPromise;

export default function getDefaultAdapter(): IAdapterFn {
  return defaultAdapter;
}

function defaultAdapter(config: IAppletsRequestConfig): IAppletsRequestPromise {
  console.error(
    "defaultAdapter: ",
    "Pls set adapter!!! Don't use default adapter"
  );
  console.error("defaultAdapter: ", config);
  const adapter = new Adapter({
    method: transformMethod(config.method),
    ...config,
  } as IAppletsRequest.IHttpConfig);
  return new Promise((resolve) => {
    adapter.resolve(
      {
        data: {},
        headers: {},
        status: 404,
        response: null,
      },
      resolve
    );
  });
}
