/* jshint node: true, esnext: true */

exports.index = (req, res) => {
    res.render('index');    
};

exports.kontakt = (req, res) =>  {
    res.render('pages/kontakt');    
};

exports.zgloszenie = (req, res) =>  {
    res.render('pages/zgloszenie');    
};

exports.pobierzZaw = (req, res) =>  {
    res.render('pages/zawodnicy');    
};

exports.pobierzZg = (req, res) =>  {
    res.download(__dirname + '/../public/file/zgloszenie.pdf');
};

exports.regulamin = (req, res) =>  {
    var fs = require('fs');
    var filePath = "/../public/file/regulamin.pdf";
    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
};

exports.dodajZaw = (req, res) => {
    var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/Zawody'); 
    var db = mongoose.connection;
    var Player = require('../models/player.js');
    var player = new Player(req.body);
    player.save();
    db.close();
    res.redirect('/zawodnicy');
};