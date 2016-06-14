/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
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
        $(lg).append("<option value='Grupa "+ng+"'>Grupa "+ng+" ("+plec+")</option>");
    };
    
    var deleteGroup = () =>
    {
        var ng = document.getElementById('nazwa-grupy');
        var lgo = $('#listaGr option');
        if(lg.value)
        {
            $.ajax({
                url: '/usunGr2/'+lg.value,
                method: 'DELETE',
            });
            for(let i = lg.selectedIndex+1; i < lgo.length; i++)
            {
                let pmP = lg.options[i].text.indexOf(' ');
                let pmS = lg.options[i].text.indexOf(' ', pmP+1);
                lg.options[i].text=lg.options[i].text.substring(0, pmP+1)+(parseInt(lg.options[i].text.substring(pmP, pmS)-1).toString())+lg.options[i].text.substring(pmS); 
                lg.options[i].value=lg.options[i].value.substring(0, pmP+1)+(parseInt(lg.options[i].value.substring(pmP))-1).toString();     
            }
            $('#listaGr option')[lg.selectedIndex].remove();
            $("#wybS option").remove();
            $("#wybSS option").remove();
            $("#wybZ option").remove();
            $("#wybZZ option").remove();
            ng.innerHTML = 'Grupa';
        }
    };
    
    var informationGroup = () =>
    {
        var ng = document.getElementById('nazwa-grupy');
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
                url: "/pobierzSedziowNWGr/"+lg.value,
                method: 'GET',
                success: (data) => {
                    $("#wybS option").remove();
                    var s = document.getElementById('wybS');
                    for(let i = 0; i < data.length; i++)
                        $(s).append("<option value='"+data[i]._id+"'>"+data[i].imie+" "+data[i].nazwisko+" ("+data[i].username+")"+"</option>");
                },
            }); 
            $.ajax({
                url: "/pobierzSedziowWGr/"+lg.value,
                method: 'GET',
                success: (data) => {
                    $("#wybSS option").remove();
                    var s = document.getElementById('wybSS');
                    for(let i = 0; i < data.length; i++)
                        $(s).append("<option value='"+data[i]._id+"'>"+data[i].imie+" "+data[i].nazwisko+" ("+data[i].username+")</option>");
                },
            }); 
        }
    };
    
    var addPlayer = () =>
    {
        var ng = document.getElementById('nazwa-grupy');
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
        var ng = document.getElementById('nazwa-grupy');
        if(ws.value)
            {
                $(wws).append("<option value='"+ws.value+"'>"+ws.options[ws.selectedIndex].text+"</option>");
                $.ajax({
                    url: '/wstawSedz/'+$(ng).text(),
                    method: 'PUT',
                    data: {sedz: ws.value},
                });
                $('#wybS option')[ws.selectedIndex].remove();
            }
    };

    var delJudge = () =>
    {
        var ng = document.getElementById('nazwa-grupy');
        if(wws.value)
            {
                $(ws).append("<option value='"+wws.value+"'>"+wws.options[wws.selectedIndex].text+"</option>");
                $.ajax({
                    url: '/usunSedz/'+$(ng).text(),
                    method: 'PUT',
                    data: {sedz: wws.value},
                });
                $('#wybSS option')[wws.selectedIndex].remove();
            }
    };
    
    var actionBack = () =>
    {
        $.ajax({
            url: "/pobierzStatusZwNZak",
            method: 'GET',
            success: () => { 
                $.ajax({
                    url: "/wrocZawody",
                    method: 'PUT',
                });
                document.getElementById('pWroc').click();
            },
        }); 
    };
    
    var ng = 0;
    var lg = document.getElementById('listaGr');
    var wz = document.getElementById('wybZ');
    var wwz = document.getElementById('wybZZ');
    var ws = document.getElementById('wybS');
    var wws = document.getElementById('wybSS');
    var dg = document.getElementById('dodajG-button');
    var ug = document.getElementById('usunG-button');
    var pg = document.getElementById('pokazG-button');
    var dz = document.getElementById('dodajZ-button');
    var uz = document.getElementById('usunZ-button');
    var ds = document.getElementById('dodajS-button');
    var us = document.getElementById('usunS-button');
    var wb = document.getElementById('wroc-button');
    dg.addEventListener('click', addGroup, false);
    ug.addEventListener('click', deleteGroup, false);
    pg.addEventListener('click', informationGroup, false);
    dz.addEventListener('click', addPlayer, false);
    uz.addEventListener('click', delPlayer, false);
    ds.addEventListener('click', addJudge, false);
    us.addEventListener('click', delJudge, false);
    lg.addEventListener('dblclick', informationGroup, false);
    wz.addEventListener('dblclick', addPlayer, false);
    wwz.addEventListener('dblclick', delPlayer, false);
    ws.addEventListener('dblclick', addJudge, false);
    wws.addEventListener('dblclick', delJudge, false);
    wb.addEventListener('click', actionBack, false);
});