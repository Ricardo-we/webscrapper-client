import type { GetServerSideProps, NextPage } from 'next'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useMemo, useRef, useState } from 'react';

import Product from '../../types/Product';
import ProductTagService from '../../libs/services/ProductTagService';
import Spinner from '../../components/base/Spinner';
import { mapProductList } from '../../components/base/ProductCard';
import useLanguage from '../../hooks/useLanguage';
import useObserver from '../../hooks/useObserver';

interface HomeProps {
    preloadedProducts: Array<Product>
    search: string;
}


const Home: NextPage<HomeProps> = ({ preloadedProducts, search }) => {
    const productTagService = useMemo(() => new ProductTagService(), []);
    const { language } = useLanguage("es");
    const moduleLabels = language?.module?.home;

    // STATE
    const [products, setProducts] = useState<Product[]>(preloadedProducts);
    const [loading, setLoading] = useState<boolean>(false);
    const isMaxPage = useRef<boolean>(false);
    const currentIndex = useRef<number>(0);
    const bottomItemRef = useRef(null);
    const bottomItemVisible = useObserver(bottomItemRef, { threshold: 0.1 });

    const getProducts = () => {
        return productTagService.find({ params: { tag_name: search, current_page: currentIndex.current } })
            .then(moreProducts => {
                if (!moreProducts || moreProducts?.length <= 0) return isMaxPage.current = true;
                setProducts(prev => [...prev, ...moreProducts])
            })
            .catch(error => toast.error(error))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (search) {
            currentIndex.current = 0;
            setLoading(true)
            setProducts([])
            getProducts();
        }
    }, [search])

    useEffect(() => {
        if (bottomItemVisible && !loading && !isMaxPage.current) {
            currentIndex.current += 1;
            setLoading(true);
            console.log(currentIndex.current)
            getProducts();
        }
    }, [bottomItemVisible])

    return (
        <>
            <ToastContainer />
            <div className="w-full flex flex-row flex-wrap items-center justify-between">
                {mapProductList({ products })}
            </div>

            <div className="h-10" ref={bottomItemRef}></div>

            <div className="flex items-center justify-center">
                {loading && <Spinner
                    size={50}
                />}
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
    const productTagService = new ProductTagService();
    const allProducts = await productTagService.find({ params: { tag_name: query?.search, current_page: 0 } });

    return {
        props: {
            preloadedProducts: allProducts,
            search: query?.search
        }
    }
}

export default Home
