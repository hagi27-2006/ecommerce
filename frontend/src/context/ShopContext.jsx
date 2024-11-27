import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const currency = '₮';
  const delivery_fee = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categories = [
          'skincare',
          'fragrances',
          'womens-watches',
          'womens-jewellery',
          'womens-bags',
          'womens-shoes'
        ];

        const fetchPromises = categories.map(category =>
          fetch(`https://dummyjson.com/products/category/${category}`)
            .then(res => res.json())
        );

        const results = await Promise.all(fetchPromises);
        const allProducts = results.flatMap(result => result.products);
        
        const processedProducts = allProducts.map(product => ({
          _id: product.id.toString(),
          name: product.title,
          price: Math.round(product.price * 35),
          image: [product.thumbnail, ...product.images],
          category: categorizeProduct(product.category),
          subCategory: getSubCategory(product.category),
          description: product.description,
          rating: product.rating,
          stock: product.stock,
          bestseller: product.rating > 4.5,
          sizes: getSizes(product.category)
        }));
        
        setProducts(processedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categorizeProduct = (category) => {
    const categoryMap = {
      'skincare': 'Арьс арчилгаа',
      'fragrances': 'Үнэртэн',
      'womens-watches': 'Чимэглэл',
      'womens-jewellery': 'Үнэт эдлэл',
      'womens-bags': 'Цүнх',
      'womens-shoes': 'Гутал'
    };
    return categoryMap[category] || 'Бусад';
  };

  const getSubCategory = (category) => {
    const subCategoryMap = {
      'skincare': 'Нүүр арчилгаа',
      'fragrances': 'Үнэртэй ус',
      'womens-watches': 'Бугуйн цаг',
      'womens-jewellery': 'Үнэт эдлэл',
      'womens-bags': 'Цүнх',
      'womens-shoes': 'Гутал'
    };
    return subCategoryMap[category] || 'Бусад';
  };

  const getSizes = (category) => {
    switch (category) {
      case 'fragrances':
        return ['30мл', '50мл', '100мл'];
      case 'skincare':
        return ['50мл', '100мл', '150мл'];
      case 'womens-shoes':
        return ['36', '37', '38', '39', '40'];
      case 'womens-bags':
        return ['Жижиг', 'Дунд', 'Том'];
      default:
        return ['Нэг размер'];
    }
  };

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const getCartCount = () => {
    let count = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        count += cartItems[productId][size];
      }
    }
    return count;
  };

  const getCartAmount = () => {
    let amount = 0;
    for (const productId in cartItems) {
      const product = products.find(p => p._id === productId);
      if (product) {
        for (const size in cartItems[productId]) {
          amount += product.price * cartItems[productId][size];
        }
      }
    }
    return amount;
  };

  const addToCart = (productId, size) => {
    if (!size) {
      toast.warning('Хэмжээгээ сонгоно уу ⚠️');
      return;
    }
    setCartItems(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [size]: (prev[productId]?.[size] || 0) + 1
      }
    }));
    toast.success('Сагсанд амжилттай нэмэгдлээ ✅');
  };

  const updateQuantity = (productId, size, quantity) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [size]: quantity
      }
    }));
    if (quantity === 0) {
      toast.info('Бараа сагснаас хасагдлаа 🗑️');
    }
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      orderId: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
      status: 'pending'
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
    setCartItems({}); // Clear cart after order
    toast.success('Захиалга амжилттай бүртгэгдлээ ✅');
  };

  const removeOrder = (orderId) => {
    setOrders(prevOrders => prevOrders.filter(order => order.orderId !== orderId));
    toast.success('Захиалга амжилттай устгагдлаа 🗑️');
  };

  const contextValue = {
    products,
    setProducts,
    loading,
    setLoading,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    addOrder,
    orders,
    removeOrder,
    setOrders,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;