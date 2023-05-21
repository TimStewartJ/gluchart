const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const api_key = require('/home/api_key.json')['key']
const init_data = require('/home/init_data.json')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/score', (req, res) => {
    console.log(req.body)
    console.log(JSON.stringify(req.body))
    fetch("https://gluchartwrapper.azure-api.net/score",
    {
        method: "post",
        headers: {
            'Content-Type': "application/json",
            'authorization': ('Bearer ' + api_key),
            'azureml-model-deployment': 'glucose-defaults-model',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify(req.body)
        })
        .then((response) => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(data => {
                return res.json({test: "joe mama", output: data})
            });
            } else {
            return response.text().then(text => {
                return res.send(text)
        });
    }})
})

app.get('/init', (req, res) => {
    return res.json(init_data)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
