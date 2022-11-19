import { FC, LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	size?: number;
	bold?: boolean;
}

const Label: FC<LabelProps> = ({ size = 4, bold, ...props }) => {
	return (
		<label
			className="w-full p-1 text-left"
			style={{
				fontSize: `${size * 4}px`,
				fontWeight: bold ? "600" : "normal",
			}}
			{...props}
		></label>
	);
};

export default Label;
