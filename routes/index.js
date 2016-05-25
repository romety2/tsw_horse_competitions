/* jshint node: true */

exports.index = function (req, res) {
    res.render('index');    
};

exports.kontakt = function (req, res) {
    res.render('pages/kontakt');    
};

exports.zgloszenie = function (req, res) {
    res.render('pages/zgloszenie');    
};

exports.pobierzZg =  function (req, res) {
    res.download(__dirname + '/../public/file/zgloszenie.pdf');
};

exports.regulamin =  function (req, res) {
    var fs = require('fs');
    var filePath = "/../public/file/regulamin.pdf";
    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
};