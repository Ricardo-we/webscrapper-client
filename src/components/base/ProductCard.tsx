import Product, { ShopName } from "../../types/Product";
import {
	createFilter,
	createItemsSorter,
	createMultipleAttributesFilter,
} from "../../libs/utils/array.utils";

import { FilterData } from "./ProductsFilter";
import { FunctionComponent } from "react";
import Paragraph from "./Text/Paragraph";
import { PlainLink } from "./Link";
import classNames from "classnames";
import { getSentenceCutter } from "../../libs/utils/string.utils";
import { getShopColor } from "../../libs/utils/general";
import useLanguage from "../../hooks/useLanguage";

interface ProductCardProps {
	image?: { src?: string; alt?: string } | string;
	title?: string;
	description?: string;
	buttonText?: string;
	bottomLabel?: ShopName;
	itemId?: number | string;
	itemUrl: string;
	price?: string | number;
}

const cardButtonClasses = {
	cemaco: `hover:bg-cemaco border-cemaco text-cemaco`,
	epa: `hover:bg-epa border-epa text-epa`,
	novex: `hover:bg-novex border-novex text-novex`,
};

const ProductCard: FunctionComponent<ProductCardProps> = ({
	image,
	title,
	description,
	buttonText,
	bottomLabel,
	itemUrl,
	price,
}) => {
	const shopColor = getShopColor(bottomLabel || "epa");
	const linkButtonClassNames = classNames(
		"w-full  text-center  p-2 text-white border bg-transparent hover:text-white duration-500 font-bold",
		cardButtonClasses[bottomLabel || "epa"],
	);

	return (
		<PlainLink
			to={itemUrl}
			target="_blank"
			onClick={(e) => e.stopPropagation()}
			className="flex flex-col items-center justify-between w-64 p-3 shadow-sm shadow-slate-300 border border-zinc-200 bg-transparent rounded-md  mx-3"
		>
			<img
				src={typeof image === "string" ? image : image?.src}
				loading="lazy"
				alt={typeof image === "string" ? "" : image?.alt}
				className="w-full mx-0 object-contain h-40"
			/>
			<div className="flex flex-col items-start mt-2 p-2 justify-between w-full">
				<h3 className="text-base text-left w-full">{title}</h3>

				<Paragraph className="text-xl text-right font-bold text-black">
					{price}
				</Paragraph>
			</div>
			<Paragraph className="tex-lg text-left w-full px-2 text-black text-opacity-40">
				{description}
			</Paragraph>

			<Paragraph
				fontSizeVariant="xl"
				className="text-lg"
				style={{ color: shopColor }}
			>
				{bottomLabel?.toUpperCase()}
			</Paragraph>

			<PlainLink
				className={linkButtonClassNames}
				to={itemUrl}
				onClick={(e) => e.stopPropagation()}
				target="_blank"
			>
				{buttonText}
			</PlainLink>
		</PlainLink>
	);
};

interface mapProductListProps {
	products: Product[];
	filter?: FilterData;
}

export const mapProductList = ({
	products,
	filter = {},
}: mapProductListProps): JSX.Element[] => {
	const { language } = useLanguage("es");
	const cutSentence = getSentenceCutter(11);

	const productNameAndPriceFilter = createMultipleAttributesFilter({
		filterByAttributes: ["name", "price"],
		filter,
		minimumMatches: 2,
		priority: filter.orderBy === "name" ? "string" : "number",
	});

	const filteredProducts = Object.keys(filter).length > 0
		? products
			?.filter((item, index) => filter?.shops?.has(item.shopName))
			?.filter(productNameAndPriceFilter)
			?.sort(
				createItemsSorter(
					filter?.orderBy || "id",
					filter?.order || "desc",
				),
			)
		: products;

	return filteredProducts?.map((product, index) => (
		<ProductCard
			key={index}
			image={product?.image}
			title={product?.name}
			description={cutSentence(product?.description).replace(/\-/, "")}
			bottomLabel={product?.shopName}
			itemId={product?.id}
			price={(product?.currencySymbol || "Q") + product?.price}
			itemUrl={product?.productUrl}
			buttonText={language?.general?.checkDetails + product?.shopName}
		/>
	));
};

export default ProductCard;
