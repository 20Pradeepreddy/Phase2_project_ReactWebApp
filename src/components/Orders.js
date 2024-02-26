import { useState } from "react";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Orders = ()=>{
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    if (isAuthenticated && isAdmin) {
        navigate('/orders')
    }
    else if(isAuthenticated && !isAdmin) {
        navigate('/dashboard');
    }else{
      navigate('/login');
  }
  
  const [username,setUsername] = useState('');
  const [status, setstatus] = useState('');
  const [totalamount, settotalamount] = useState('');
  const [products, setproducts] = useState('');



  const submitHandler = (e)=>{
    e.preventDefault();
    const orders = {
      user : username,
      status : status,
      totalamount : totalamount,
      products : [products],
    }
    axios.post('http://localhost:8000/invoice/', orders)
        
            .then(response => {
                console.log(response);
                //console.log("Navigating to dashboard");
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    setUsername("");
    setstatus("");
    settotalamount("");
    setproducts("");
  }

    
  
  const usernamehandler = (e)=>{
    setUsername(e.target.value);
  }
  const statushandler = (e)=>{
    setstatus(e.target.value);
  }
  const totalamounthandler = (e)=>{
    settotalamount(e.target.value);
  }
  const productshandler = (e)=>{
    setproducts(e.target.value);
  }

    return(
        <div>
            <header className="header">
              <div className="header-links">
                <Link exact to="/" >RENTFURLAX</Link>
                <Link  to="/dashboard" >Dashboard</Link>
                <Link to="/logout" >Logout</Link>
              </div>
            </header>

            <div className="form">
            <center><h2>Add Invoice</h2></center>
              <form onSubmit={submitHandler}>
                <ul>
                <label>status</label>
                <input type="text" autoComplete="off" placeholder="Enter status" value={status} onChange={statushandler}/>
                <br></br>
                <label>User</label>
                <input type="text" autoComplete="off" placeholder="Enter user" value={username} onChange={usernamehandler}/>
                <br></br>
                <label>totalamount</label>
                <input type="text" autoComplete="off" placeholder="Enter amount" value={totalamount} onChange={totalamounthandler}/>
                <br></br>
                <label>products</label>
                <input type="text" autoComplete="off" placeholder="Enter products" value={products} onChange={productshandler}/>
                <br></br>
                <button type="submit">Submit</button>
                </ul>
              </form>
            </div>
        </div>
    )
}
export default Orders;