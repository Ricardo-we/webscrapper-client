import { FC, InputHTMLAttributes } from "react";

import Label from "../Text/Label";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const TextField: FC<TextFieldProps> = ({ label, ...props }) => {
	return (
		<div className="flex flex-col items-center gap-0 justify-start ">
			<Label bold>{label}</Label>
			<input
				className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 " + props?.className}
				placeholder={label}
				type="text"
				{...props}
			/>
		</div>
	);
};

export default TextField;
