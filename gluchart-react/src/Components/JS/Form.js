import React, { useState } from 'react';
import '../CSS/Form.css'
import Button from './Button'
import Button2 from './Button2'

export default function Form(props) {
    // default button pressed is glucose
    const [activeButton, setActiveButton] = useState('Glucose');

    const [glucoseValue, setGlucoseValue] = useState('');
    const [insulinValue, setInsulinValue] = useState('');
    const [mealValue, setMealValue] = useState('');

    // state to hold if loading
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonClick = (buttonText) => {
        if (!isLoading) {
            setActiveButton(buttonText);
        }
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        switch (activeButton) {
          case 'Glucose':
            setGlucoseValue(value);
            setInsulinValue('');
            setMealValue('');
            break;
          case 'Insulin':
            setInsulinValue(value);
            setGlucoseValue('');
            setMealValue('');
            break;
          case 'Meal':
            setMealValue(value);
            setInsulinValue('');
            setGlucoseValue('');
            break;
          default:
            break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
      
        try {
          const results = await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([null, null, null, null, null, null, 6, 8, Math.floor(Math.random() * 7), Math.floor(Math.random() * 7), Math.floor(Math.random() * 7), Math.floor(Math.random() * 7), Math.floor(Math.random() * 7)]);
            }, 2000);
          });
      
          console.log(results);
          props.onSubmit(results)
      
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
        } catch (error) {
          console.error(error);
        }
      
        setIsLoading(false);
    };
      

    return (
        <div className="form">
            <div className="top-buttons">
                <Button
                text="Glucose"
                active={activeButton === 'Glucose'}
                backColor="var(--turqoise)" // Set the desired color for the active button
                fontColor="white"
                onClick={handleButtonClick} disabled={isLoading} 
                />
                <Button
                text="Meal"
                active={activeButton === 'Meal'}
                backColor="var(--turqoise)" // Set the desired color for the active button
                fontColor="white"
                onClick={handleButtonClick} disabled={isLoading} 
                />
                <Button
                text="Insulin"
                active={activeButton === 'Insulin'}
                backColor="var(--turqoise)" // Set the desired color for the active button
                fontColor="white"
                onClick={handleButtonClick} disabled={isLoading} 
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
                <Button2 text="predict" color={isLoading ? 'gray' : 'var(--sage-green)'} onClick={!isLoading ? handleSubmit : undefined} disabled={isLoading} />
                <Button2 text="submit" color={isLoading ? 'gray' : 'var(--turqoise)'} onClick={!isLoading ? handleSubmit : undefined} disabled={isLoading} />
            </div>
        </div>
    );
}