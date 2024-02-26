import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./AuthSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    useEffect(() => {
        dispatch(logoutUser(false));
          if (isAuthenticated == false) {
              navigate('/login');
    } }, [dispatch])
    // Redirect if user is already authenticated


    return (
        <div>
            
        </div>
    )
};

export default Logout;