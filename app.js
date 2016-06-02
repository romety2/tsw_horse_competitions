/* jshint node: true, esnext: true */

var path = require('path');
var express = require('express');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var connectRoles = require('connect-roles');

var app = express();
var routes = require('./routes');
var roles = require('./routes/roles');

var options = {
  key: fs.readFileSync('certifications/key.pem'),
  cert: fs.readFileSync('certifications/cert.crt')
};

var role = new connectRoles({
  failureHandler: function (req, res, action) {
    // optional function to customise code that runs when 
    // user fails authorisation 
    var accept = req.headers.accept || '';
    res.status(403);
    if (~accept.indexOf('html')) {
      res.render('access-denied', {action: action});
    } else {
      res.send('Access Denied - You don\'t have permission to: ' + action);
    }
  }
});

app.use(require('serve-favicon')(__dirname + '/public/img/logo.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({secret: process.env.SESSION_SECRET || 'secret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(role.middleware());

role.use(roles.home);
role.use(roles.authenticated );
role.use('access judge pages', roles.judge);
role.use('access administrator pages', roles.administrator);

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.get('/', routes.index);
app.get('/kontakt', routes.kontakt);
app.get('/zgloszenie', routes.zgloszenie);
app.get('/pobierzZas', routes.pobierzZg);
app.get('/logowanie', routes.logowanie);
app.get('/Regulamin', routes.regulamin);
app.get('/zawodnicy', role.can('access administrator pages'), routes.zawodnicy);
app.get('/uzytkownicy', role.can('access administrator pages'), routes.uzytkownicy);
app.get('/zawodnicy/usun/:id', routes.usunZaw);
app.get('/wyloguj', routes.wyloguj);

app.get('/pobierzWZaw', routes.pobierzWZaw);
app.get('/pobierzZaw/:id', routes.pobierzZaw);

app.post('/logowanie', passport.authenticate('local'), routes.zaloguj);
app.post('/zawodnicy', routes.dodajZaw);
app.post('/uzytkownicy', routes.dodajUz);
app.post('/zawodnicy/edytuj/:id', routes.edytujZaw);

mongoose.connect('mongodb://localhost/Zawody'); 

var User = require('./models/user');
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

https.createServer(options, app).listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});

/*app.listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});*/