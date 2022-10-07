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
    const shopColor = getShopColor(bottomLabel || "epa");
    const linkClassNames = `w-full  text-center text-${bottomLabel} p-2 text-white bg-transparent hover:bg-${bottomLabel} border border-${bottomLabel} hover:text-white duration-500 font-bold`;

    return (
        <PlainLink
            to={itemUrl}
            target="_blank"
            onClick={e => e.stopPropagation()}
            className="flex flex-col items-center justify-between w-64 p-3 shadow-lg shadow-slate-300 border border-zinc-200 bg-transparent rounded-md  mx-1"
        >
            <img
                src={typeof image === "string" ? image : image?.src}
                alt={typeof image === "string" ? "" : image?.alt}
                className="w-full mx-0 object-cover h-40"
            />
            <div className="flex flex-col items-start mt-2 p-2 justify-between w-full">

                <h3 className="text-base text-left w-full">
                    {title}
                </h3>

                <Paragraph className="text-xl text-right font-bold text-black">
                    {price}
                </Paragraph>
            </div>
            <Paragraph className="tex-lg text-left w-full px-2 text-black text-opacity-40">{description?.substring(0, 30)}</Paragraph>

            <Paragraph fontSizeVariant="2xl" style={{ color: shopColor }}>
                {bottomLabel?.toUpperCase()}
            </Paragraph>

            <PlainLink
                className={linkClassNames}
                to={itemUrl}
                onClick={e => e.stopPropagation()}
                target="_blank"
            >
                {buttonText}
            </PlainLink>
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