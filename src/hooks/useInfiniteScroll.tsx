import { useEffect, useRef } from "react";

interface useInfiniteScrollProps {
	bottomItemVisible: boolean;
	loading: boolean;
	onLoadChange: (value: boolean) => any;
	onRequestMore: (currentPage: number) => any;
}

const useInfiniteScroll = ({
	bottomItemVisible,
	loading,
	onLoadChange,
	onRequestMore,
}: useInfiniteScrollProps) => {
	const isMaxPage = useRef<boolean>(false);
	const currentIndex = useRef<number>(1);

	useEffect(() => {
		if (bottomItemVisible && !loading && !isMaxPage.current) {
			currentIndex.current += 1;
			onLoadChange(true);
			onRequestMore(currentIndex.current);
		}
	}, [bottomItemVisible]);

	return {
		isMaxPage,
		currentIndex,
	};
};

export default useInfiniteScroll;
