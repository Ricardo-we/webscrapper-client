import type { GetServerSideProps, NextPage } from 'next'

import NavBar from '../components/base/Navbar';
import Paragraph from '../components/base/Text/Paragraph';
import Product from '../types/Product';
import ProductCard from '../components/base/ProductCard';
import ProductsService from '../libs/services/ProductsService';
import Slider from '../components/base/Slider';
import useLanguage from '../hooks/useLanguage';

interface HomeProps {
  products: Array<Product>
  sliderProducts: Array<Product>
}

const ProductsMap = ({ products }: { products: Product[] }) => {
  return products?.map((product, index) => (
    <ProductCard
      key={index}
      image={product.image}
      title={product.name}
      description={product.description}
      bottomLabel={product.shopName}
      itemId={product?.id}
      buttonText="Go to details"
    />
  ))
}

const Home: NextPage<HomeProps> = ({ products, sliderProducts }) => {
  const { language } = useLanguage("es");
  const moduleLabels = language?.module?.home;

  return (
    <>
      <NavBar />
      <h1 className="text-7xl text-center w-full my-2">{language?.general?.appName}</h1>
      <Slider
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        draggable
        items={ProductsMap({ products: sliderProducts })}

      />

      <Paragraph fontSizeVariant="xl" className="text-center">
        {moduleLabels?.welcomeDescription}
      </Paragraph>

      <div className="w-full flex flex-row flex-wrap items-center justify-between">
        {ProductsMap({ products })}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ products: Array<Product> }> = async () => {
  const productsService = new ProductsService();
  const allProducts = await productsService.find();

  return {
    props: {
      sliderProducts: allProducts.slice(0, 5),
      products: allProducts.slice(5, allProducts.length)
    }
  }
}

export default Home
