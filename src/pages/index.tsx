import type { GetServerSideProps, NextPage } from "next";

import GallerySlider from "../components/base/Sliders/GallerySlider";
import Paragraph from "../components/base/Text/Paragraph";
import Product from "../types/Product";
import ProductsService from "../libs/services/ProductsService";
import { mapProductList } from "../components/base/ProductCard";
import useLanguage from "../hooks/useLanguage";
import { useState } from "react";

interface HomeProps {
	products: Array<Product>;
	sliderProducts: Array<Product>;
}

const Home: NextPage<HomeProps> = ({ products, sliderProducts }) => {
	const { language } = useLanguage("es");
	const [moduleLabels] = useState(language?.module?.home);
	// const filters: Array<string> = []

	return (
		<>
			<div className="flex flex-col items-center justify-start h-auto bg-white w-full">
				<h1 className="text-black text-7xl text-center w-full my-2">
					{language?.general?.appName}
				</h1>
				<Paragraph
					className="text-black text-center mt-2 w-10/12"
					fontSizeVariant="xl"
				>
					{moduleLabels?.welcomeDescription}
				</Paragraph>
				<br />

				<div className="container p-2 mx-2">
					<GallerySlider
						breakpoints={{
							500: {
								slidesPerView: 2,
							},
							750: {
								slidesPerView: 3,
							},
							1600: {
								slidesPerView: 4,
							},
						}}
						slidesPerView={1}
						centeredSlides
						spaceBetween={50}
						draggable
						items={mapProductList({ products: sliderProducts })}
					/>
				</div>
			</div>

			<div className="w-full cust-small-grid mb-5">
				{mapProductList({ products })}
			</div>

		</>
	);
};

export const getServerSideProps: GetServerSideProps<{
	products: Array<Product>;
}> = async () => {
	const productsService = new ProductsService();
	const allProducts = await productsService.find();

	return {
		props: {
			sliderProducts: allProducts.slice(0, 5),
			products: allProducts.slice(5, allProducts.length),
		},
	};
};

export default Home;
