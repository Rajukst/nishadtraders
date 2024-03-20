
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const location= useLocation();
  const from= location.state?.from?.pathname || "/users"
  const { signIn } = useAuth();
  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        toast.success("Login Success!");
        console.log(loggedUser);
        navigate(from, {replace:true})
      })
      .catch((error) => toast.error(error.message));
  };
    return (
        <section>
      <div className="login-box"> 
        <form onSubmit={handleSubmit(handleLogin)}>
          <h2 className="login-txt">Login</h2>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input type="email" name="" id="names" {...register("email")} required/>
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