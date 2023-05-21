import React, { useState } from 'react';
import '../CSS/Form.css'
import Button from './Button'
import Button2 from './Button2'

export default function Form() {
    const [activeButton, setActiveButton] = useState('');

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    return (
        <div className="form">
            <div className="top-buttons">
                <Button
                text="Glucose"
                active={activeButton === 'Glucose'}
                backColor="var(--turqoise)" // Set the desired color for the active button
                fontColor="white"
                onClick={handleButtonClick}
                />
                <Button
                text="Meal"
                active={activeButton === 'Meal'}
                backColor="var(--turqoise)" // Set the desired color for the active button
                fontColor="white"
                onClick={handleButtonClick}
                />
                <Button
                text="Insulin"
                active={activeButton === 'Insulin'}
                backColor="var(--turqoise)" // Set the desired color for the active button
                fontColor="white"
                onClick={handleButtonClick}
                />
            </div>

            <hr className="divider"></hr>

            <label htmlFor="fname" className="grams">insert grams</label>
            <input type="text" id="fname" name="firstname" className="grams-input"></input>

            <div className="bottom-buttons">
                <Button2 text="predict" color="var(--sage-green" />
                <Button2 text="submit" color="var(--light-blue" />
            </div>
        </div>
    );
}