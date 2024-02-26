import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Category = ()=>{
    const navigate = useNavigate();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    if (isAuthenticated && isAdmin) {
        navigate('/category')
    }
    else if(isAuthenticated && !isAdmin) {
        navigate('/dashboard');
    }else{
      navigate('/login');
  }
   
  const [category,setcategory] = useState('');
  const [image,setimage] = useState('');
  const submitHandler = (e)=>{
    e.preventDefault();
    const categoryData = {
        type : category,
        image : image,
    }

    axios.post('http://localhost:8000/category/', categoryData)
        
    .then(response => {
        console.log(response);
        //console.log("Navigating to dashboard");
        window.location.reload();
    })
    .catch(error => {
        console.log(error);
    });
    setcategory("");
    setimage("");

  }

  const imagehandler = (e)=>{
    setimage(e.target.value);
   }
  
  const categoryhandler = (e)=>{
   setcategory(e.target.value);
  }
 
  
    return(
        <div>
            <header className="header">
              <div className="header-links">
                <Link exact to="/" >RENTFURLAX</Link>
                <Link to="/dashboard" >Dashboard</Link>
                <Link  to="/logout" >Logout</Link>
              </div>
           </header>

            <div className="form">
                <center><h2>Add Category</h2></center>
              <form onSubmit={submitHandler}>
                <ul>
                <label>Category</label>
                <input type="text" autoComplete="off" placeholder="Enter type" value={category} onChange={categoryhandler}/>
                <br></br>                
                <input type="url" placeholder="Enter image url" value={image} onChange={imagehandler}/>
                <button type="submit">Submit</button>
                </ul>
              </form>
            </div>
        </div>
    )
}
export default Category;