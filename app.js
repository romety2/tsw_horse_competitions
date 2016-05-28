/* jshint node: true, esnext: true */
var path = require('path');
var express = require('express');
var fs = require('fs');
var https = require('https');

var app = express();
var routes = require('./routes');

const options = {
  key: fs.readFileSync('certifications/key.pem'),
  cert: fs.readFileSync('certifications/cert.crt')
};

//app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.get('/', routes.index);
app.get('/kontakt', routes.kontakt);
app.get('/zgloszenie', routes.zgloszenie);
app.get('/zawodnicy', routes.admzaw);
app.get('/pobierzZas', routes.pobierzZg);
app.get('/Regulamin', routes.regulamin);

app.use(require('serve-favicon')(__dirname + '/public/img/logo.ico'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


https.createServer(options, app).listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});

/*app.listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});*/