/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    var lg = document.getElementById('listaGr');
    var addGroup = () =>
    {
        var plec = $('input[name="plec"]:checked').val();
        if(ng.poprabo)
            ng++;
        else
        {
            ng.pobrano = true;
            ng = $('#listaGr option').length+1;
        }
        $.ajax({
            url: '/dodajGr',
            method: 'POST',
            data: {nazwa: 'Grupa '+ng, plec: plec},
        });
        $(lg).append("<option value='Grupa '"+ng+"'>Grupa "+ng+"</option>");
    };
    
    var ng = 0;
    var dg = document.getElementById('dodajG-button'); 
    dg.addEventListener('click', addGroup, false);
});