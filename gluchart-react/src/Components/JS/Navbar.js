import React from 'react';
import { Link } from 'react-router-dom';
import "../CSS/Navbar.css";


const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/connect">connect</Link></li>
        <li><Link to="/settings">settings</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;