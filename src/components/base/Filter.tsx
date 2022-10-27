import { FC, useState } from "react";

import MultipleCheckBox from "../forms/MultipleCheckBox";
import { ShopName } from "../../types/Product";
import TextField from "../forms/TextField";

export interface FilterData {
	priceRange?: number;
	shops?: Set<ShopName>;
	sortByPrice?: "asc" | "desc";
	search?: string;
}

export interface FilterProps {
	onFilterChange?: (filterData: FilterData) => any;
}

const shops = new Set<ShopName>(["cemaco", "epa", "novex"]);

const Filter: FC<FilterProps> = ({ onFilterChange = () => {} }) => {
	const [filterData, setFilterData] = useState<FilterData>({ shops, search: "" });

	return (
		<div className="h-screen w-1/6 p-2	">
			<input
				onChange={(e) => {
					setFilterData((prev) => ({
						...prev,
						princeRange: e.target.value,
					}));
					onFilterChange(filterData);
				}}
				value={filterData.priceRange}
				type="range"
				max="10000"
				min="0"
				step="1"
				className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
			/>

			<MultipleCheckBox
				items={Array.from(shops)}
				checkAll
				onChange={(e) => {
					setFilterData(prev => {
						if(!prev.shops) return prev;
						if(e.target.checked) prev.shops?.add(e.target.value);
						else if(!e.target.checked) prev.shops?.delete(e.target.value);
						return prev;
					})
				}}
			/>

			<TextField
				value={filterData.search}
				onChange={e => setFilterData(prev => ({...prev, search: e.target.value}))}
				label="Buscar"
			/>

		</div>
	);
};

export default Filter;
