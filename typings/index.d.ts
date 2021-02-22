/// <reference path="./AppletsRequest.d.ts" />
/// <reference path="./WeappRequest.d.ts" />

declare const AppletsRequest: AppletsRequest;
declare const appletsRequest: AppletsRequestInstance;

export default appletsRequest;

export { AppletsRequest as AppletsRequest };

export function createAppletsRequestInstance(
  config?: IAppletsRequestConfig
): AppletsRequestInstance;

export function getDefaults(): IAppletsRequestConfig;
