import Button from "./Buttons/Button";
import { FunctionComponent } from "react";
import Paragraph from "./Text/Paragraph";
import { PlainLink } from "./Link";

interface ProductCardProps {
    image?: { src?: string, alt?: string } | string;
    title?: string;
    description?: string;
    buttonText?: string;
    bottomLabel?: string;
    itemId?: number | string
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ image, title, description, buttonText, bottomLabel, itemId }) => {
    return (
        <PlainLink
            to={`/details/${itemId}`}
            className="flex-col w-64 p-4 shadow-sm shadow-gray-200  rounded-md  mx-auto"
        >
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
            <Paragraph textColor="indigo">{bottomLabel}</Paragraph>
        </PlainLink>
    );
}

export default ProductCard;