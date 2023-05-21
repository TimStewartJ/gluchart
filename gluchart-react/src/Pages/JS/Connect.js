import React, { useState } from 'react';
import Hamburger from '../../menu.png';
import '../CSS/Connect.css';
import Navbar from '../../Components/JS/Navbar';
import { Link } from 'react-router-dom';

const Connect = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="main-div">
      <div className={`home-div ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="icon" onClick={handleMenuToggle}>
          <img src={Hamburger} alt="Hamburger" />
        </div>

        <h2>Connect</h2>
        <div className="connect-buttons">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
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
