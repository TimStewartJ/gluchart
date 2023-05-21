import React from 'react';
import { Link } from 'react-router-dom';
import "../CSS/Navbar.css";


const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/connect">Connect</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;