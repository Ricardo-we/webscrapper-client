import { FunctionComponent, useEffect, useState } from "react";
import Product, { ShopName } from "../../types/Product";

import Button from "./Buttons/Button";
import { FilterData } from "./Filter";
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
	itemId,
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
				alt={typeof image === "string" ? "" : image?.alt}
				className="w-full mx-0 object-cover h-40"
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
	const filteredProducts = filter
		? products
				?.filter(
					(item) =>
						filter?.shops &&
						Array.from(filter.shops).includes(item.shopName),
				)
				?.filter(
					(item, index) =>
						filter.priceRange &&
						item.price > 0 &&
						item.price < filter?.priceRange,
				)
				?.filter(
					(shop) =>
						filter.search &&
						shop.name
							.toLowerCase()
							.includes(filter.search?.toLocaleLowerCase()),
				)
		: products;

	console.log(filter)

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
