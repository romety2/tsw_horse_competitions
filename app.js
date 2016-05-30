/* jshint node: true, esnext: true */

var path = require('path');
var express = require('express');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
var routes = require('./routes');

var options = {
  key: fs.readFileSync('certifications/key.pem'),
  cert: fs.readFileSync('certifications/cert.crt')
};

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(require('serve-favicon')(__dirname + '/public/img/logo.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.get('/', routes.index);
app.get('/kontakt', routes.kontakt);
app.get('/zgloszenie', routes.zgloszenie);
app.get('/pobierzZas', routes.pobierzZg);
app.get('/Regulamin', routes.regulamin);
app.get('/zawodnicy', routes.zawodnicy);
app.get('/uzytkownicy', routes.uzytkownicy);
app.get('/zawodnicy/usun/:id', routes.usunZaw);

app.get('/pobierzWZaw', routes.pobierzWZaw);
app.get('/pobierzZaw/:id', routes.pobierzZaw);

app.post('/zawodnicy', routes.dodajZaw);
app.post('/uzytkownicy', routes.dodajUz);
app.post('/zawodnicy/edytuj/:id', routes.edytujZaw);

mongoose.connect('mongodb://localhost/Zawody'); 


https.createServer(options, app).listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});

/*app.listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});*/