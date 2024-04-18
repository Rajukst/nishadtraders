import {React, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/allFeatures/Auth/authSlice";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.from?.pathname || "/users";
  const dispatch= useDispatch()
  const {isLoading, email, isError, error}= useSelector(state=>state.auth)
  const loginSubmit = ({email, password}) => {
        dispatch(loginUser({email, password}))
       
  };
  useEffect(()=>{
    if(!isLoading && email){
      navigate(destination, { replace: true });
    }
  },[isLoading, email])

// error message showing UI

useEffect(()=>{
if(isError){
  toast.error(error)
}
},[isError, error])
    return (
        <section>
      <div className="login-box"> 
        <form onSubmit={handleSubmit(loginSubmit)}>
          <h2 className="login-txt">Login</h2>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input type="email" name="" id="names" 
            {...register("email")}
             required/>
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              name=""
              id="passwords"
              {...register("password")}
              required
            />
            <label>Password</label>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" name="" id="hhhh" />
              Remember Me
            </label>
            <Link to="#">Forgot Password</Link>
          </div>
          <input
            className="submitBTN"
            type="submit"
            name="Login"
            id=""
            value="Login"
          />
        </form>
      </div>
    </section>
    );
};

export default Login;