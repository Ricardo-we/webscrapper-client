import { ButtonHTMLAttributes, FunctionComponent } from "react";

import { colorVariants } from "../../../types/Theme.variants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: colorVariants
    textColor?: colorVariants
}

const Button: FunctionComponent<ButtonProps> = ({ children, variant, textColor = "white", ...props }) => {
    const tailwindClassList = `inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 bg-${variant}-500 p-3 text-${textColor}`;

    return (
        <button
            type="button"
            className={tailwindClassList}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;