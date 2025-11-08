import React from "react";
import { assets } from "../../assets/assets";
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={assets.logo} alt="CremeCharm" />
        <span>CremeCharm Admin</span>
      </div>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
