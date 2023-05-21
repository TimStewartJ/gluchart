import React, { useState } from 'react';
import '../CSS/Form.css'
import Button from './Button'
import Button2 from './Button2'

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
    }
  };

  const handleInputChange = (event) =>
  {
    const { value } = event.target;
    switch (activeButton)
    {
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

  const makePrediction = async (data) => {
    setIsLoading(true);

    let submissionData = data
    //submissionData = submissionData.slice(0, 500)
    // submissionData.at(-1)[0] = +glucoseValue
    submissionData.at(-3)[1] = +mealValue
    submissionData.at(-3)[4] = +insulinValue

    //console.log(submissionData.at(-1))

    //console.log(JSON.stringify(submissionData))

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
        const current_input = []

        // last 6 of master submission data
        const sliced_input = submissionData.slice(-7)

        // get first element in last 6 of submission data (aka the 6 most recent CGM readings)
        sliced_input.forEach(element =>
        {
          current_input.push(element[0])
        });

        const pred_output = output.at(-1)
        pred_output.unshift(current_input.at(-1))

        console.log(pred_output)

        props.onSubmit({ curr: current_input, pred: pred_output })
      })

    switch (activeButton)
    {
      case 'Glucose':
        props.setBloodSugar(+glucoseValue);
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

    // Edit master array
    // Send to azure fetch

    setIsLoading(false);
  }

  // Write separate handleSubmit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeButton === 'Glucose') {
      props.input.data.push([+glucoseValue, 0, 0, 0, 0])
      makePrediction(props.input.data)
      props.setMasterInput(props.input)
    }
  }

  // Button for submitting user input
  const handlePredict = async (event) =>
  {
    event.preventDefault();
    makePrediction(props.input.data)
  };

  let label = 'insert mg/dL';
  if (activeButton === 'Meal') {
    label = 'insert grams';
  } else if (activeButton === 'Insulin') {
    label = 'insert milliliters';
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