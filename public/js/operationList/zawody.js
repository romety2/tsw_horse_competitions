/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    
    var addPlayer = () =>
    {
        if(s.value)
            {
            $.ajax({
                    url: '/pobierzZaw/'+s.value,
                    method: 'GET',
                    success: function(data){
                        if(ns.pobrano)
                            ns++;
                        else
                        {
                            ns.pobrano = true;
                            ns = $('#listaSt option').length+1;
                        }
                        $(ls).append("<option value='"+data._id+"'>"+ns+". "+data.nazwa+", "+data.imie+" "+data.nazwisko+"</option>");
                        $('#wyb option')[s.selectedIndex].remove();
                        $.ajax({
                            url: '/dodajLS',
                            method: 'POST',
                            data: {_zaw: data._id, _gr: data._id, imie: data.imie, nazwisko: data.nazwisko, nazwa: data.nazwa, plec: data.plec, nrStartowy: ns},
                        });
                    },
                });
            }
    };
    
    var deletePlayer = () =>
    {
        var lso = $('#listaSt option');
        if(ls.value)
        {
            $.ajax({
                url: '/usunLS/'+ls.value,
                method: 'DELETE',
            });
            $.ajax({
                url: '/pobierzZaw/'+ls.value,
                method: 'GET',
                success: function(data){
                    $(s).append("<option value='"+data._id+"'>"+data.nazwa+" ("+data.plec+"), "+data.imie+" "+data.nazwisko+"</option>");
                },
            });
            for(let i = ls.selectedIndex+1; i < lso.length; i++)
            {
                let pm = ls.options[i].text.indexOf('.');
                ls.options[i].text=(parseInt(ls.options[i].text.substring(0, pm)-1).toString())+ls.options[i].text.substring(pm);
                
            }
            $('#listaSt option')[ls.selectedIndex].remove();
        }
    };

    var ns = 0;
    var db = document.getElementById('dodaj-button'); 
    var ub = document.getElementById('usun-button'); 
    var s = document.getElementById('wyb');
    var ls = document.getElementById('listaSt');
    db.addEventListener('click', addPlayer, false);
    ub.addEventListener('click', deletePlayer, false);
    s.addEventListener('dblclick', addPlayer, false);
    ls.addEventListener('dblclick', deletePlayer, false);
    ns.pobrano = false;
});