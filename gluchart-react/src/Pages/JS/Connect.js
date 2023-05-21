import React from 'react';
import '../CSS/Home.css';
import Hamburger from '../../menu.png';
import Graph from '../../Components/JS/Graph';
import Input from '../../Components/JS/Form';
import Navbar from '../../Components/JS/Navbar';

const Home = () => {
  return (
    <div className="main-div">
      <Navbar />
      <div className="connect-page">
        <h2>Connect</h2>
        <div className="connect-buttons">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
