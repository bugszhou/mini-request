export declare type ITransformer = IAppletsRequest.ITransformer | IAppletsRequest.ITransformer[];
/**
 * custom data format
 * @param data request data
 * @param headers request headers
 * @param fns transformData function in config
 */
export default function transformData(data: any, headers: any, fns: ITransformer | undefined): IAppletsRequest.IDataType;
