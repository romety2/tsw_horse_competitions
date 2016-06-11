/* jshint browser: true, devel: true, jquery: true, esnext: true, node: true   */
/* global io: false */

var socket = io.connect(location.host);
            
socket.on('connect', function () {
    console.log('Nawiązano połączenie przez Socket.io');
});

socket.on('disconnect', function () {
    console.log('Połączenie przez Socket.io zostało zakończone');
});