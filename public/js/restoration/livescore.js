/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    {
        $.ajax({
            url: "/pobierzNazweIOpisNzNZak",
            method: 'GET',
            success: (data) => {
                var n = document.getElementById('nazwa');
                var o = document.getElementById('opis');
                if(data !== '')
                {
                       $(n).text(data.nazwa);
                       $(o).text(data.opis); 
                }
            },
        });
        
        $.ajax({
            url: "/pobierzRanking",
            method: 'GET',
            success: (data) => {
                var tb = document.getElementById('tabela');
                if(data !== '')
                {
                    for(let i = 0; i < data.length; i++)
                    {
                        $(tb).append("<tr class='temp'><td><b>"+data[i].miejsce+"</b></td><td>"+data[i].nazwa+"</td><td>"+data[i].hodowca+"</td><td>"+data[i].typ+"</td><td>"+data[i].glowa+"</td><td>"+data[i].kloda+"</td><td>"+data[i].nogi+"</td><td>"+data[i].ruch+"</td><td>"+data[i].wynik+"</td></tr>");
                    }
                }
            },
        }); 
    }
});