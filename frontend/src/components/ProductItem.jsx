import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price, category }) => {
  const { currency } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const getImageUrl = () => {
    if (imageError) {
      return `https://placehold.co/400x600/eee/999?text=${encodeURIComponent('Зураг байхгүй')}`;
    }
    return Array.isArray(image) ? image[0] : image;
  };

  return (
    <Link className="text-gray-700 cursor-pointer group" to={`/product/${id}`}>
      <div className="overflow-hidden relative rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <div className="aspect-square overflow-hidden">
          <img
            className={`w-full h-full object-cover transition duration-300 group-hover:scale-105 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            src={getImageUrl()}
            alt={name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">{category}</p>
          <p className="text-sm font-medium line-clamp-2 h-10">{name}</p>
          <p className="text-sm font-semibold mt-2 text-rose-600">
            {currency}{typeof price === 'number' ? price.toLocaleString() : price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;