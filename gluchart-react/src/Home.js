import React from 'react';
import './Home.css';
import Hamburger from './menu.png';
import Graph from '../src/Components/JS/Graph'
import Input from './Components/JS/Form'

export default function Home() {
    return (
        <div className="main-div">
            <div className='home-div'>
                <div className="icon"> {/* hamburger icon */}
                    <img src={Hamburger} alt="Hamburger" />
                </div>

                <h2>Welcome Suzie,</h2>

                <Graph /> {/* graph inserted here */}

                <div className="blood-sugar">
                    <p className="thin" style={{ marginBottom: '0px' }}>current blood sugar</p>
                    <p className="normal">140</p>
                    <p className="thin" style={{ marginTop: '0px' }}>mg/dL</p>
                </div>
            </div>
            <div className='input-div'>
                <Input /> {/* input for user to put in changes */}
            </div>
            
        </div>
    );
}