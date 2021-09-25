//Requiring dependencies
const https = require('https');
const express = require('express');

const app = express();

//Parses body of html files for data
app.use(express.urlencoded({
  extended: true
}));
//Makes css directory detectable
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post('/', function(req, res) {
  const city = req.body.cityInput;
  const state = "," + req.body.stateInput;
  const country = "," + req.body.countryInput;
  const metric = req.body.metricInput;

  const apiKey = "618f7f9515fd5411ad291bdd4e92d124";
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +
    state + country + "&appid=" + apiKey;

  if (req.body.metricInput == "Fahrenheit") {
    url += "&units=imperial";
  } else {
    url += "&units=metric";
  }

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      //console.log(weatherData);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      if (req.body.metricInput == "Fahrenheit") {
        res.write("<h1>The temperature in " + city + " is " + temp + " degrees Fahrenheit.</h1>");
      } else {
        res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celcius.</h1>");
      }
      res.write("<h2>The weather is " + description + "</h2>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  });
})

app.listen(4000, function(req, res) {
  console.log("Server running: Port 4000")
})
