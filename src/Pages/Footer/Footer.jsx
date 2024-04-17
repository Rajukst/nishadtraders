import { signOut } from 'firebase/auth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../redux/allFeatures/Auth/authSlice';
import toast from 'react-hot-toast';
import auth from '../../Firebase/firebase.config';

const Footer = () => {
  const dispatch= useDispatch()
  const {email}= useSelector(state=>state.auth)
const handleLogOut=()=>{
  signOut(auth)
  .then(()=>{
    dispatch(logOut())
  })
  toast.success("logout Success")
}
    return (
        <div>
              <div className="bottomNav">
          <div className="navBottomDisplay">
            <div className="icons">
              <Link to="/users">
              <i className="fa-solid fa-box fa-2x me-2 mt-2"></i>
              </Link>
            </div>
            <div className="icons">
                <Link to="/reports">
                <i className="fa-solid fa-inbox fa-2x me-2 mt-2"></i>
                </Link>
            </div>
            <div className="icons">
              {email && <i onClick={handleLogOut} className="fa-solid fa-power-off fa-2x me-2 mt-2 signout"></i>}
            </div>
          </div>
        </div>
        </div>
    );
};

export default Footer;