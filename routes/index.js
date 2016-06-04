/* jshint node: true, esnext: true */

var temp;
var zw;
var passport = require('passport');

exports.index = (req, res) => {
    res.render('index', { user : req.user, login: req.isAuthenticated() });    
};

exports.kontakt = (req, res) =>  {
    res.render('pages/kontakt', { user : req.user, login: req.isAuthenticated() });    
};

exports.zgloszenie = (req, res) =>  {
    res.render('pages/zgloszenie', { user : req.user, login: req.isAuthenticated() });    
};

exports.pobierzZg = (req, res) =>  {
    res.download(__dirname + '/../public/file/zgloszenie.pdf');
};

exports.regulamin = (req, res) =>  {
    openPDF("/../public/file/regulamin.pdf", res);
};

exports.logowanie = (req, res) =>  {
    res.render('pages/logowanie', { user : req.user, login: req.isAuthenticated() });
};

exports.zaloguj = (req, res) =>  {
    res.redirect('/');
};

exports.wyloguj = (req, res) =>  {
    req.logout();
    res.redirect('/');
};

exports.zawody = (req, res) =>  {
    readAll('../models/player.js');
    readZwNZak('../models/competition.js');
    res.render('pages/zawody', { user : req.user, login: req.isAuthenticated() });   
};

exports.zawodnicy = (req, res) =>  {
    readAll('../models/player.js');
    res.render('pages/zawodnicy', { user : req.user, login: req.isAuthenticated() });   
};

exports.uzytkownicy = (req, res) =>  {
    readAll('../models/user.js');
    res.render('pages/uzytkownicy', { user : req.user, login: req.isAuthenticated() });   
};

exports.dodajZaw = (req, res) => {
    create(req.body, '../models/player.js');
    res.redirect('/zawodnicy');
};

exports.dodajUz = (req, res) => {
    createUser(req.body, '../models/user.js', '/uzytkownicy', req, res);
};

exports.pobierzW = (req, res) =>  {
    res.json(pob());
};

exports.pobierzZaw = (req, res) =>  {
    res.json(read(req.params.id));
};

exports.pobierzUz = (req, res) =>  {
    res.json(read(req.params.id));
};

exports.pobierzZwNZak = (req, res) =>  {
    res.json(pobZwNZak());
};

exports.edytujZaw = (req, res) =>  {
    update(req.params.id, req.body, '../models/player.js');
    res.redirect('/zawodnicy');
};

exports.edytujUz = (req, res) =>  {
    update(req.params.id, req.body, '../models/user.js');
    res.redirect('/uzytkownicy');
};

exports.edytujZw =(req, res) => {
    updateColumn(req.body.dana, req.params.pole, '../models/competition.js');
};

exports.usunZaw = (req, res) =>  {
    delete2(req.params.id, '../models/player.js');
    res.redirect('/zawodnicy');
};

exports.usunUz = (req, res) =>  {
    delete2(req.params.id, '../models/user.js');
    res.redirect('/uzytkownicy');
};

var openPDF = (fp, res) => {
    var fs = require('fs');
    var filePath = fp;
    fs.readFile(__dirname + filePath ,  (err,data) => {
        res.contentType("application/pdf");
        res.send(data);
    });
};

var create = (object, schema) => {
    var O = require(schema);
    var o = new O(object);
    o.save();
};

var read = (id) => {
    var underscore = require('underscore');
    return underscore.find(temp, (t) => { return t._id.toString() === id; });
};

var readAll = (schema) => {
    var O = require(schema);
    O.find((err, o) => {
        temp = o;
    });
};


var readZwNZak = (schema) => {
    var O = require(schema);
    O.find((err, o) => {
        var underscore = require('underscore');
        zw = underscore.find(o, () => { return o.etap !== 'zakonczone'; }) ||
            create({wydarzenie: '', opis: '', zakres: '10', rodzaj: 'c', etap: 'tworzenie'}, '../models/competition.js');
            underscore.find(o, () => {return o.etap !== 'zakonczone';
        });
    });
};
var update = (id, object, schema) => {
    var O = require(schema);
    O.update({_id: id}, {$set: object}, () => {});    
};

var delete2 = (id, schema) => {
    var O = require(schema);
    O.remove(O.find({_id: id})).exec();
};

var pob = () => {
    var underscore = require("underscore");
    return underscore.sortBy(temp, temp.nazwa || temp.username);
};

var pobZwNZak = () => {
    return zw;
};

var createUser = (object, schema, redirect, req, res) => {
    var User = require(schema);
    User.register(new User({imie : object.imie, nazwisko: object.nazwisko, username: object.username, role: object.role}), object.password, (err, user) => {
        if (err)
            return res.render('pages/uzytkownicy', { user : user });
    res.redirect(redirect);
    });
};

var updateColumn = (value, poleID, schema) => {
    var O = require(schema);
    if(poleID==="wydarzenieZ")
        O.update({_id: zw._id}, {$set: {wydarzenie: value}}, () => {});  
    else if(poleID==="opisZ")
        O.update({_id: zw._id}, {$set: {opis: value}}, () => {});  
    else if(poleID==="radio1Z")
        O.update({_id: zw._id}, {$set: {zakres: value}}, () => {});  
    else if(poleID==="radio2Z")
        O.update({_id: zw._id}, {$set: {zakres: value}}, () => {});  
    else if(poleID==="radio1R")
        O.update({_id: zw._id}, {$set: {rodzaj: value}}, () => {});  
    else if(poleID==="radio2R")
        O.update({_id: zw._id}, {$set: {rodzaj: value}}, () => {});  
};