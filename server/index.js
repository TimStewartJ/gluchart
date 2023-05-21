const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const api_key = require('/home/api_key.json')['key']

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/score', (req, res) => {
    fetch("https://gluchartwrapper.azure-api.net/score",
    {
        method: "post",
        headers: {
            'Content-Type': "application/json",
            'authorization': ('Bearer ' + api_key),
            'azureml-model-deployment': 'glucode-defaults-model',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: req.body
        })
        .then((response) =>
        {
            res.send(response)
        })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
