/* jshint node: true */
var path = require('path');
var express = require('express');
var http = require('http');
var app = express();

//app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

var routes = require('./routes');

app.get('/', routes.index);

app.use(require('body-parser').urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});