var app     = require('express')();
var request = require('request');
var responseMessage;

function replyToClient(temp, message, res) {
  var reply = "got it " + temp + "\n" + message;
  console.log("request received - responding with: ", reply);
  res.status(200).send(reply);
}

app.all('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  var options = {
    uri: 'http://services.wine.com/api/beta/service.svc/json/catalog?filter=categories(490+101)&apikey=',
    method: 'GET'
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      replyToClient(temp, body, res);
    }
  });
});

app.listen(3000, '0.0.0.0');
