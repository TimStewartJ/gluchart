import React, { useState, useEffect } from 'react'
// import { InteractiveBrowserCredential } from '@azure/identity';
// import { AzureMLWebServicesManagementClient } from '@azure/arm-webservices';
import './App.css';

function App()
{
  //"proxy": "http://localhost:8080"

  // Code for reading in the files
  const [file, setFile] = useState();
  const fileReader = new FileReader();
  const handleOnChange = (e) =>
  {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) =>
  {
    e.preventDefault();
    fileReader.readAsText(file)

    if (file)
    {
      fileReader.onload = function (event)
      {
        const csvOutput = event.target.result;
        // const csvOutputJSON = JSON.stringify(csvOutput)
        // const csvFinalJSON = JSON.parse(csvOutputJSON)
        //console.log(typeof csvOutputJSON)
        // Turn the csvOutput into a 2D array
        const parsedOutput = csvOutput.split("\n").map(function (row) { return row.split(","); })

        // Get rid of the headers
        parsedOutput.splice(0, 1)
        parsedOutput.splice(-1, 1)

        // Get rid of the GMT column
        // map: iterates through each element in the array, which is our row
        parsedOutput.forEach((row) =>
        {
          row.splice(0, 1);
        });

        // Temp: Only last 1000
        parsedOutput.splice(0, parsedOutput.length - 1000)

        parsedOutput.forEach((row, i) =>
        {
          row.forEach((element, j) =>
          {
            parsedOutput[i][j] = + element;
            if (parsedOutput[i][j] < 0.01)
            {
              parsedOutput[i][j] = 0
            }
          })
        }
        );

        console.log(parsedOutput)
        // Stringify the parsedOutput
        const outputJSON = JSON.stringify({
          data: parsedOutput
        })

        const api_key = "L1Q8Q3hZxWI1fi1fiwz2tmX57tMbX2CS"
        fetch("https://gluchart-ml-wrapper.azurewebsites.net/score",
          {
            method: "post",
            headers: {
              'Content-Type': "application/json",
              //'authorization': ('Bearer ' + api_key),
              //'azureml-model-deployment': 'glucode-defaults-model',
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            body: outputJSON
          })
          .then((response) => { console.log(response); response.json() })
          .then((data) =>
          {
            console.log(data)
          })

        //console.log(outputJSON)
        // fetch("http://localhost:8080/ping",
        //   {
        //     method: "post",
        //     body: outputJSON
        //   })
        //   .then((response) =>
        //   {
        //     console.log(response)
        //   })

      };
      //fileReader.readAsText(file)
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Upload Glucose CSV </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) =>
          {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>
    </div>
  );

}


/*
function App()
{
  //CODE FOR TESTING GETTING JSON FROM SERVER ///
  const url = 'https://gluchart-hacking.eastus2.inference.ml.azure.com/score';

  const fetchData = async () =>
  {
    try
    {
      const response = await fetch(url);
      const data = await response.json();

      return (
        console.log(data)
      );

    } catch (error)
    {
      console.log(error);
    }
  }

  // Calls the fetch function
  useEffect(() =>
  {
    fetchData();
  }, [])


}
*/

export default App;
