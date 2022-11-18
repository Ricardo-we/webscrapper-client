import { FC, useEffect, useState } from "react";

import Label from "../Text/Label";

interface SliderProps {
	onChange?: (event: any) => any;
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
	const [currentValue,setCurrentValue] = useState<number | string | undefined>(value);

	useEffect(() => {
		if(value) setCurrentValue(value);
	}, [value])

	return (
		<div className="flex flex-col w-full items-center justify-start">
			<Label>{label}</Label>
			<input
				type="range"
				value={currentValue}
				onChange={e => {
					onChange && onChange(e);
					setCurrentValue(e.target.value);
				}}
				max={max}
				min={min}
				step={step}
				className="w-full h-1 mb-0 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                {...props}
			/>
			<Label bold size={3.5}>{rangeDecorator ? rangeDecorator(value) : value}</Label>
		</div>
	);
};

export default RangeSlider;
