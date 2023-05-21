import React, { useState } from 'react';
import '../CSS/Form.css'
import Button from './Button'
import Button2 from './Button2'
import firstColumn from '../../util';

export default function Form(props)
{
  // default button pressed is glucose
  const [activeButton, setActiveButton] = useState('Glucose');

  const [glucoseValue, setGlucoseValue] = useState('');
  const [insulinValue, setInsulinValue] = useState('');
  const [mealValue, setMealValue] = useState('');

  // state to hold if loading
  const [isLoading, setIsLoading] = useState(false);


  const handleButtonClick = (buttonText) =>
  {
    if (!isLoading)
    {
      setActiveButton(buttonText);
      setGlucoseValue('');
      setInsulinValue('');
      setMealValue('');
    }
  };

  const handleInputChange = (event) =>
  {
    const { value } = event.target;
    switch (activeButton)
    {
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

  const makePrediction = async (data) => {
    setIsLoading(true);

    let submissionData = data
    submissionData.at(-3)[1] = +mealValue
    submissionData.at(-3)[4] = +insulinValue

    await fetch("https://gluchart-ml-wrapper.azurewebsites.net/score",
      {
        method: "post",
        headers: {
          'Content-Type': "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify({ data: submissionData })
      })
      .then((response) => response.json())
      .then((data) =>
      {
        const output = data.output
        console.log(output)
        const current_input = firstColumn(submissionData, -7, undefined)

        const pred_output = output.at(-1)
        pred_output.unshift(current_input.at(-1))

        console.log(pred_output)

        props.onSubmit({ curr: current_input, pred: pred_output })
      })

    // Edit master array
    // Send to azure fetch

    setIsLoading(false);
  }

  // Write separate handleSubmit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (activeButton) {
      case 'Glucose':
        props.input.data.push([+glucoseValue, 0, 0, 0, 0])
        props.setBloodSugar(+glucoseValue);
        setGlucoseValue('');
        break
      case 'Insulin':
        props.input.data.at(-1)[4] = +insulinValue
        setInsulinValue('');
        break
      case 'Meal':
        props.input.data.at(-1)[4] = +mealValue
        setMealValue('');
        break
      default:
        break
    }

    makePrediction(props.input.data)
    props.setMasterInput(props.input)
  }

  // Button for submitting user input
  const handlePredict = async (event) =>
  {
    event.preventDefault();
    makePrediction(props.input.data)
  };

  let label = 'insert mg/dL';
  if (activeButton === 'Meal')
  {
    label = 'insert grams';
  } else if (activeButton === 'Insulin')
  {
    label = 'insert units';
  }

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

      <label htmlFor="input" className="grams">{label}
        {isLoading && <span className="loader" />}
      </label>
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
        <Button2 text="predict" color={isLoading ? 'gray' : 'var(--sage-green)'} onClick={!isLoading ? handlePredict : undefined} disabled={isLoading} />
        <Button2 text="submit" color={isLoading ? 'gray' : 'var(--turqoise)'} onClick={!isLoading ? handleSubmit : undefined} disabled={isLoading} />
      </div>
    </div>
  );
}