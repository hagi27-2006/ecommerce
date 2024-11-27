import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // First try to find products with same category and subCategory
      let relatedProducts = products.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );

      // If not enough related products, find products with same category
      if (relatedProducts.length < 5) {
        const sameCategory = products.filter(
          (item) => item.category === category && item.subCategory !== subCategory
        );
        relatedProducts = [...relatedProducts, ...sameCategory];
      }

      // Limit to 5 unique products
      const uniqueProducts = Array.from(new Set(relatedProducts.map(p => p._id)))
        .map(id => relatedProducts.find(p => p._id === id))
        .slice(0, 5);

      setRelated(uniqueProducts);
    }
  }, [products, category, subCategory]);

  if (related.length === 0) {
    return (
      <div className='my-24 text-center'>
        <h2 className='text-3xl py-2'>Төстэй бүтээгдэхүүн олдсонгүй</h2>
      </div>
    );
  }

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <h2>Төстэй бүтээгдэхүүнүүд</h2>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 transition-all duration-300'>
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
