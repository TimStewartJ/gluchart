import React, { useState } from 'react';
import '../CSS/Form.css'
import Button from './Button'
import Button2 from './Button2'

export default function Form() {
    const [activeButton, setActiveButton] = useState('Glucose');
    const [glucoseValue, setGlucoseValue] = useState('');
    const [insulinValue, setInsulinValue] = useState('');
    const [mealValue, setMealValue] = useState('');

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        switch (activeButton) {
          case 'Glucose':
            setGlucoseValue(value);
            break;
          case 'Insulin':
            setInsulinValue(value);
            break;
          case 'Meal':
            setMealValue(value);
            break;
          default:
            break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Access the variables (glucoseValue, insulinValue, mealValue) here based on the button pressed
        console.log('Glucose:', glucoseValue);
        console.log('Insulin:', insulinValue);
        console.log('Meal:', mealValue);
    
        // Reset the input value
        switch (activeButton) {
          case 'Glucose':
            setGlucoseValue('');
            break;
          case 'Insulin':
            setInsulinValue('');
            break;
          case 'Meal':
            setMealValue('');
            break;
          default:
            break;
        }
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

            <label htmlFor="input" className="grams">insert grams</label>
            <input type="number" id="input" name="grams" className="grams-input" 
                value={
                    activeButton === 'Glucose'
                        ? glucoseValue
                        : activeButton === 'Insulin'
                        ? insulinValue
                        : mealValue
                }
            onChange={handleInputChange}></input>

            <div className="bottom-buttons">
                <Button2 text="predict" color="var(--sage-green)" />
                <Button2 text="submit" color="var(--light-blue)" />
            </div>
        </div>
    );
}