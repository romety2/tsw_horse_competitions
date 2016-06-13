/* jshint node: true, esnext: true */

var path = require('path');
var express = require('express');
var fs = require('fs');
var https = require('https');
var httpsServer;
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
var User = require('./models/user');

var socketIo;
var io;

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
role.use('access judge pages', roles.judge);
role.use('access administrator pages', roles.administrator);

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '127.0.0.1');

app.get('/', routes.index);
app.get('/kontakt', routes.kontakt);
app.get('/zgloszenie', routes.zgloszenie);
app.get('/pobierzZas', routes.pobierzZg);
app.get('/logowanie', routes.logowanie);
app.get('/livescore', routes.livescore);
app.get('/Regulamin', routes.regulamin);
app.get('/zawody', role.can('access administrator pages') , routes.zawody);
app.get('/grupy', role.can('access administrator pages'), routes.grupy);
app.get('/glosowanie', routes.glosowanie);
app.get('/zawodnicy', role.can('access administrator pages'), routes.zawodnicy);
app.get('/uzytkownicy', role.can('access administrator pages'), routes.uzytkownicy);
app.get('/zawodnicy/usun/:id', routes.usunZaw);
app.get('/uzytkownicy/usun/:id', routes.usunUz);
app.get('/ocenianie', role.can('access judge pages'), routes.ocenianie);
app.get('/wyloguj', routes.wyloguj);

app.get('/pobierzW', routes.pobierzW);
app.get('/pobierzZaw/:id', routes.pobierzZaw);
app.get('/pobierzUz/:id', routes.pobierzZaw);
app.get('/pobierzWZaw', routes.pobierzWZaw);
app.get('/pobierzZwNZak', routes.pobierzZwNZak);
app.get('/pobierzZwNDDZaw', routes.pobierzZwNDDZaw);
app.get('/pobierzLSZwNZak', routes.pobierzLSZwNZak);
app.get('/pobierzGrZwNZak', routes.pobierzGrZwNZak);
app.get('/pobierzSedziow', routes.pobierzSedziow);
app.get('/pobierzLSZwNZak/:grupa', routes.pobierzLSZwNZakPlecWgGr);
app.get('/pobierzLSZwNZakWGr/:grupa', routes.pobierzLSZwNZakGrWgGr);
app.get('/pobierzSedziowNWGr/:grupa', routes.pobierzSedziowNWGr);
app.get('/pobierzSedziowWGr/:grupa', routes.pobierzSedziowWGr);
app.get('/walidacjaGr', routes.walidacjaGr);
app.get('/pobUst', routes.pobUst);
app.get('/sprawdzCzyNieOceniam/:login', routes.sprCzyNieOceniam);
app.get('/pobierzGrNieUzyte', routes.pobierzGrNieUzyte);
app.get('/pobierzGrWUzyciu', routes.pobierzGrWUzyciu);
app.get('/pobierzNazweGrZLS/:id', routes.pobierzNazweGrZLS);
app.get('/pobierzNazweGrZLSWNS/:id', routes.pobierzNazweGrZLSWNS);
app.get('/pobierzOcenianegoLS', routes.pobierzOcenianegoLS);
app.get('/pobierzNazweIOpisNzNZak', routes.pobierzNazweIOpisNzNZak);
app.get('/pobierzRanking', routes.pobierzRanking);
app.get('/pobierzJeszczeRazRanking/:t/:g/:k/:n/:r/:ns/:l', routes.jeszczeRazRanking);
app.get('/pobierzStatusZwNZak', routes.pobierzStatusZwNZak);

app.post('/logowanie', passport.authenticate('local'), routes.zaloguj);
app.post('/zawodnicy', routes.dodajZaw);
app.post('/uzytkownicy', routes.dodajUz);
app.post('/zawodnicy/edytuj/:id', routes.edytujZaw);
app.post('/uzytkownicy/edytuj/:id', routes.edytujUz);
app.post('/dodajLS', routes.dodajLS);
app.post('/dodajGr', routes.dodajGr);
app.post('/grupy', routes.zmienZawGrupa);

app.put('/edytujZawody/:pole', routes.edytujZw);
app.put('/wstawGr/:id', routes.wstawGr);
app.put('/usunGr/:id', routes.usunGr);
app.put('/wstawSedz/:grupa', routes.wstawSedz);
app.put('/usunSedz/:grupa', routes.usunSedz);
app.put('/zmienKolNS/:id1/:id2', routes.zmienKolNS);
app.put('/glosowanie', routes.zmienZawGlos);
app.put('/zmienStatusWG/:nazwa', routes.zmienStatusWG);
app.put('/zmienStatusOc/:id', routes.zmienStatusOc);
app.put('/zmienStatusZak/', routes.zmienStatusZak);
app.put('/zapiszOceny/:t/:g/:k/:n/:r/:sedzia/:ns', routes.zapiszOceny);
app.put('/koniecZawodow', routes.koniecZawodow);

app.delete('/usunLS/:id', routes.usunLS);
app.delete('/usunGr2/:nazwa', routes.usunGr2);


mongoose.connect('mongodb://localhost/Zawody');
require('./models/notes');
require('./models/group');
require('./models/startingList');
require('./models/competition');
require('./models/player');
require('./models/user');

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

httpsServer = https.createServer(options, app);

socketIo = require("socket.io");
io = socketIo.listen(httpsServer);

httpsServer.listen(app.get('port'), app.get('host'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});

/*app.listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});*/

io.sockets.on("connection", function (socket) {
    socket.on("userJoin", function (j) {
        if(socket.dolaczyl)
            socket.leave(socket.dolaczyl);
        socket.dolaczyl = j;
        socket.join(j);
    });
    socket.on("userLeave", function () {
        socket.leave(socket.dolaczyl);
    });
    socket.on("przekazGrupe", function(g, users){
        var i;
        for(i = 0; i < users.length; i++)
            socket.broadcast.to(users[i].username).emit("echoPrzekazGrupe", g);
    });
    socket.on("przekazNS", function(g, users){
        var i;
        for(i = 0; i < users.length; i++)
            socket.broadcast.to(users[i].username).emit("echoPrzekazNS", g);
    });
    socket.on("przekazOcene", function (ocena, kategoria, uzytkownik) {
            socket.broadcast.emit("echoPrzekazOcene", ocena, kategoria, uzytkownik);
    });
    socket.on("brakOcen", function(text, user){
        socket.broadcast.to(user).emit("echoPokazKomunikat", text);
    });
    
    socket.on("ranking", function(t, g, k, n, r, ns, l){
        socket.broadcast.emit("echoRanking", t, g, k, n, r, ns, l);
    });
});