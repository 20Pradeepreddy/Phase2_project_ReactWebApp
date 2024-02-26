import React, {useState, useEffect} from 'react';

import { Link, useNavigate} from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';
import image from '../images/addtocart.png';
import { useSelector } from 'react-redux';



const Dashboard = () => {
  const navigate = useNavigate();
  let adminui = ''
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  if (isAuthenticated && isAdmin) {
    adminui = <center><a className='adminui' href='/category'>Add category</a><br/><br/>
                      <a className='adminui' href='/product'>Add Product</a><br/><br/>
                      <a className='adminui' href='/invoice'>Invoice</a><br/></center>
  }
  else if(isAuthenticated && !isAdmin) {
      navigate('/dashboard');
  }else{
    navigate('/login');
}
  const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   const fetchdata = async() => fetch('http://localhost:8000/categories/')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Decode the image path and remove the leading slash
  //       const cleanedData = data.map(category => ({
  //         id: category.id,
  //         type: category.type,
  //         // Decode the URL-encoded image path and remove the leading slash
  //         image: decodeURIComponent(category.image).replace(/^\//, '')
  //       }));
  //       setCategories(cleanedData);
  //       console.log(cleanedData);
  //     })
  //     .catch(error => console.error('Error fetching categories:', error));
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categories/');
        // setCategories(response.data);
        const cleanedData = response.data.data.map(category => ({
          id: category.id,
          type: category.type,
          // Decode the URL-encoded image path and remove the leading slash
          image: decodeURIComponent(category.image).replace(/^\//, '')
        }));
        setCategories(cleanedData);
        // console.log(cleanedData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-links">
          <Link exact to="/" >RENTFURLAX</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/orders" >Orders</Link>
          <Link to="/logout" >Logout</Link>
          <Link className='addtocart'to ="/cart"><img src={image} alt="addtocart"></img></Link>
        </div>
      </header>
      <div className="body">
        <div className="browse-category">
          Browse by Category
          
          <br/>
          <br/>
          <div className="underline"></div>
        </div>
        <div className="image-container">
          {categories.map(category => (
            <div key={category.id} className="image">
              <Link to={`/Category/${category.type}`}>
                <img src={category.image} alt={category.type} />
                <button className="home-button" onClick={(e) => { e.preventDefault(); window.location.href = category.type ? `/Category/${category.type}` : "#"; }}>
                  {category.type}
                </button>
              </Link>
            </div>
          ))}
        </div>
        {adminui}
      </div>
    </div>
  );
}

export default Dashboard;
