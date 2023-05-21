const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const api_key = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkYxOTZCQkQ2NDVDNzY0MUVGQkQ4RThGRkJFMTJBQkZGNjQ2NTVBNjIiLCJ0eXAiOiJKV1QifQ.eyJjYW5SZWZyZXNoIjoiRmFsc2UiLCJ3b3Jrc3BhY2VJZCI6IjE2NDY1OWIyLTZhZjItNDhiYy04ZWRmLWFkODU0MjJiMDkxNCIsInRpZCI6IjMzZTAxOTIxLTRkNjQtNGY4Yy1hMDU1LTViZGFmZmQ1ZTMzZCIsIm9pZCI6ImJlNWE4NjA2LWY1YmUtNDM4MS1iMGM4LTIyNzRmYjQxZWMwOCIsImFjdGlvbnMiOiJbXCJNaWNyb3NvZnQuTWFjaGluZUxlYXJuaW5nU2VydmljZXMvd29ya3NwYWNlcy9vbmxpbmVFbmRwb2ludHMvc2NvcmUvYWN0aW9uXCJdIiwiZW5kcG9pbnROYW1lIjoiZ2x1Y2hhcnQtaGFja2luZyIsInNlcnZpY2VJZCI6ImdsdWNoYXJ0LWhhY2tpbmciLCJleHAiOjE2ODQ3MjA1OTYsImlzcyI6ImF6dXJlbWwiLCJhdWQiOiJhenVyZW1sIn0.jhMtSxQCNvlnU1HGp9kl4fYzzQtg-ivk1VVOPbs9y3v2K7jSEeSaMypjYZXh2VjhahJhF61Tj7OGURjeZZYSjqmFvol6LIVKkFB-V1rshgQoR1hdBJVdsMn2mWHd9ZECP82euy7ME_3UMYG1KqaeE9vEHH4KQPunS3t66EcBhFf1HFodcPpjSh_ihDvyOBD8CZUtKE6DuJuO3G2_8XsG7HaPAqhj1z9k9Y5XyiX3vDz6CLaLGAx0Tox3Q58nHOE4inqv3ukfOplRBT3m4nVm5HiJ6Gwwr6bRt658uGSr659fibtomKM580te7fQ4F6DQ9yYlFez2-rmCJz7bLpo6Pw"

app.use(cors())

app.post('/ping', function (req, res)
{
    console.log("PONG")
    fetch("https://gluchart-ml-wrapper.azurewebsites.net/score",
        {
            method: "post",
            headers: {
                'Content-Type': "application/json",
                //'authorization': ('Bearer ' + api_key),
                'azureml-model-deployment': 'glucode-defaults-model',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            body: req.body
        })
        .then((response) =>
        {
            console.log(response)
            return res.send(response)
        })
    //return res.send('pong');
});

app.get('/', function (req, res)
{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("Got ehre")

app.listen(process.env.PORT || 8080);