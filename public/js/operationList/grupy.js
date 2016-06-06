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
        $(lg).append("<option value='Grupa "+ng+"'>Grupa "+ng+"</option>");
    };
    
    var informationGroup = () =>
    {
        var ng = document.getElementById('nazwa-grupy');
        var lg = document.getElementById('listaGr');
        if(lg.value)
        {
            ng.innerHTML = lg.value;
            $.ajax({
                url: "/pobierzLSZwNZak/"+lg.value,
                method: 'GET',
                success: (data) => {
                    $("#wybZ option").remove();
                    var s = document.getElementById('wybZ');
                    for(let i = 0; i < data.length; i++)
                    $(s).append("<option value='"+data[i]._zaw+"'>"+data[i].nrStartowy+". "+data[i].nazwa+", "+data[i].imie+" "+data[i].nazwisko+"</option>");
                },
            }); 
            $.ajax({
                url: "/pobierzSedziow",
                method: 'GET',
                success: (data) => {
                    $("#wybS option").remove();
                    var s = document.getElementById('wybS');
                    for(let i = 0; i < data.length; i++)
                    $(s).append("<option value='"+data[i].username+"'>"+data[i].imie+" "+data[i].nazwisko+"</option>");
                },
            }); 
        }
    };
    
    var ng = 0;
    var dg = document.getElementById('dodajG-button');
    var pg = document.getElementById('pokazG-button');
    dg.addEventListener('click', addGroup, false);
    pg.addEventListener('click', informationGroup, false);
});