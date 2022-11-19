import { FC, HTMLAttributes } from "react";

interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {
	direction?: "row" | "row-reverse" | "column" | "column-reverse";
	wrap?: "wrap" | "nowrap" | "wrap-reverse";
	align?: "stretch" | "center" | "flex-start" | "flex-end";
	basis?: number;
	justify?:
		| "space-evenly"
		| "space-between"
		| "space-around"
		| "center"
		| "flex-start"
		| "flex-end";
	grow?: number;
	shrink?: number;
}

const FlexBox: FC<FlexBoxProps> = ({
	children,
	grow,
	shrink,
	basis,
	direction,
	wrap = "wrap",
	align = "center",
	justify = "space-evenly",
	...props
}) => {
	return (
		<div
			{...props}
			style={{
				display: "flex",
				flexBasis: basis,
				flexGrow: grow,
				flexShrink: shrink,
				justifyContent: justify,
				alignItems: align,
				flexDirection: direction,
				...props.style,
			}}
		>
			{children}
		</div>
	);
};

export default FlexBox;
