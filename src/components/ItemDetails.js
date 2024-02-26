import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CartContext } from './CartContext';
import './ItemDetails.css'; 
import { useSelector } from 'react-redux';

const ItemDetails = () => {
  const { categoryType, itemId } = useParams();
  const [item, setItem] = useState('');
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  useEffect(() => {
    fetch('http://localhost:8000/products/'+categoryType+"/"+itemId)
      .then(response => response.json())
      .then(data => {
        setItem(data.data);
        console.log(item);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [categoryType, itemId]);

  const handleAddToCart = () => {
    const itemToAdd = {
      name: item[0].name,
      image: item[0].options.imageurl,
      price : item[0].rentaloptions,
      quantity: 1
    };

    window.alert('Added to cart successfully!');
    addToCart(itemToAdd);
    navigate('/cart');
  };

  let adminui = '';
  if (isAuthenticated && isAdmin) {
    adminui = <button onClick={handleAddToCart}>Add to cart</button>;
    navigate(`/Category/${categoryType}/${itemId}`);
  } else if (isAuthenticated) {
    adminui = <button onClick={handleAddToCart}>Add to cart</button>;
    navigate(`/Category/${categoryType}/${itemId}`);
  } else {
    adminui = <a href='/login'>Login</a>;
  }

  return (
    <div>
      <header className="header">
        <div className="header-links">
          <Link exact to="/" >RENTFURLAX</Link>
          <Link to="dashboard" >Dashboard</Link>
          <Link to="/logout" >Logout</Link>
        </div>
      </header>
  {item && item[0] && ( // Add conditional rendering to ensure item[0] exists
    <div>
      <center><h1 className='browse-category'>{"Details of " + item[0].name}</h1></center>
      <div className="item-details-content">
        <div className="left-content">
          <img src={item[0].options.imageurl} alt={item[0].name} />
          <button onClick={handleAddToCart} >Add to cart</button>
        </div>
        <div className="right-content">
          <h1>{item[0].name}</h1>
          <p>{item[0].description}</p>
          <div>Color: {item[0].options.color}</div>
          <div>Size: {item[0].options.size}</div>
          Rental Options:
          <ul>
            {item[0].rentaloptions.map(option => (
              <li key={option.tenure}>
                {option.tenure} months: {option.ratepermonth} per month
              </li>
            ))}
          </ul>
          <div>Condition: {item[0].condition}</div>
          <div>Delivered by: {item[0].noofdays} days</div>
        </div>
      </div>
    </div>
  )}
</div>

  );
}

export default ItemDetails;
