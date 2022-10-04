import Product, { ShopName } from "../../types/Product";

import Button from "./Buttons/Button";
import { FunctionComponent } from "react";
import Paragraph from "./Text/Paragraph";
import { PlainLink } from "./Link";
import { getShopColor } from "../../libs/utils/general";
import useLanguage from "../../hooks/useLanguage";

interface ProductCardProps {
    image?: { src?: string, alt?: string } | string;
    title?: string;
    description?: string;
    buttonText?: string;
    bottomLabel?: ShopName;
    itemId?: number | string
    itemUrl: string;
    price?: string | number;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ image, title, description, buttonText, bottomLabel, itemId, itemUrl, price }) => {

    return (
        <PlainLink
            to={`/details/${itemId}`}
            className="flex flex-col items-center justify-between w-80 m-2 p-4 shadow-md bg-transparent rounded-md  mx-auto"
        >
            <img
                src={typeof image === "string" ? image : image?.src}
                alt={typeof image === "string" ? "" : image?.alt}
                className="w-full mx-0 object-cover h-56"
            />

            <h3 className="text-xl">
                {title}
            </h3>
            <Paragraph fontSizeVariant="xl" textColor="blue">
                {price}
            </Paragraph>

            <Paragraph>{description}</Paragraph>
            <Paragraph fontSizeVariant="2xl" style={{ color: getShopColor(bottomLabel || "epa") }}>
                {bottomLabel?.toUpperCase()}
            </Paragraph>

            <PlainLink className="w-full text-center bg-indigo-700 p-2 text-white" to={itemUrl}>{buttonText}</PlainLink>
        </PlainLink>
    );
}

export const mapProductList = ({ products }: { products: Product[] }): JSX.Element[] => {
    const { language } = useLanguage("es");

    return products?.map((product, index) => (
        <ProductCard
            key={index}
            image={product?.image}
            title={product?.name}
            description={product?.description}
            bottomLabel={product?.shopName}
            itemId={product?.id}
            price={(product?.currencySymbol || "Q") + product?.price}
            itemUrl={product?.productUrl}
            buttonText={language?.general?.checkDetails + product?.shopName}
        />
    ))
}

export default ProductCard;