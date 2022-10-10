import type { GetServerSideProps, NextPage } from "next";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useMemo, useRef, useState } from "react";

import Product from "../../types/Product";
import ProductTagService from "../../libs/services/ProductTagService";
import Spinner from "../../components/base/Spinner";
import { mapProductList } from "../../components/base/ProductCard";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useObserver from "../../hooks/useObserver";

interface CategoriesViewProps {
	preloadedProducts: Product[];
	tagname?: string;
}

const CategoriesView: NextPage<CategoriesViewProps> = ({
	tagname,
	preloadedProducts,
}) => {
	const productsTagService = useMemo(() => new ProductTagService(), []);
	const [products, setProducts] = useState<Product[]>(preloadedProducts);
	const [loading, setLoading] = useState<boolean>(false);
	const bottomItemRef = useRef(null);
	const bottomItemVisible = useObserver(bottomItemRef, { threshold: 0.1 });

	const onRequestMore = async () => {
		productsTagService
			.find({
				routeParams: "/" + tagname,
				params: { current_page: currentIndex.current },
			})
			.then((moreProducts) => {
				if (!moreProducts || moreProducts?.length <= 0)
					return (isMaxPage.current = true);
				setProducts((prev) => [...prev, ...moreProducts]);
			})
			.catch((err) => toast.error(err?.toString()))
			.finally(() => setLoading(false));
	};

	const { isMaxPage, currentIndex } = useInfiniteScroll({
		bottomItemVisible,
		onLoadChange: setLoading,
		loading,
		onRequestMore,
	});

	useEffect(() => {
		if (tagname) {
			currentIndex.current = 0;
			setLoading(true);
			setProducts([]);
			onRequestMore();
		}
	}, [tagname]);

	return (
		<>
			<ToastContainer />
			<h2 className="text-4xl">{tagname}</h2>

			<div className="w-full flex flex-row flex-wrap items-center justify-between">
				{mapProductList({ products })}
			</div>

			<div className="h-10" ref={bottomItemRef}></div>
			<div className="w-full cust-small-grid mb-5">
				{loading && <Spinner size={50} />}
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const productTagsService = new ProductTagService();
	const tagRelatedProducts = await productTagsService.find({
		routeParams: "/" + params?.tagname,
		params: { current_page: 0 },
	});

	return {
		props: {
			preloadedProducts: tagRelatedProducts,
			tagname: params?.tagname,
		},
	};
};

export default CategoriesView;
