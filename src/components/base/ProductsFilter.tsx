import { FC, useEffect, useState } from "react";

import MultipleCheckBox from "./fields/MultipleCheckBox";
import RadioGroup from "./fields/RadioGroup";
import RangeSlider from "./fields/RangeSlider";
import { ShopName } from "../../types/Product";
import TextField from "./fields/TextField";

export interface FilterData {
	shops?: Set<ShopName>;
	price?: number;
	name?: string;
	orderBy?: string;
	order?: "asc" | "desc";
}

export interface FilterProps {
	onFilterChange?: (filterData: FilterData) => any;
}

const shops = new Set<ShopName>(["cemaco", "epa", "novex"]);

const ProductsFilter: FC<FilterProps> = ({ onFilterChange }) => {
	const [filterData, setFilterData] = useState<FilterData>({
		shops: new Set(shops),
		name: "",
	});

	useEffect(() => {
		if (onFilterChange && filterData) onFilterChange(filterData);
	}, [{ ...filterData }]);

	return (
		<div className="h-screen w-1/6 p-2 sticky top-28 left-0">
			<RangeSlider
				onChange={(e) => {
					setFilterData((prev) => ({
						...prev,
						price: parseFloat(e.target.value),
					}));
				}}
				value={filterData.price || 1}
				max="100000"
				min="1"
				step="1"
				rangeDecorator={(value) => `Q0 a Q${value}`}
				label="Productos con precios menores a "
			/>

			<MultipleCheckBox
				items={Array.from(shops)}
				checkAll
				onChange={(e) => {
					setFilterData((prev) => {
						if (!prev.shops) return prev;
						if (e.target.checked) prev.shops?.add(e.target.value);
						else if (!e.target.checked)
							prev.shops?.delete(e.target.value);
						return prev;
					});
				}}
			/>

			<RadioGroup
				name="orderBy"
				label="Ordenar y filtrar por"
				options={[
					"Precio:price",
					"Nombre del producto:name",
					"Nombre de tienda:shopName",
				]}
				onChange={(e) =>
					setFilterData((prev) => ({
						...prev,
						orderBy: e.target.value,
					}))
				}
			/>

			<RadioGroup
				label="Orden de manera"
				name="order"
				options={["Ascendientemente:asc", "Descendientemente:desc"]}
				onChange={(e) =>
					setFilterData((prev) => ({
						...prev,
						order: e.target.value,
					}))
				}
			/>

			<TextField
				value={filterData.name}
				onChange={(e) =>
					setFilterData((prev) => ({
						...prev,
						name: e.target.value,
					}))
				}
				label="Buscar"
			/>
		</div>
	);
};

export default ProductsFilter;
