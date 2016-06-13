/* jshint browser: true, devel: true, jquery: true, esnext: true, node: true   */
/* global io: false */

var socket = io.connect(location.host);

socket.on('connect', function () {
    });

socket.on('disconnect', function () {
    });

socket.on("error", function (err) {
    });

socket.on("echoRanking", function (t, g, k, n, r, ns, l) {
        console.log($('#tabela .temp'));
        $.ajax({
            url: "/pobierzJeszczeRazRanking/"+t+'/'+g+'/'+k+'/'+n+'/'+r+'/'+ns+'/'+l,
            method: 'GET',
            success: (data) => {
                console.log(data);
                console.log($('#tabela .temp'));
                var tb = document.getElementById('tabela');
                if(data !== '')
                {
                    $('#tabela .temp').remove();
                    for(let i = 0; i < data.length; i++)
                    {
                        $(tb).append("<tr class='temp'><td><b>"+data[i].miejsce+"</b></td><td>"+data[i].nazwa+"</td><td>"+data[i].hodowca+"</td><td>"+data[i].typ+"</td><td>"+data[i].glowa+"</td><td>"+data[i].kloda+"</td><td>"+data[i].nogi+"</td><td>"+data[i].ruch+"</td><td>"+data[i].wynik+"</td></tr>");
                    }
                }
            },
        }); 
    });