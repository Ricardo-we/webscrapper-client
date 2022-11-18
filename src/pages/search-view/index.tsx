import type { GetServerSideProps, NextPage } from "next";
import ProductsFilter, { FilterData } from "../../components/base/ProductsFilter";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useMemo, useRef, useState } from "react";

import Product from "../../types/Product";
import ProductsService from "../../libs/services/ProductsService";
import Spinner from "../../components/base/Spinner";
import { mapProductList } from "../../components/base/ProductCard";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useObserver from "../../hooks/useObserver";

interface HomeProps {
	preloadedProducts: Array<Product>;
	search: string;
}

const Home: NextPage<HomeProps> = ({ preloadedProducts, search }) => {
	const prdocutService = useMemo(() => new ProductsService(), []);
	// const { language } = useLanguage("es");
	// const moduleLabels = language?.module?.home;

	// STATE
	const [products, setProducts] = useState<Product[]>(preloadedProducts);
	const [loading, setLoading] = useState<boolean>(false);
	const [filterData, setFilterData] = useState<FilterData>({});
	const bottomItemRef = useRef(null);
	const bottomItemVisible = useObserver(bottomItemRef, { threshold: 0.1 });

	const getProducts = (currentIndex: number) => {
		return prdocutService
			.find({
				params: {
					search,
					current_page: currentIndex,
				},
			})
			.then((moreProducts) => {
				if (!moreProducts || moreProducts?.length <= 0)
					return (isMaxPage.current = true);
				setProducts((prev) => [...prev, ...moreProducts]);
			})
			.catch((error) => toast.error(error))
			.finally(() => setLoading(false));
	};

	const { currentIndex, isMaxPage } = useInfiniteScroll({
		bottomItemVisible,
		onLoadChange: setLoading,
		loading,
		onRequestMore: getProducts,
	});

	useEffect(() => {
		if (search && currentIndex.current > 0) {
			currentIndex.current = 0;
			setLoading(true);
			setProducts([]);
			getProducts(currentIndex.current);
		}
	}, [search]);

	return (
		<div className="w-full h-full flex relative">
			<ToastContainer />
			<ProductsFilter onFilterChange={setFilterData} />
			<div className="w-5/6 cust-small-grid mb-5">
				{mapProductList({ products, filter: filterData })}

				<div className="h-10" ref={bottomItemRef}></div>
				<div className="w-full flex items-center justify-center">
					{loading && <Spinner size={50} />}
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	params,
	query,
}) => {
	const productsService = new ProductsService();
	const allProducts = await productsService.find({
		params: { search: query?.search, current_page: 0 },
	});

	return {
		props: {
			preloadedProducts: allProducts,
			search: query?.search,
		},
	};
};

export default Home;
