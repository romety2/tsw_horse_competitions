/* jshint node: true */
var path = require('path');
var express = require('express');
var http = require('http');
var port = process.env.PORT || 3000;

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
    console.log("Serwer nasłuchuje na porcie " + port);
});