import React, { useState } from 'react';
import './Home.css';
import Hamburger from './menu.png';
import Graph from '../src/Components/JS/Graph';
import Input from './Components/JS/Form';

export default function Home() {
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

        <h2>Welcome Suzie,</h2>

        <Graph />

        <div className="blood-sugar">
          <p className="thin" style={{ marginBottom: '0px' }}>current blood sugar</p>
          <p className="normal">140</p>
          <p className="thin" style={{ marginTop: '0px' }}>mg/dL</p>
        </div>
      </div>

      <div className={`overlay ${isMenuOpen ? 'overlay-open' : ''}`} onClick={handleMenuToggle}>
        <div className="menu-options">
            <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/connect">Connect</a></li>
            <li><a href="/settings">Settings</a></li>
            </ul>
            <div className="overlay-text">
            </div>
        </div>
    </div>

      <div className={`input-div ${isMenuOpen ? 'menu-open' : ''}`}>
        <Input />
      </div>
    </div>
  );
}
