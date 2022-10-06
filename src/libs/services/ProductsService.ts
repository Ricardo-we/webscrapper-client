import BaseRequest, { RequestConfig } from "../base/BaseRequest";

import BaseService from "./BaseService";
import Product from "../../types/Product";

function extractProduct(product: any): Product {
    return {
        currency_symbol: product?.currency_symbol,
        description: product?.description,
        id: product?.id,
        image: product?.image,
        isOffer: product?.is_offer,
        name: product?.name,
        price: product?.price,
        productKey: product?.product_key,
        productUrl: product?.product_url,
        shopName: product?.shop_name
    } as Product
}

export default class ProductsService implements BaseService {
    endpointName = "products"
    request: BaseRequest = new BaseRequest(this.endpointName);

    constructor() { }

    async find(requestConfig?: RequestConfig) {
        const data = await this.request.find(requestConfig || {});
        if (!(data instanceof Array) || !data || data?.length <= 0) return [];
        const products = data?.map(extractProduct);
        return products;
    }

    async post() {

    }

    async update() {

    }

    async destroy() {

    }
}