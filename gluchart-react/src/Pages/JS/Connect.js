import React, { useState } from 'react';
import Hamburger from '../../menu.png';
import '../CSS/Connect.css';
import Navbar from '../../Components/JS/Navbar';
import { Link } from 'react-router-dom';
import X from '../../close.png'
import Logo from '../../Logo.png'

const Connect = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="funny-div">
       <div className={`home2-div ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="header">
          <div className="logo-container">
            <img src={Logo} alt="Logo" className="logo" />
          </div>

          <div className="icon" onClick={handleMenuToggle}>
            {isMenuOpen ? (
              <img src={X} alt="Close" />
            ) : (
              <img src={Hamburger} alt="Hamburger" />
            )}
          </div>
        </div>
        <div className="stuffs">
          <h2>Connect</h2>
          <div className="connect-buttons">
            <button className='bootons'>Dexcom</button>
            <button className='bootons'>Fitbit</button>
            <button className='bootons'>Upload CSV</button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="overlay" onClick={handleMenuToggle}>
          <div className="navbar-overlay">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/connect">Connect</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {isMenuOpen && <Navbar />}
    </div>
  );
};

export default Connect;
