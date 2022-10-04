import { ButtonHTMLAttributes, FunctionComponent } from "react";

import { colorVariants } from "../../../types/Theme.variants";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: colorVariants
    size?: number
}

const IconButton: FunctionComponent<IconButtonProps> = ({ variant, children, size = 30, className, ...props }) => {
    const tailwindDynamicClasses = `flex justify-center items-center flex-shrink-0 bg-${variant}-500 p-2 hover:bg-gray-600 transition duration-500 ${className}`;

    return (
        <button
            className={tailwindDynamicClasses}
            style={{ width: size, height: size }}
            {...props}
        >
            {children}
        </button>
    );
}

export default IconButton;