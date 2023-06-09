import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Home.css';
import Hamburger from '../../menu.png';
import Graph from '../../Components/JS/Graph';
import Input from '../../Components/JS/Form';
import Navbar from '../../Components/JS/Navbar';
import { useEffect } from 'react';
import X from '../../close.png'
import Logo from '../../Logo.png'
import firstColumn from '../../util';

const Home = () =>
{
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [results, setResults] = useState({ curr: [69, 420], pred: [420, 69] }); // State to hold the form results
  const [masterInput, setMasterInput] = useState(null);
  const [bloodSugar, setBloodSugar] = useState(140);

  useEffect(() =>
  {
    fetch("https://gluchart-ml-wrapper.azurewebsites.net/init")
      .then((response) => response.json())
      .then((data) =>
      {
        console.log(data)
        setMasterInput(data)
        setResults({curr: firstColumn(data.data, -7, undefined), pred: [firstColumn(data.data, -1, undefined),null,null,null,null]})
      })
  }, [])

  const handleMenuToggle = () =>
  {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="main-div">
      <div className={`home-div ${isMenuOpen ? 'menu-open' : ''}`}>
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

        <h2>Welcome Suzie,</h2>

        <Graph results={results} /> {/* Pass the results prop to the Graph component */}

        <div className="blood-sugar">
          <p className="thin" style={{ marginBottom: '0px' }}>current blood sugar</p>
          <p className="normal">{bloodSugar}</p>
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
        <Input onSubmit={setResults} input={masterInput} setMasterInput={setMasterInput} setBloodSugar={setBloodSugar} /> {/* Pass the onSubmit handler to the Form component */}
      </div>

      {isMenuOpen && <Navbar />}
    </div>
  );
};

export default Home;
