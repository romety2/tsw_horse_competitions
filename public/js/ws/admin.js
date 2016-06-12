/* jshint browser: true, devel: true, jquery: true, esnext: true, node: true   */
/* global io: false */

var socket = io.connect(location.host);
    
var sendGroup = (text) => { socket.emit("przekazGrupe", text); };

var sendNS = (text) => { socket.emit("przekazNS", text); };

socket.on('connect', function () {
    });

socket.on('disconnect', function () {
    });

socket.on("error", function (err) {
    });