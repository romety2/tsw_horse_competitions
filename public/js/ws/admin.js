/* jshint browser: true, devel: true, jquery: true, esnext: true, node: true   */
/* global io: false */

var socket = io.connect(location.host);
    
var sendGroup = (text, users) => { socket.emit("przekazGrupe", text, users); };

var sendNS = (text, users) => { socket.emit("przekazNS", text, users); };

var noneVoteError = (text, user) => { socket.emit("brakOcen", text, user); };

var sendRanking = (t, g, k, n, r, ns, l) => { socket.emit("ranking", t, g, k, n, r, ns, l); };

socket.on('connect', function () {
    });

socket.on('disconnect', function () {
    });

socket.on("error", function (err) {
    });

socket.on("echoPrzekazOcene", function (ocena, kategoria, uzytkownik) {
        $("#"+uzytkownik+" ."+kategoria).text(ocena);
    });