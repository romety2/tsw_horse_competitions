/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    {
        $.ajax({
            url: "/pobierzGrZwNZak",
            method: 'GET',
            success: (data) => {
                console.log('lol');
                var s = document.getElementById('listaGr');
                for(let i = 0; i < data.length; i++)
                    $(s).append("<option value='"+data[i].nazwa+"'>"+data[i].nazwa+"</option>");
            },
        }); 
    }
});