import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login.js';
import Register from './components/Register';
import ItemDetails from './components/ItemDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Logout from './components/Logout';
import Product from './components/Product.js';
import CategoryItems from './components/CategoryItems';

import CartContextProvider from './components/CartContext';
import Category from './components/Category.js';


const App = () => {
  const [cartItems, setCartItems] = useState([]);

const addToCart = (item) => {
  const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

  if (existingItemIndex !== -1) {
    const updatedCart = [...cartItems];
    updatedCart[existingItemIndex].quantity += 1;
    setCartItems(updatedCart);
  } else {
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  }
};

  return (
    
    <BrowserRouter>
   
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/category' element={<Category/>}/>
      <Route path="Category/:categoryType" element={<CategoryItems/>} />
      <Route path="Category/:categoryType/:itemId" element={<CartContextProvider><ItemDetails addToCart={addToCart} /></CartContextProvider>} /> 
      <Route path="/cart" element={<CartContextProvider><Cart cartItems={cartItems} /></CartContextProvider>} />
      <Route path = "/product" element={<Product/>}/>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/dashboard" element={<Dashboard /> }/>
      <Route path="/orders" element={<Orders />} />
      <Route path="/invoice" element={<Orders />} />
      <Route path="/logout" element={<Logout />} />
      </Routes>
    
  </BrowserRouter>
  );
}


export default App;
