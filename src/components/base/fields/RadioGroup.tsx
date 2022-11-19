import { FC } from "react";
import Label from "../Text/Label";

interface RadioGroupProps {
	options?: string[];
    name?: string;
    label?: string;
    onChange?: (event: any) => any;
}

const RadioGroup: FC<RadioGroupProps> = ({ options, name, onChange, label }) => {
	if (!options || options.length <= 0) return <></>;
	return (
		<div  className="flex flex-wrap flex-row aling-center gap-2 justify-start">
            {/* <label htmlFor=""></label> */}
            <Label style={{fontWeight: "500"}}>{label}</Label>
			{options?.map((option, index) => {
				const splittedOption = option?.includes(":")
					? option?.split(":")
					: option;
				const optionValue = option?.includes(":")
					? splittedOption[1]
					: option;
				const optionLabel = option?.includes(":")
					? splittedOption[0]
					: option;

                const key = "" + Math.random() + index 

				return (
					<div key={index}>
						<input
							type="radio"
							id={key}
							className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                            onChange={onChange}
                            name={name}
							value={optionValue}
						/>
						<Label bold htmlFor={key}>{optionLabel}</Label>
					</div>
				);
			})}
		</div>
	);
};

export default RadioGroup;
