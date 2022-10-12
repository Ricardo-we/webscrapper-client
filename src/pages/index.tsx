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

			<h3 className="text-lg">Lorem.</h3>
			<Paragraph>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa et dignissimos tempora. Sed, veniam! Nulla et cum, iusto laborum animi consequuntur ducimus nesciunt quam exercitationem, eligendi nam sunt adipisci. Dolor?
			Suscipit saepe consequatur, magnam earum accusamus tempora ipsam adipisci nihil dolore odit animi similique rem exercitationem aliquam commodi necessitatibus optio. Beatae nemo nesciunt quibusdam laudantium at odit nulla magni dicta?
			Eligendi repellendus laudantium quo sint obcaecati odio enim expedita temporibus ea fugiat suscipit maiores assumenda sit magni doloribus quibusdam error ratione corporis tempora iure quos, beatae exercitationem. Doloribus, eum maxime.
			Nam cupiditate repellendus ipsum, quia sequi praesentium repudiandae ut, saepe velit corrupti dolorum magni natus tempore molestiae officiis maxime. Architecto, quae autem nulla neque accusantium ipsa provident ipsam voluptate consequuntur!
			Possimus quaerat itaque ut deserunt labore illum? Aut, tempore! Beatae nulla similique itaque. Perferendis maxime dolores consectetur corrupti esse beatae! Ducimus dolorum, cum cupiditate nulla maiores voluptatibus cumque nisi quas.
			Doloremque illum officiis itaque nesciunt aperiam unde corporis ullam odio recusandae culpa non sint, repellat doloribus quis modi deserunt? Esse fuga fugiat tenetur cumque sint architecto rerum, distinct
		</Paragraph>
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
