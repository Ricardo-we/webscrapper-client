import Button from "./Buttons/Button";
import { FunctionComponent } from "react";
import Paragraph from "./Text/Paragraph";

interface ProductCardProps {
    image?: { src?: string, alt?: string } | string;
    title?: string;
    description?: string;
    buttonText?: string;
    shopName?: string;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ image, title, description, buttonText, shopName }) => {
    return (
        <div className="flex-col w-64 p-2  rounded-md  mx-auto">
            <img
                src={typeof image === "string" ? image : image?.src}
                alt={typeof image === "string" ? "" : image?.alt}
                className="w-full mx-0 object-cover"
            />

            <h3 className="text-xl">
                {title}
            </h3>

            <Paragraph>{description}</Paragraph>
            <Button variant="indigo">{buttonText}</Button>
        </div>
    );
}

export default ProductCard;