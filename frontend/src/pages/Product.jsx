import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProduct';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(true);

  // Update the fallback image function to use a more reliable source
  const getFallbackImage = (id, index = 0) => {
    return `https://api.dicebear.com/7.x/shapes/svg?seed=${id}_${index}`;
  };

  useEffect(() => {
    const product = products.find(p => p._id === productId);
    if (product) {
      setProductData(product);
      setImage(Array.isArray(product.image) ? product.image[0] : product.image);
      setLoading(false);
    }
  }, [productId, products]);

  const handleImageError = (e) => {
    const index = e.target.dataset.index || 0;
    e.target.src = getFallbackImage(productData._id, index);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!productData) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!size) {
      toast.warning('Хэмжээгээ сонгоно уу ⚠️');
      return;
    }
    addToCart(productData._id, size);
  };

  return (
    <div className='border-t-2 pt-10 transition-opacity duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {Array.isArray(productData.image) && productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                data-index={index}
                alt={`${productData.name} view ${index + 1}`}
                onMouseEnter={() => setImage(item)}
                onError={(e) => {
                  e.target.src = `https://placehold.co/400x600/eee/999?text=${encodeURIComponent(productData.name)}_${index}`;
                }}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                  image === item ? 'border-2 border-black' : ''
                }`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img
              src={image}
              alt={productData.name}
              onError={handleImageError}
              className='w-full h-auto object-contain max-h-[500px]'
            />
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {[...Array(Math.floor(productData.rating))].map((_, index) => (
              <img key={index} src={assets.star_icon} alt="rating star" className="w-3.5" />
            ))}
            <p className='pl-2'>({productData.rating})</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Хэмжээ сонгох</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border-2 ${
                    size === item ? 'border-rose-500' : 'border-gray-300'
                  } rounded-lg px-4 py-2 hover:border-rose-500 transition-colors`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className='flex items-center gap-2 mt-4'>
            <div className='flex'>
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(productData.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className='text-sm text-gray-600'>
              {productData.rating.toFixed(1)} out of 5
            </span>
          </div>
          <button 
            onClick={handleAddToCart}
            className='bg-black text-white px-8 py-3 rounded hover:bg-gray-800'
          >
            Add to Cart
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>Category: <span className='text-gray-900'>{productData.category}</span></p>
            <p>Brand: <span className='text-gray-900'>{productData.subCategory}</span></p>
            <p>Stock: <span className='text-gray-900'>{productData.stock} units</span></p>
            <p>100% Original Products</p>
            <p>Cash on Delivery Available</p>
            <p>Return and Exchange within 30 days</p>
          </div>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
