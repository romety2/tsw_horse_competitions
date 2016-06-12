/* jshint browser: true, devel: true, jquery: true, esnext: true, node: true   */
/* global io: false */

var socket = io.connect(location.host);

socket.on('connect', function () {
        socket.emit("userJoin", 'dd');
    });

socket.on('disconnect', function () {
        socket.emit("userLeave");
    });

socket.on("error", function (err) {
    });
    
socket.on("echoPrzekazGrupe", function (g) {
        document.getElementById('nGr').innerHTML = g;
    });

socket.on("echoPrzekazNS", function (ns) {
        document.getElementById('nSt').innerHTML = ", Nr startowy: "+ns;
    });