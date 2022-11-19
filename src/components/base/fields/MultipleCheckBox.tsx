import { FC } from "react";
import Label from "../Text/Label";

// import styles from "../../../styles/components/MultipleCheckBox.module.css";

interface MultipleCheckBoxProps {
	items?: any[];
	onChange?: (e: any) => any;
	checkAll?: boolean;
}

const MultipleCheckBox: FC<MultipleCheckBoxProps> = ({
	items,
	onChange,
	checkAll,
}) => {
	return (
		<div className="flex flex-wrap items-center justify-start gap-3">
			{items?.map((item, index) => {
				const key = "ch" + Math.random() + index;
				return (
					<div className="flex items-center justify-evenly">
						<input
							id={key}
							className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
							defaultChecked={checkAll}
							value={item}
							onChange={onChange}
							type="checkbox"
						/>
						<Label bold htmlFor={key}>
							{item}
						</Label>
					</div>
				);
			})}
		</div>
	);
};

export default MultipleCheckBox;
