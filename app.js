const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const cityName = req.body.cityName;
  const appid = "4a20317e712c6b1a261f29900e05869e";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" + appid +
    "&units=metric";

  https.get(url, function (response) {
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
      console.log("Temperature in Athens is: " + temp);
      console.log("It is: " + desc);

      // get the weather icon
      const icon_url_start = "http://openweathermap.org/img/wn/";
      const icon_url_end = "@2x.png";
      const icon_url_data = weatherData.weather[0].icon;
      const icon_url = icon_url_start + icon_url_data + icon_url_end;

      res.send(
        "<h3> Temperature in " + cityName +" is: " +
          temp +
          "</h3>" +
          "<h4> The weather is : " +
          desc +
          "</h4> " +
          '<br> <img src="' +
          icon_url +
          '" alt="Weather Icon" height="120">'
      );
    });
  });

  // cannot send twice in teh same get method
  //res.send("Server runs")
});

//
app.listen(3000, function (req, res) {
  console.log("Port listen 3000");
});
