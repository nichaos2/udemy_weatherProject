const express = require("express");
const https = require("https");
const app = express();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Athens&appid=4a20317e712c6b1a261f29900e05869e&units=metric";

  https.get(url, function (response) {
    console.log(response);
    // log the status
    console.log(response.statusCode);

    // get data
    response.on("data", function (data) {
      // get the hexa data and create a JSON object
      const weatherData = JSON.parse(data);

      // get the data we want
      // use JSON Viewer Awesome copy for easyness and to avoid mistakes
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      console.log("Temp is: " + temp);
      console.log("It is: " + desc);

      res.send("Temp is: " + temp + "<br> It is: " + desc);
    });
  });

  // cannot send twice in teh same get method
  //res.send("Server runs")
});

// 
app.listen(3000, function (req, res) {
  console.log("Port listen 3000");
});
