const bodyParser = require("body-parser");
const { log } = require("console");
const { response } = require("express");
const express = require("express");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=45468ca0a88521677cd84c5bb2ff9170&units=metric";
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      return res.json(weatherData);
    });
  });
});

app.listen(3000, () => {
  console.log("At 3000");
});
