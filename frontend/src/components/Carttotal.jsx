import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Carttotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setSubtotal(getCartAmount());
  }, [getCartAmount]);

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const total = subtotal + (subtotal > 0 ? delivery_fee : 0);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title title="Cart Total" />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency}{formatCurrency(subtotal)}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency}{formatCurrency(subtotal > 0 ? delivery_fee : 0)}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency}{formatCurrency(total)}.00</b>
        </div>
      </div>
    </div>
  );
}

export default Carttotal;
