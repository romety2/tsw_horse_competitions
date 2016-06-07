/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    var lg = document.getElementById('listaGr');
    var addGroup = () =>
    {
        var plec = $('input[name="plec"]:checked').val();
        if(ng.pobrano)
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
                url: "/pobierzLSZwNZakWGr/"+lg.value,
                method: 'GET',
                success: (data) => {
                    $("#wybZZ option").remove();
                    var s = document.getElementById('wybZZ');
                    for(let i = 0; i < data.length; i++)
                        $(s).append("<option value='"+data[i]._zaw+"'>"+data[i].nrStartowy+". "+data[i].nazwa+", "+data[i].imie+" "+data[i].nazwisko+"</option>");
                },
            }); 
            $.ajax({
                url: "/pobierzSedziow",
                method: 'GET',
                success: (data) => {
                    $("#wybS option").remove();
                    $("#wybSS option").remove();
                    var s = document.getElementById('wybS');
                    for(let i = 0; i < data.length; i++)
                        $(s).append("<option value='"+data[i].username+"'>"+data[i].imie+" "+data[i].nazwisko+"</option>");
                },
            }); 
        }
    };
    
    var addPlayer = () =>
    {
        var ng = document.getElementById('nazwa-grupy');
        var wz = document.getElementById('wybZ');
        var wwz = document.getElementById('wybZZ');
        if(wz.value)
            {
                $(wwz).append("<option value='"+wz.value+"'>"+wz.options[wz.selectedIndex].text+"</option>");
                $.ajax({
                    url: '/wstawGr/'+wz.value,
                    method: 'PUT',
                    data: {_gr: $(ng).text()},
                });
                $('#wybZ option')[wz.selectedIndex].remove();
            }
    };
    
    var delPlayer = () =>
    {
        var wz = document.getElementById('wybZ');
        var wwz = document.getElementById('wybZZ');
        if(wwz.value)
            {
                $(wz).append("<option value='"+wwz.value+"'>"+wwz.options[wwz.selectedIndex].text+"</option>");
                $.ajax({
                    url: '/usunGr/'+wwz.value,
                    method: 'PUT',
                });
                $('#wybZZ option')[wwz.selectedIndex].remove();
            }
    };
    
    var addJudge = () =>
    {
        var lg = document.getElementById('listaGr');
        var ws = document.getElementById('wybS');
        var wws = document.getElementById('wybSS');
        if(ws.value)
            {
                $(wws).append("<option value='"+ws.value+"'>"+ws.options[ws.selectedIndex].text+"</option>");
                $('#wybS option')[ws.selectedIndex].remove();
                $.ajax({
                    url: '/wstawGr',
                    method: 'PUT',
                    data: {_gr: ws.value},
                });
            }
    };

    var delJudge = () =>
    {
        var lg = document.getElementById('listaGr');
        var ws = document.getElementById('wybS');
        var wws = document.getElementById('wybSS');
        if(wws.value)
            {
                $(ws).append("<option value='"+wws.value+"'>"+wws.options[wws.selectedIndex].text+"</option>");
                $('#wybSS option')[wws.selectedIndex].remove();
                /*$.ajax({
                    url: '/wstawGr',
                    method: 'PUT',
                    data: {_gr: data._id},
                });*/
            }
    };
    
    var ng = 0;
    var dg = document.getElementById('dodajG-button');
    var pg = document.getElementById('pokazG-button');
    var dz = document.getElementById('dodajZ-button');
    var uz = document.getElementById('usunZ-button');
    var ds = document.getElementById('dodajS-button');
    var us = document.getElementById('usunS-button');
    dg.addEventListener('click', addGroup, false);
    pg.addEventListener('click', informationGroup, false);
    dz.addEventListener('click', addPlayer, false);
    uz.addEventListener('click', delPlayer, false);
    ds.addEventListener('click', addJudge, false);
    us.addEventListener('click', delJudge, false);
});