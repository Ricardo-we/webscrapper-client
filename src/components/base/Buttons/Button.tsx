import { ButtonHTMLAttributes, FC } from "react";

import { colorVariants } from "../../../types/Theme.variants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: colorVariants
    textColor?: colorVariants
}

const Button: FC<ButtonProps> = ({ children, variant, textColor = "white", ...props }) => {
    const tailwindClassList = `p-2 w-auto bg-indigo-700 rounded-sm mx-auto min-w-max hover:bg-gray-400 bg-${variant}-500 p-3 text-${textColor}`;

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