/* jshint browser: true, devel: true, jquery: true, esnext: true, node: true   */
/* global io: false */

$(() => {
    var socket = io.connect(location.host);
    
    //var wg = document.getElementById('wybG');
    //var dg = document.getElementById('dodajG-button');

    socket.on('connect', function () {
    });

    socket.on('disconnect', function () {
    });

    socket.on("error", function (err) {
    });
    
    /*var SendSetting = () =>
    {
        $.ajax({
            url: "/pobierzZwNZak",
            method: 'GET',
            success: (data) => {
                socket.emit('setting', data.zakres, data.rodzaj);
            },
        }); 
    };

    wg.addEventListener('dblclick', SendSetting, false);
    dg.addEventListener('click', SendSetting, false);*/
});