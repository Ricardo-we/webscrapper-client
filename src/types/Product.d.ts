export default interface Product {
    currencySymbol?: string;
    description: string;
    id: number;
    image: string;
    isOffer: boolean;
    name: string;
    price: number;
    productKey: string;
    productUrl: string;
    shopName: ShopName;
}

export enum ShopName {
    Cemaco = "cemaco",
    Epa = "epa",
    Novex = "novex"
}
