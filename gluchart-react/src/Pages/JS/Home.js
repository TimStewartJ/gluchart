import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Home.css';
import Hamburger from '../../menu.png';
import Graph from '../../Components/JS/Graph';
import Input from '../../Components/JS/Form';
import Navbar from '../../Components/JS/Navbar';
import { useEffect } from 'react';

const Home = () =>
{
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [results, setResults] = useState({ curr: [69, 420], pred: [420, 69] }); // State to hold the form results
  const [masterInput, setMasterInput] = useState(null);

  useEffect(() =>
  {
    fetch("https://gluchart-ml-wrapper.azurewebsites.net/init")
      .then((response) => response.json())
      .then((data) =>
      {
        console.log(data)
        setMasterInput(data)
      })
  }, [])

  const handleMenuToggle = () =>
  {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFormSubmit = (formResults) =>
  {
    setResults(formResults); // Update the results state with the form data
  };

  return (
    <div className="main-div">
      <div className={`home-div ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="icon" onClick={handleMenuToggle}>
          <img src={Hamburger} alt="Hamburger" />
        </div>

        <h2>Welcome Suzie,</h2>

        <Graph results={results} /> {/* Pass the results prop to the Graph component */}

        <div className="blood-sugar">
          <p className="thin" style={{ marginBottom: '0px' }}>current blood sugar</p>
          <p className="normal">140</p>
          <p className="thin" style={{ marginTop: '0px' }}>mg/dL</p>
        </div>
      </div>

      {isMenuOpen && (
        <div className="overlay" onClick={handleMenuToggle}>
          <div className="navbar-overlay">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/connect">Connect</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </div>
        </div>
      )}

      <div className={`input-div ${isMenuOpen ? 'menu-open' : ''}`}>
        <Input onSubmit={handleFormSubmit} inputData={masterInput} /> {/* Pass the onSubmit handler to the Form component */}
      </div>

      {isMenuOpen && <Navbar />}
    </div>
  );
};

export default Home;
