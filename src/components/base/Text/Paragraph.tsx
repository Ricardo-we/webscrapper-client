import { FunctionComponent, HTMLAttributes } from "react";
import type { colorVariants, colorVariantsNumbers, fontSizeVariants } from "../../../types/Theme.variants";

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
    fontSizeVariant?: fontSizeVariants;
    textColor?: colorVariants
}

const Paragraph: FunctionComponent<ParagraphProps> = ({ children, fontSizeVariant = "base", textColor = "black", ...props }) => {
    const tailwindDynamicClassName = `text-${fontSizeVariant} text-${textColor}-500 ${props.className}`;
    return (
        <p
            className={tailwindDynamicClassName}
            {...props}
        >
            {children}
        </p>
    );
}

export default Paragraph;