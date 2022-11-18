import { FC, LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	size?: number;
	bold?: boolean;
}

const Label: FC<LabelProps> = ({ size = 4, bold, ...props }) => {
	return (
		<label
			className="w-full p-2"
			style={{
				fontSize: `${size * 4}px`,
				fontWeight: bold ? "bold" : "normal",
			}}
			{...props}
		></label>
	);
};

export default Label;
