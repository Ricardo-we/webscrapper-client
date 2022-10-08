import { ShopName } from "../../types/Product";
import logger from "../base/Logger";

export const shopColors = {
    "cemaco": "#90d103",
    "epa": "#fedc00",
    "novex": "#0263b5"
}

export function getShopColor(shopName: ShopName) {
    return shopColors[shopName]
}

export function safeJsonParse(item: any) {
    try {
        return JSON.parse(item)
    } catch (err) {
        logger.error(err)
        return {}
    }
}