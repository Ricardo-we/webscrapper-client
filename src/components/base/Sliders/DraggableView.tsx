import { FC, HTMLAttributes, useEffect, useRef } from "react";

interface DraggableViewProps extends HTMLAttributes<HTMLDivElement> {
	children: JSX.Element | JSX.Element[];
}

const DraggableView: FC<DraggableViewProps> = ({ children, ...props }) => {
	const buttonIsPressed = useRef<boolean>(false);
	const draggableViewRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// console.log(draggableViewRef?.current?.style);
		if (draggableViewRef.current)
			draggableViewRef.current.style.cursor = "grab";
	}, [draggableViewRef.current]);

	return (
		<div
			style={{
				overflowY: "hidden",
				overflowX: "auto",
				scrollbarWidth: "none",
			}}
			onMouseDown={(e) => {
				buttonIsPressed.current = true;
				if (draggableViewRef.current)
					draggableViewRef.current.style.cursor = "grab";
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
			ref={draggableViewRef}
			{...props}
		>
			{children}
		</div>
	);
};

export default DraggableView;
