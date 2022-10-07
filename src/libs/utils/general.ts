import { ShopName } from "../../types/Product";

export const shopColors = {
    "cemaco": "#90d103",
    "epa": "#fedc00",
    "novex": "#0263b5"
}

export function getShopColor(shopName: ShopName) {
    return shopColors[shopName]
}