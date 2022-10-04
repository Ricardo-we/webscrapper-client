import type { GetServerSideProps, NextPage } from 'next'

import Product from '../../types/Product';
import ProductTagService from '../../libs/services/ProductTagService';
import { mapProductList } from '../../components/base/ProductCard';
import useLanguage from '../../hooks/useLanguage';

interface HomeProps {
    products: Array<Product>
}


const Home: NextPage<HomeProps> = ({ products }) => {
    const { language } = useLanguage("es");
    const moduleLabels = language?.module?.home;

    return (
        <>
            <div className="w-full flex flex-row flex-wrap items-center justify-between">
                {mapProductList({ products })}
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<{ products: Array<Product> }> = async ({ params, query }) => {
    const productTagService = new ProductTagService();
    const allProducts = await productTagService.find({ params: { tag_name: query?.search, current_page: 0 } });

    return {
        props: {
            products: allProducts
        }
    }
}

export default Home
