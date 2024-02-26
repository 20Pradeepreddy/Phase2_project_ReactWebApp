import React, { useState } from 'react';
import {Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/register/', formData)
      .then(response => {
        // Handle successful registration
        console.log('Registration successful:', response.data);
        navigate('/login'); // Redirect to login page
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data);
        } else {
          setError('Failed to register. Please try again.');
        }
      });
  };

  return (
    <div>
        <header className="header">
        <div className="header-links">
          <Link exact to="/" >RENTFURLAX</Link>
          <Link to="/login" >Login</Link>
          <Link  to="/register" >Register</Link>
        </div>
      </header>
        <h1>Please Register</h1>
        <form onSubmit={handleSubmit}>
        {error && error.non_field_errors && (
        <div>{error.non_field_errors}</div>
        )}
        <div>
            <label htmlFor="username"> Username : </label>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required/> <br/>   
        </div>
        <div>
            <label htmlFor="first_name">First Name : </label>
            <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required/><br/>
        </div>
        <div>
            <label htmlFor="last_name">Last Name : </label>
            <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required/><br/>
        </div>
        <div>
            <label htmlFor="email">Email : </label>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/><br/>
        </div>
        <div>
            <label htmlFor="address">Address : </label>
            <input type="textarea" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required/><br/>
        </div>
        <div>
            <label htmlFor="phone">Phone : </label>
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required/><br/>
        </div>
        <div>
            <label htmlFor="password">Password : </label>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/><br/>
        </div>
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
