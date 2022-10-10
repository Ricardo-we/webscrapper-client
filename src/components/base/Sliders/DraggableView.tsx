import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";

interface DraggableViewProps extends HTMLAttributes<HTMLDivElement> {
	children: JSX.Element | JSX.Element[];
}

const DraggableView: FC<DraggableViewProps> = ({ children, ...props }) => {
	const buttonIsPressed = useRef<boolean>(false);
	// const draggableViewRef = useRef<HTMLDivElement>(null);
	const [draggableViewStyle, setDraggableViewStyle] = useState({});

	// useEffect(() => {
	// 	// console.log(draggableViewRef?.current?.style);
	// 	if (buttonIsPressed.current && draggableViewRef.current)
	// 		draggableViewRef.current.style.cursor = "grab";
	// 	else
	// 		draggableViewRef.current
	// 			? (draggableViewRef.current.style.cursor = "")
	// 			: "";
	// }, [draggableViewRef.current]);

	return (
		<div
			style={{
				overflowY: "hidden",
				overflowX: "auto",
				scrollbarWidth: "none",
				scrollSnapType: "x proximity",
			}}
			onMouseDown={(e) => {
				buttonIsPressed.current = true;
			}}
			onMouseUp={() => (buttonIsPressed.current = false)}
			onMouseMove={(e) => {
				// console.log(
				// 	e.clientX - e.currentTarget.getBoundingClientRect().left,
				// );
				// console.log(e.clientX);
				if (buttonIsPressed.current) {
					e.currentTarget.scrollTo({
						left:
							e.clientX -
							e.currentTarget.getBoundingClientRect().left,
					});
				}
			}}
			className={"relative " + props.className}
			{...props}
		>
			{children}
			<button className="rounded-full w-9 h-9 p-2 absolute right-0 top-1/2 -translate-y-1/2"></button>
		</div>
	);
};

export default DraggableView;
