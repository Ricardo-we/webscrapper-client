import { RequestConfig, RequestConfigParamsRequired } from "../base/BaseRequest";

export default interface BaseService {
    endpointName: string;
    request: BaseRequest
    find?: (requestConfig?: RequestConfig) => Promise<any>;
    post?: (requestConfig?: RequestConfig) => Promise<any>;
    update?: (requestConfig: RequestConfigParamsRequired) => Promise<any>;
    destroy?: (requestConfig?: RequestConfigParamsRequired) => Promise<any>;
}