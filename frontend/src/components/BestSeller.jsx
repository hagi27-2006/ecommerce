import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products, loading } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      const topRated = products
        .filter(item => item.bestseller)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
      setBestSellers(topRated);
    }
  }, [products, loading]);

  if (loading) {
    return (
      <div className="my-10">
        <div className="text-center py-8">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="text-center py-8">
        <Title text1="Шилдэг" text2="Бүтээгдэхүүн" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Чанар, хэв маягаараа үйлчлүүлэгчиддээ таалагдсан манай шилдэг борлуулалттай бүтээгдэхүүнтэй танилцаарай.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bestSellers.map((item) => (
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

export default BestSeller;
