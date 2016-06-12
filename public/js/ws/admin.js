/* jshint browser: true, devel: true, jquery: true, esnext: true, node: true   */
/* global io: false */

var socket = io.connect(location.host);
    
var sendGroup = (text, users) => { socket.emit("przekazGrupe", text, users); };

var sendNS = (text, users) => { socket.emit("przekazNS", text, users); };

var noneVoteError = (text, user) => { socket.emit("brakOcen", text, user); };

socket.on('connect', function () {
    });

socket.on('disconnect', function () {
    });

socket.on("error", function (err) {
    });

socket.on("echoPrzekazOcene", function (ocena, kategoria, uzytkownik) {
        console.log($("#"+uzytkownik+" ."+kategoria).text(ocena));
    });