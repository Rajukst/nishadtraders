
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <p>Loading...</p>
    }

    if (user.email) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;
