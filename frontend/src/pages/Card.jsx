import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import Carttotal from '../components/Carttotal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Card = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleQuantityChange = (id, size, quantity) => {
    if (quantity >= 0) {
      updateQuantity(id, size, quantity);
      if (quantity === 0) {
        toast.info('Бараа сагснаас хасагдлаа 🗑️');
      }
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Сагс"} />
      </div>
      <div>
        {cartData.map((item) => {
          const productData = products.find((product) => product._id === item.id);

          if (!productData) return null;

          const priceForSize = productData.price;
          const totalPrice = priceForSize * item.quantity;

          return (
            <div key={`${item.id}-${item.size}`} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-center gap-6">
                {productData.image && productData.image[0] && (
                  <img src={productData.image[0]} alt={productData.name} className="w-16 sm:w-20" />
                )}
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    {priceForSize > 0 ? (
                      <p>{currency}{priceForSize} x {item.quantity} = {currency}{totalPrice}</p>
                    ) : (
                      <p>Price not available</p>
                    )}
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-100 rounded-md'>{item.size}</p>
                  </div>
                </div>
              </div>

              <input
                type="number"
                className='w-10 sm:w-14 border rounded-md text-center'
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, item.size, parseInt(e.target.value, 10))}
                min="1"
              />

              <img
                onClick={() => handleQuantityChange(item.id, item.size, 0)}
                src={assets.bin_icon}
                alt="Delete"
                className='w-6 sm:w-8 cursor-pointer'
              />
            </div>
          );
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <Carttotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>
              Захиалга өгөх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;