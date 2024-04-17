import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import CustomLoader from '../../CustomLoader/CustomLoader';
import { useSelector } from 'react-redux';

const PrivateRoute = ({children}) => {
    const {isLoading, email}= useSelector(state=>state.auth)
    const location= useLocation()
    if(isLoading){
        return <CustomLoader/>
    }
    if(email){
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;