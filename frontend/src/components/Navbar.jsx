import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useClerk } from '@clerk/clerk-react';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const { signOut } = useClerk();

  const toggleVisibility = (setter) => () => setter((prev) => !prev);
  const navLinks = [
    { path: '/', label: 'Нүүр' },
    { path: '/collection', label: 'Бүх бараа' },
    { path: '/orders', label: 'Миний бараа' },
  ];

  const handleLogout = () => signOut();

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={'icons8_shoppers_drug_mart_100px.png'} className="w-32" alt="Logo" />
      </Link>

      <ul className="hidden sm:flex gap-8 text-lg text-gray-700">
        {navLinks.map(({ path, label }, idx) => (
          <li key={idx}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `${isActive ? 'text-blue-600' : 'text-gray-700'} flex flex-col items-center gap-1`
              }
            >
              <p>{label}</p>
              <hr className="w-2/4 border-none h-[2px] bg-gray-700" />
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-8">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
          aria-label="Search Bar"
        />

        <div className="relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
            aria-label="Profile"
            onClick={toggleVisibility(setProfileVisible)}
          />
          {profileVisible && (
            <div className="absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <Link to="/profile" className="cursor-pointer hover:text-black">Миний профайл</Link>
                <Link to="/orders" className="cursor-pointer hover:text-black">Захиалга</Link>
                <button onClick={handleLogout} className="cursor-pointer text-left hover:text-black">Гарах</button>
              </div>
            </div>
          )}
        </div>

        <Link to="/card" className="relative" aria-label="Cart">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          )}
        </Link>

        <img
          onClick={toggleVisibility(setVisible)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
          aria-label="Menu"
        />
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <button
            onClick={toggleVisibility(setVisible)}
            className="flex items-center gap-4 p-3 cursor-pointer"
            aria-label="Close Menu"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Back" />
            <p>Back</p>
          </button>
          {navLinks.map(({ path, label }, idx) => (
            <NavLink
              key={idx}
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to={path}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
