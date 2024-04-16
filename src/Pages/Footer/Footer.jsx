import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Footer = () => {
  const {logOut}= useAuth()
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
                <i onClick={logOut} className="fa-solid fa-power-off fa-2x me-2 mt-2 signout"></i>
            </div>
          </div>
        </div>
        </div>
    );
};

export default Footer;