import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
              <div className="bottomNav">
          <div className="navBottomDisplay">
            <div className="icons">
              <Link to="/users">
              <i className="fa-solid fa-box fa-2x me-2"></i>
              </Link>
            </div>
            <div className="icons">
                <Link to="/reports">
                <i className="fa-solid fa-inbox fa-2x me-2"></i>
                </Link>
            </div>
          </div>
        </div>
        </div>
    );
};

export default Footer;