import React, { useState } from 'react';
import '../CSS/Home.css';
import Hamburger from '../../menu.png';
import Graph from '../../Components/JS/Graph';
import Form from '../../Components/JS/Form';
import Navbar from '../../Components/JS/Navbar';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [results, setResults] = useState(null); // State to hold the form results

  const [currentBloodSugar, setCurrentBloodSugar] = useState('140');

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFormSubmit = (formResults) => {
    setResults(formResults); // Update the results state with the form data
  };

  return (
    <div className="main-div">
      <Navbar isMenuOpen={isMenuOpen} />

      <div className={`home-div ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="icon" onClick={handleMenuToggle}>
          <img src={Hamburger} alt="Hamburger" />
        </div>

        <h2>Welcome Suzie,</h2>

        <Graph results={results} /> {/* Pass the results prop to the Graph component */}

        <div className="blood-sugar">
          <p className="thin" style={{ marginBottom: '0px' }}>current blood sugar</p>
          <p className="normal">{currentBloodSugar}</p>
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
        <Form onSubmit={handleFormSubmit} BloodSugar={setCurrentBloodSugar}/> {/* Pass the onSubmit handler to the Form component */}
      </div>
    </div>
  );
};

export default Home;
