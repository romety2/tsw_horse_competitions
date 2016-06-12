/* jshint browser: true, devel: true, jquery: true, esnext: true, node: true   */
/* global io: false */

$(() => {
    var socket = io.connect(location.host);
    
    /*var st = document.getElementById('STyp');
    var sg = document.getElementById('SGlowa');
    var sk = document.getElementById('SKloda');
    var sn = document.getElementById('SNogi');
    var sr = document.getElementById('SRuch');*/

    socket.on('connect', function () {
    });

    socket.on('disconnect', function () {
    });

    socket.on("error", function (err) {
    });
    
    socket.on("echoSetting", function (zakres, rodzaj)  {
        /*if(zakres === '10')
        {
            st.setAttribute("data-slider-max", '10');
            sg.setAttribute("data-slider-max", '10');
            sk.setAttribute("data-slider-max", '10');
            sn.setAttribute("data-slider-max", '10');
            sr.setAttribute("data-slider-max", '10');
        }
        else
        {
            st.setAttribute("data-slider-max", '20');
            sg.setAttribute("data-slider-max", '20');
            sk.setAttribute("data-slider-max", '20');
            sn.setAttribute("data-slider-max", '20');
            sr.setAttribute("data-slider-max", '20');
        }
        if(rodzaj === 'c')
        {
            st.setAttribute("data-slider-step", '1');
            sg.setAttribute("data-slider-step", '1');
            sk.setAttribute("data-slider-step", '1');
            sn.setAttribute("data-slider-step", '1');
            sr.setAttribute("data-slider-step", '1');
        }
        else
        {
            st.setAttribute("data-slider-step", '0.5');
            sg.setAttribute("data-slider-step", '0.5');
            sk.setAttribute("data-slider-step", '0.5');
            sn.setAttribute("data-slider-step", '0.5');
            sr.setAttribute("data-slider-step", '0.5');
        }*/
    });
});