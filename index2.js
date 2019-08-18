const express = require("express");

const app = express();

const request = require("request");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post('/', function(req, res){
  var baseUrl = "https://apiv2.bitcoinaverage.com/convert/global";

  var crypto = req.body.crypto;

  var fiat = req.body.fiat;

  var amount = req.body.amount;

  var options = {
    url: baseUrl,
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body){
    var data = JSON.parse(body);
    var price = data.price;
    var timeStamp = data.time;

    res.write("<p> The current time is " + timeStamp + "</p>");
    res.write("<h1>" + amount + " " + crypto + " is current worth of " + price + " " + fiat + "</h1>")
    res.send();
  });
});
app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
