// import React, { useState } from 'react';
// import {Formik, Form, Field, ErrorMessage} from  "formik";
// import {Link, useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';

// function Login() {
//     const navigate = useNavigate();
//     const [errorMessage, setErrorMessage] = useState('');
//     const handleSubmit = (values, { setSubmitting }) => {
//         if (values.username == 'admin' && values.password == 'admin143') {
//             navigate('/dashboard')
//         }
//         else {
//         axios.post('http://localhost:8000/login/', values)
        
//             .then(response => {
//                 console.log(response);
//                 setSubmitting(false);
//                 navigate( "/dashboard" );
//                 //console.log("Navigating to dashboard");
//                 window.location.reload();
//             })
//             .catch(error => {
//                 console.log(error);
//                 setSubmitting(false);
//                 setErrorMessage('Invalid username or password');
//             });
//             //console.log(values);
//     }};
    
//     return (
//     <div>
//         <header className="header">
//         <div className="header-links">
//           <Link exact to="/" >RENTFURLAX</Link>
//           <Link  to="/login" >Login</Link>
//           <Link to="/register" >Register</Link>
//         </div>
//       </header>
//         <h1>Please Login</h1>
    
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//         <Formik
//             initialValues={{ username: '', password: '' }}
//             validate={values => {
//             const errors = {};
//                 if (!values.username) {
//                     errors.username = 'Username is required';
//                 }
//                 if (!values.password) {
//                     errors.password = 'Password is required';
//                 }
//                 return errors;
//             }}
//             onSubmit={handleSubmit}
//             >
//             {({ isSubmitting }) => (
//             <Form>
//                 <ErrorMessage name="username" component="div" />
//                 <label htmlFor="username">Username</label>
                
//                 <Field type="text" name="username" />
                
//                 <ErrorMessage name="password" component="div" />
//                 <label htmlFor="password">Password</label>
                
//                 <Field type='password' name="password" />
                
                
//                 <button type="submit" disabled={isSubmitting}>
//                 Login
//                 </button>
//             </Form>
//             )}
//         </Formik>
//     </div>
//     );
//     }
    
//     export default Login;

import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './AuthSlice';
import { Link } from 'react-router-dom';

const Login = () => {
    
        const dispatch = useDispatch();
        const navigate = useNavigate();
        
        const [formData, setFormData] = useState({ username: '', password: '' });
      
        const HandelChange= (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          dispatch(loginUser(formData));
        };
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
        if (isAuthenticated) {
          navigate('/dashboard'); // Redirect if user is already authenticated
        }
    
      
    
    return (
        <div className="login">
        <header className="header">
           <div className="header-links">
                <Link exact to="/" >RENTFURLAX</Link>
                <Link  to="/login" >Login</Link>
                <Link to="/register" >Register</Link>
            </div>
        </header>
        <div className="body">
        {/* <h2>Please Login</h2> */}
        <form className="loginform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text"  placeholder="Enter Username" id="inp" value={formData.username} onChange={HandelChange} name='username'/>
        <label>Password</label>
        <input type="password" placeholder="Enter Password" id="inp" value={formData.password} onChange={HandelChange} name='password'/>
        <label></label>
        <button type="submit" >LOGIN</button>
        </form>
        </div>
        </div>
    );
}

export default Login;
    