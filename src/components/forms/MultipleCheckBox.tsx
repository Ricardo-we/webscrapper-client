import { FC } from "react";

interface MultipleCheckBoxProps {
	items?: any[];
	onChange?: (e: any) => any;
	checkAll?: boolean
}

const MultipleCheckBox: FC<MultipleCheckBoxProps> = ({ items, onChange, checkAll }) => {
	return (
		<div className="flex flex-wrap items-center justify-start gap-3">
			{items?.map((item, index) => (
				<div key={index} className="flex items-center justify-evenly">
					<input
						type="checkbox"
						className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						id={item}
						defaultChecked={checkAll}
						value={item}
						onChange={onChange}
					/>
					<label
						htmlFor={item}
						className="ml-2 text-sm font-medium black text-gray-900"
					>
						{item}
					</label>
				</div>
			))}
		</div>
	);
};

export default MultipleCheckBox;
