const express = require("express")

const app = express();


app.get("/", function(req,res){

    res.send("Server runs")
})

app.listen(3000, function(req,res){
    console.log('Port listen 3000')

})