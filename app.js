const express = require("express")

const https = require("https");

const app = express();


app.get("/", function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Athens&appid=4a20317e712c6b1a261f29900e05869e&units=metric"
    
    https.get(url, function(response){
        console.log(response)
    })
    
    
    res.send("Server runs")

})

app.listen(3000, function(req,res){
    console.log('Port listen 3000')

})