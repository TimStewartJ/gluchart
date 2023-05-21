import React, { useState } from 'react';
import '../CSS/Home.css';
import Hamburger from '../../menu.png';
import Graph from '../../Components/JS/Graph';
import Input from '../../Components/JS/Form';
import Navbar from '../../Components/JS/Navbar';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="main-div">
      <Navbar isMenuOpen={isMenuOpen} />

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

      <div className={`input-div ${isMenuOpen ? 'menu-open' : ''}`}>
        <Input />
      </div>
    </div>
  );
};

export default Home;
