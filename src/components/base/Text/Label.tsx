import { FC, LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	size?: number;
	bold?: boolean;
}

const Label: FC<LabelProps> = ({ size = 4, bold, ...props }) => {
	return (
		<label
			{...props}
			className={"w-full p-1 text-left " + props.className}
			style={{
				fontSize: `${size * 4}px`,
				fontWeight: bold ? "600" : "normal",
			}}
		/>
	);
};

export default Label;
