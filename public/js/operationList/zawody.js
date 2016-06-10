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
                ls.options[i].text=((parseInt(ls.options[i].text.substring(0, pm))-1).toString())+ls.options[i].text.substring(pm);
                
            }
            $('#listaSt option')[ls.selectedIndex].remove();
        }
    };
    
    var updateNSUp = () =>
    {
        var lso = $('#listaSt option');
        var i, pm, pm2, l1 = {text: '', value: ''}, l2 = {text: '', value: ''}, sv;
        if(ls.value)
        {
            i = ls.selectedIndex;
            if(i > 0)
            {
                pm = ls.options[i].text.indexOf('.');
                pm2 = ls.options[i-1].text.indexOf('.');
                l1.text=((parseInt(ls.options[i].text.substring(0, pm))-1).toString())+ls.options[i].text.substring(pm);
                l2.text=((parseInt(ls.options[i-1].text.substring(0, pm))+1).toString())+ls.options[i-1].text.substring(pm2);
                l1.value=ls.options[i].value;
                l2.value=ls.options[i-1].value;
                ls.options[i-1].text = l1.text;
                ls.options[i].text = l2.text;
                ls.options[i-1].value = l1.value;
                ls.options[i].value = l2.value;
                ls.selectedIndex = -1;
                ls.selectedIndex = i-1;
                $.ajax({
                    url: '/zmienKolNS/'+ls.options[i-1].value+'/'+ls.options[i].value,
                    method: 'PUT',
                });
            }
        }
    };
    
    var updateNSDown = () =>
    {
        var lso = $('#listaSt option');
        var i, pm, pm2, l1 = {text: '', value: ''}, l2 = {text: '', value: ''}, sv;
        if(ls.value)
        {
            i = ls.selectedIndex;
            if(i < ls.length - 1)
            {
                pm = ls.options[i].text.indexOf('.');
                pm2 = ls.options[i+1].text.indexOf('.');
                l1.text=((parseInt(ls.options[i].text.substring(0, pm))+1).toString())+ls.options[i].text.substring(pm);
                l2.text=((parseInt(ls.options[i+1].text.substring(0, pm))-1).toString())+ls.options[i+1].text.substring(pm2);
                l1.value=ls.options[i].value;
                l2.value=ls.options[i+1].value;
                ls.options[i+1].text = l1.text;
                ls.options[i].text = l2.text;
                ls.options[i+1].value = l1.value;
                ls.options[i].value = l2.value;
                ls.selectedIndex = -1;
                ls.selectedIndex = i+1;
                $.ajax({
                    url: '/zmienKolNS/'+ls.options[i].value+'/'+ls.options[i+1].value,
                    method: 'PUT',
                });
            }
        }
    };

    var ns = 0;
    var db = document.getElementById('dodaj-button'); 
    var ub = document.getElementById('usun-button'); 
    var s = document.getElementById('wyb');
    var ls = document.getElementById('listaSt');
    var ngb = document.getElementById('nrG-button');
    var ndb = document.getElementById('nrD-button');
    db.addEventListener('click', addPlayer, false);
    ub.addEventListener('click', deletePlayer, false);
    ngb.addEventListener('click', updateNSUp, false);
    ndb.addEventListener('click', updateNSDown, false);
    s.addEventListener('dblclick', addPlayer, false);
    ls.addEventListener('dblclick', deletePlayer, false);
    ns.pobrano = false;
});