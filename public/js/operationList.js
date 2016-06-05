/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    
    var addPlayer = () =>
    {
        var s = document.getElementById('wyb');
        var ls = document.getElementById('listaSt');
        var ns = $('#listaSt option').length+1;
        if(s.value)
            $.ajax({
            url: '/pobierzZaw/'+s.value,
            method: 'GET',
            success: function(data){
                $(ls).append("<option value='"+data._id+"'>"+ns+". "+data.nazwa+", "+data.imie+" "+data.nazwisko+"</option>");
                $('#wyb option')[s.selectedIndex].remove();
                $.ajax({
                    url: '/dodajLS',
                    method: 'POST',
                    data: {_zaw: data._id, imie: data.imie, nazwisko: data.nazwisko, nazwa: data.nazwa, plec: data.plec, nrStartowy: ns},
                });
            },
        });
    };
    
    var deletePlayer = () =>
    {
        var s = document.getElementById('wyb');
        var ls = document.getElementById('listaSt');
        $.ajax({
            url: '/usunLS/'+ls.value,
            method: 'DELETE',
        });
        var ns = $('#listaSt option').length+1;
        $('#listaSt option')[ls.selectedIndex].remove();
    };
    
    var db = document.getElementById('dodaj-button'); 
    var ub = document.getElementById('usun-button'); 
    db.addEventListener('click', addPlayer, false);
    ub.addEventListener('click', deletePlayer, false);
});