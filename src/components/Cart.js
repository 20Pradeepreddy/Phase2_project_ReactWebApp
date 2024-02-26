import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './Cart.css'

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  
  return (
    <div>
      <h1>Cart</h1>
      <div className='cart'>
      {cartItems.length > 0 ? (
        <ul className='cart'>
          {cartItems.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>{item.name}</div>
              <div>{item.price.tenure}</div>
              <div>Amount = {item.price[0].ratepermonth}</div>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No items in the cart</div>
      )}
      </div>
    </div>
  );
};

export default Cart;
