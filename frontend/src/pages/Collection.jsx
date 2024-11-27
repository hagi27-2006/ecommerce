import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, loading, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    subCategories: [],
    priceRange: { min: '', max: '' },
    sortType: "relevant"
  });

  const categories = [
    { value: 'Skincare', label: 'Арьс арчилгаа' },
    { value: 'Fragrances', label: 'Үнэртэн' },
    { value: 'Accessories', label: 'Гоёл чимэглэл' },
    { value: 'Shoes', label: 'Гутал' }
  ];

  const subCategories = [
    { value: 'Face Care', label: 'Нүүр арчилгаа' },
    { value: 'Perfume', label: 'Үнэртэй ус' },
    { value: 'Watches', label: 'Бугуйн цаг' },
    { value: 'Jewelry', label: 'Үнэт эдлэл' },
    { value: 'Bags', label: 'Цүнх' },
    { value: 'Shoes', label: 'Гутал' }
  ];

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const currentValues = prev[type];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      
      return { ...prev, [type]: newValues };
    });
  };

  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setFilters(prev => ({
        ...prev,
        priceRange: { ...prev.priceRange, [type]: value }
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      subCategories: [],
      priceRange: { min: '', max: '' },
      sortType: "relevant"
    });
  };

  useEffect(() => {
    if (!loading) {
      let filteredProducts = [...products];
      
      // Search filter
      if (showSearch && search) {
        filteredProducts = filteredProducts.filter(item => 
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Category filter
      if (filters.categories.length > 0) {
        filteredProducts = filteredProducts.filter(item => 
          filters.categories.includes(item.category)
        );
      }

      // Subcategory filter
      if (filters.subCategories.length > 0) {
        filteredProducts = filteredProducts.filter(item => 
          filters.subCategories.includes(item.subCategory)
        );
      }

      // Price range filter
      if (filters.priceRange.min !== '' || filters.priceRange.max !== '') {
        filteredProducts = filteredProducts.filter(item => {
          const price = Number(item.price);
          const min = filters.priceRange.min === '' ? 0 : Number(filters.priceRange.min);
          const max = filters.priceRange.max === '' ? Infinity : Number(filters.priceRange.max);
          return price >= min && price <= max;
        });
      }

      // Sort products
      switch (filters.sortType) {
        case 'low-high':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'high-low':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          // Keep original order
          break;
      }

      setFilterProducts(filteredProducts);
    }
  }, [products, loading, search, showSearch, filters]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Panel */}
      <div className="min-w-60">
        <div className="flex justify-between items-center">
          <p onClick={() => setShowFilter(!showFilter)} 
             className="flex items-center my-2 cursor-pointer text-xl gap-2">
            Шүүлтүүр
            <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
                 src={assets.dropdown_icon} alt="dropdown" />
          </p>
          <button onClick={clearFilters} 
                  className="text-sm text-gray-500 hover:text-black">
            Цэвэрлэх
          </button>
        </div>

        <div className={`space-y-6 ${showFilter ? "" : "hidden"} sm:block`}>
          {/* Categories */}
          <div className="border border-gray-300 p-4 rounded">
            <p className="mb-3 font-medium text-sm">Ангилал</p>
            <div className="space-y-2">
              {categories.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(value)}
                    onChange={() => toggleFilter('categories', value)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub Categories */}
          <div className="border border-gray-300 p-4 rounded">
            <p className="mb-3 font-medium text-sm">Төрөл</p>
            <div className="space-y-2">
              {subCategories.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.subCategories.includes(value)}
                    onChange={() => toggleFilter('subCategories', value)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="border border-gray-300 p-4 rounded">
            <p className="mb-3 font-medium text-sm">Үнийн хязгаар</p>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Мин"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange(e, 'min')}
                className="w-20 p-1 border rounded text-sm"
              />
              <span>-</span>
              <input
                type="text"
                placeholder="Макс"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange(e, 'max')}
                className="w-20 p-1 border rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Display */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <Title text1={"Манай бүтээгдэхүүн"} text2={"Цуглуулга"} />
          <select
            value={filters.sortType}
            onChange={(e) => setFilters(prev => ({ ...prev, sortType: e.target.value }))}
            className="border-2 border-gray-300 text-sm px-2 py-1 rounded"
          >
            <option value="relevant">Холбоотой</option>
            <option value="low-high">Үнэ: Өсөх</option>
            <option value="high-low">Үнэ: Буурах</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>

        {filterProducts.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            Таны хайсан бүтээгдэхүүн олдсонгүй.
          </p>
        )}
      </div>
    </div>
  );
};

export default Collection;
