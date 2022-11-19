import { FC, useEffect, useState } from "react";

import Button from "../Buttons/Button";
import FlexBox from "../containers/FlexBox";
import IconButton from "../Buttons/IconButton";
import { IoIosRemove } from "react-icons/io";
import Label from "../Text/Label";
import { VscAdd } from "react-icons/vsc";

interface SliderProps {
	onChange?: (value: any) => any;
	value?: number | string;
	min?: number | string;
	max?: number | string;
	step?: number | string;
	label?: string;
	rangeDecorator?: (value?: number | string) => number | string;
}

const RangeSlider: FC<SliderProps> = ({
	label,
	onChange,
	value,
	min,
	max,
	step,
	rangeDecorator,
	...props
}) => {
	const [currentValue, setCurrentValue] = useState<
		number | string | undefined
	>(value);

	const parsedValues = {
		max: typeof max === "number" || !max ? max || 1 : parseFloat(max),
		min: typeof min === "number" || !min ? min || 1 : parseFloat(min),
	};

	useEffect(() => {
		if (value && !currentValue) setCurrentValue(value);
	}, [value]);

	useEffect(() => {
		if (currentValue && onChange) onChange(currentValue);
	}, [currentValue]);

	return (
		<div className="flex flex-col w-full items-center justify-start">
			<Label bold>{label}</Label>
			<input
				type="range"
				value={currentValue}
				onChange={(e) => {
					setCurrentValue(e.target?.value);
				}}
				max={max}
				min={min}
				step={step}
				className="w-full h-1 mb-0 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
				{...props}
			/>

			<FlexBox justify="space-between" style={{width: "100%"}}>
				<IconButton
					onClick={() =>
						setCurrentValue((prev: any) =>
							prev > 1 ? parseFloat(prev) - 1 : prev,
						)
					}
				>
					<IoIosRemove />
				</IconButton>

				<IconButton
					onClick={() =>
						setCurrentValue((prev: any) =>
							prev < parsedValues?.max ? parseFloat(prev) + 1 : prev,
						)
					}
				>
					<VscAdd />
				</IconButton>
			</FlexBox>

			<Label bold size={3.5}>
				{rangeDecorator ? rangeDecorator(currentValue) : currentValue}
			</Label>
		</div>
	);
};

export default RangeSlider;
