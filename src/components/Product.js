import { useState } from "react";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Product = ()=>{

  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [condition,setcondition] = useState('');
  const [noofdays, setnoofdays] = useState('');
  const [category, setcategory] = useState('');
  const [options, setoptions] = useState('');
  const [rentaloptions,setrentaloptions] = useState('');
  const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    if (isAuthenticated && isAdmin) {
        navigate('/product')
    }
    else if(isAuthenticated && !isAdmin) {
        navigate('/dashboard');
    }else{
      navigate('/login');
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    const product = { 
      name : name,
      description : description,
      condition : condition,
      noofdays : noofdays,
      category : category,
      options : options,
      rentaloptions : rentaloptions,
    }
    axios.post('http://localhost:8000/product/', product)
        
            .then(response => {
                console.log(response);
                //console.log("Navigating to dashboard");
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
            //console.log(values);
  

    setname("");
    setdescription("");
    setcondition("");
    setnoofdays("");
    setcategory("");
    setoptions("");
    setrentaloptions("");
  }

    
  
  const namehandler = (e)=>{
    setname(e.target.value);
  }
  const descriptionhandler = (e)=>{
    setdescription(e.target.value);
  }
  const conditionhandler = (e)=>{
    setcondition(e.target.value);
  }
  const noofdayshandler = (e)=>{
    setnoofdays(e.target.value);
  }
  const categoryhandler = (e)=>{
    setcategory(e.target.value);
  }
  const optionshandler = (e)=>{
    setoptions(e.target.value);
  }
  const rentaloptionshandler = (e)=>{
    setrentaloptions(e.target.value);
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
              <center><h2>Add Product</h2></center>
              <form onSubmit={submitHandler}>
                <ul>
                <label>name</label>
                <input type="text" autoComplete="off" placeholder="Enter Product name" value={name} onChange={namehandler}/>
                <br></br>
                <label>Description</label>
                <input type="text" autoComplete="off" placeholder="Enter Description" value={description} onChange={descriptionhandler}/>
                <br></br>
                <label>condition</label>
                <input type="text" autoComplete="off" placeholder="Enter Product condition" value={condition} onChange={conditionhandler}/>
                <br></br>
                <label>noofdays</label>
                <input type="number" autoComplete="off" placeholder="Enter No.of days to deliver" value={noofdays} onChange={noofdayshandler}/>
                <br></br>
                <label>category</label>
                <input type="text" autoComplete="off" placeholder="Enter Product category" value={category} onChange={categoryhandler}/>
                <br></br>
                <label>options</label>
                <input type="text" autoComplete="off" placeholder="Enter Options" value={options} onChange={optionshandler}/>
                <br></br>
                <label>rentaloptions</label>
                <input type="text" placeholder="Enter Rental options" value={rentaloptions} onChange={rentaloptionshandler} />
                <br></br>
                <button type="submit">Add Product</button>
                </ul>
              </form>
            </div>
        </div>
    )
}
export default Product;