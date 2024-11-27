import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify';

const Orders = () => {
  const { orders, setOrders, currency, delivery_fee, products } = useContext(ShopContext);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProductDetails = (productId) => {
    return products.find(p => p._id === productId);
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch(status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    if (!status) return 'Хүлээгдэж буй';
    
    const statusMap = {
      'pending': 'Хүлээгдэж буй',
      'completed': 'Хүргэгдсэн',
      'cancelled': 'Цуцлагдсан'
    };
    
    return statusMap[status.toLowerCase()] || status;
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    if (window.confirm('Захиалгыг устгахдаа итгэлтэй байна уу?')) {
      try {
        const updatedOrders = orders.filter(order => order.orderId !== orderId);
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        toast.success('Захиалга амжилттай устгагдлаа 🗑️');
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error('Захиалга устгахад алдаа гарлаа');
      }
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="border-t pt-14 px-4 max-w-6xl mx-auto">
        <div className="text-2xl mb-3">
          <Title text1="Захиалга" text2="Байхгүй" />
        </div>
        <p className="text-center text-gray-500">Та одоогоор захиалга хийгээгүй байна.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-14 px-4 max-w-6xl mx-auto">
      <div className="text-2xl mb-6">
        <Title text1="Таны" text2="Захиалгууд" />
      </div>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.orderId} className="border rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">Захиалга #{order.orderId}</h3>
                <p className="text-sm text-gray-500">
                  {order.orderDate ? formatDate(order.orderDate) : 'Огноо байхгүй'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {formatStatus(order.status)}
                </span>
                <button
                  onClick={() => handleDeleteOrder(order.orderId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="border-t border-b py-4 my-4">
              <h4 className="font-semibold mb-2">Захиалсан бараа:</h4>
              {order.items && Object.entries(order.items).map(([productId, sizes]) => {
                const product = getProductDetails(productId);
                return Object.entries(sizes).map(([size, quantity]) => (
                  quantity > 0 && (
                    <div key={`${productId}-${size}`} className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-medium">{product?.name || 'Бүтээгдэхүүн олдсонгүй'}</p>
                        <p className="text-sm text-gray-500">Хэмжээ: {size}, Тоо ширхэг: {quantity}</p>
                      </div>
                      <p className="font-medium">
                        {currency}{((product?.price || 0) * quantity).toLocaleString()}
                      </p>
                    </div>
                  )
                ));
              })}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-600">Нийт дүн:</p>
                <p>{currency}{((order.totalAmount || 0) - delivery_fee).toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Хүргэлтийн төлбөр:</p>
                <p>{currency}{delivery_fee}</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Нийт тлбөр:</p>
                <p>{currency}{(order.totalAmount || 0).toLocaleString()}</p>
              </div>
            </div>

            {order.deliveryAddress && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold mb-2">Хүргэлтийн хаяг:</h4>
                <div className="text-sm text-gray-600">
                  <p>{order.deliveryAddress.firstName} {order.deliveryAddress.lastName}</p>
                  <p>{order.deliveryAddress.street}</p>
                  <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipcode}</p>
                  <p>{order.deliveryAddress.country}</p>
                  <p>Утас: {order.deliveryAddress.phone}</p>
                </div>
              </div>
            )}

            {order.paymentMethod && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm">
                  <span className="font-semibold">Төлбөрийн хэлбэр:</span>{' '}
                  {order.paymentMethod === 'cash' ? 'Бэлнээр' : order.paymentMethod.toUpperCase()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
