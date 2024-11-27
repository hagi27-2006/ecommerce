import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useUser } from '@clerk/clerk-react';
import Title from '../components/Title';
import Carttotal from '../components/Carttotal';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { user, isLoaded } = useUser();
  const { cartItems, products, currency, delivery_fee, addOrder } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });
  const navigate = useNavigate();

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotalAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId);
      if (product) {
        for (const size in cartItems[itemId]) {
          total += product.price * cartItems[itemId][size];
        }
      }
    }
    return total + delivery_fee;
  };

  const handlePlaceOrder = () => {
    const order = {
      user: user.id,
      items: cartItems,
      deliveryAddress: formData,
      paymentMethod: method,
      totalAmount: calculateTotalAmount()
    };
    addOrder(order);
    navigate('/orders');
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Delivery Information */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="firstName" placeholder='First name' value={formData.firstName} onChange={handleChange} />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="lastName" placeholder='Last name' value={formData.lastName} onChange={handleChange} />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" name="email" placeholder='Email address' value={formData.email} onChange={handleChange} />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="street" placeholder='Street' value={formData.street} onChange={handleChange} />
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="city" placeholder='City' value={formData.city} onChange={handleChange} />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="state" placeholder='State' value={formData.state} onChange={handleChange} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" name="zipcode" placeholder='Zipcode' value={formData.zipcode} onChange={handleChange} />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="country" placeholder='Country' value={formData.country} onChange={handleChange} />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange} />
      </div>

      {/* Payment Information */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <Carttotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex flex-col gap-3 mt-4'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-black' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-black' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-black' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button onClick={handlePlaceOrder} className='bg-black text-white px-16 py-3 text-sm'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
