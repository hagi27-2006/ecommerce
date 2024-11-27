import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products, loading } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setLatestProducts(shuffled.slice(0, 10));
    }
  }, [products, loading]);

  if (loading) {
    return (
      <div className="my-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg"></div>
              <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='my-10'>
      <div className='text-center py-8'>
        <Title text1={'Шинэ'} text2={'Бүтээгдэхүүн'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Орчин үеийн загвар, мөнхийн сонгодог загваруудыг агуулсан хамгийн сүүлийн үеийн цуглуулгатай танилцаарай.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            category={item.subCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
