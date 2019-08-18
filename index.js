const express = require("express");

const app = express();

const request = require("request");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post('/', function(req, res){

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var currency = crypto + fiat;

  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/"+currency , function(error, response, body){
    var data = JSON.parse(body);
    var price = data.last;

    var timeStamp = data.display_timestamp;
    res.write("<p> The current date is " + timeStamp + "</p>");
    res.write("<h1> The current value of " + crypto + " is " + price + " " + fiat + "</h1>")
    res.send();
  });
});
app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
