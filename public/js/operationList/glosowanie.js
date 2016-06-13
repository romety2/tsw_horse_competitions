/* jshint browser: true, esnext: true, jquery: true, node: true */
/* globals sendGroup, sendNS, noneVoteError, sendRanking */

$(() => {
    var getPlayer = () =>
    {
        if(wg.value)
        {
            $.ajax({
                url: "/zmienStatusWG/"+wg.value,
                method: 'PUT',
                }); 
            $.ajax({
                url: "/pobierzSedziowWGr/"+wg.value,
                method: 'GET',
                success: (data) => {
                    $("#tabela .temp").remove();
                    var tb = document.getElementById('tabela');
                    for(let i = 0; i < data.length; i++)
                        $(tb).append("<tr id="+data[i].username+" class='temp'><td>"+data[i].imie+" "+data[i].nazwisko+"</td><td class='typ'></td><td class='glowa'></td><td class='kloda'></td><td class='nogi'></td><td class='ruch'></td></tr>");
                    },
                }); 
            $.ajax({
                url: "/pobierzLSZwNZakWGr/"+wg.value,
                method: 'GET',
                success: (data) => {
                    var z = document.getElementById('wybZ');
                    for(let i = 0; i < data.length; i++)
                        $(z).append("<option value='"+data[i]._zaw+"'>"+data[i].nrStartowy+". "+data[i].nazwa+", "+data[i].imie+" "+data[i].nazwisko+"</option>");
                    document.getElementById('nGr').innerHTML = wg.value;
                    $.ajax({
                        url: "/pobierzSedziowWGr/"+wg.value,
                        method: 'GET',
                        success: (data) => {
                            sendGroup(wg.value, data);
                            $('#wybG option')[wg.selectedIndex].remove();
                            wg.disabled = true;
                        },
                    });
                    },
                }); 
            }
    };
    
    var getNote = () =>
    {
        if(wz.value)
        {
            $.ajax({
                url: "/zmienStatusOc/"+wz.value,
                method: 'PUT',
            }); 
            
            document.getElementById('nZaw').innerHTML = wz.options[wz.selectedIndex].text;
            $.ajax({
                url: "/pobierzSedziowWGr/"+$('#nGr').text(),
                method: 'GET',
                success: (data) => {
                    sendNS(wz.options[wz.selectedIndex].text.substring(0, wz.options[wz.selectedIndex].text.indexOf('.')), data);
                    $('#wybZ option')[wz.selectedIndex].remove();
                },
            });
            wz.disabled = true;
            zo.disabled = false;
        }
    };
    
    var actionClickEndVote = () =>
    {
        var t = $('.temp');
        console.log(t);
        var tt = $('.temp .typ'), tg = $('.temp .glowa'), tk = $('.temp .kloda'), tn = $('.temp .nogi'), tr = $('.temp .ruch');
        var pm = $(document.getElementById('nZaw')).text().indexOf('.');
        var ns = $(document.getElementById('nZaw')).text().substring(0, pm);
        var ile = 0;
        if(sprOceny())
        {
            wz.disabled = false;
            if(wz.options.length === 0)
                wg.disabled = false;
            if(wg.options.length === 0)
                zz.disabled = false;
            zo.disabled = true;
            for(let i = 0; i < t.length; i++)
            {
                $.ajax({
                    url:"/zapiszOceny/"+$(tt[i]).text()+"/"+$(tg[i]).text()+"/"+$(tk[i]).text()+"/"+$(tn[i]).text()+"/"+$(tr[i]).text()+"/"+$(t)[i].id+'/'+ns,
                    method: 'PUT',
                }); 
                sendRanking($(tt[i]).text(), $(tg[i]).text(), $(tk[i]).text(), $(tn[i]).text(), $(tr[i]).text(), ns, $(t)[i].id);
                $(tt[i]).text('');
                $(tg[i]).text('');
                $(tk[i]).text('');
                $(tn[i]).text('');
                $(tr[i]).text('');
                $.ajax({
                    url: "/zmienStatusZak",
                    method: 'PUT',
                }); 
            }
            $(document.getElementById('nZaw')).text('');
        }
    };
    
    var sprOceny = () =>
    {
        var t = $('.temp');
        var v = true;
        var text = 'Ocenianie powinno zostać zakończone. Proszę wypełnić oceny za:';
        var tt = $('.temp .typ'), tg = $('.temp .glowa'), tk = $('.temp .kloda'), tn = $('.temp .nogi'), tr = $('.temp .ruch');
        for(let i = 0; i < t.length; i++)
        {
            if($(tt[i]).text().length === 0 ||
               $(tg[i]).text().length === 0 ||
               $(tk[i]).text().length === 0 ||
               $(tn[i]).text().length === 0 ||
               $(tr[i]).text().length === 0)
                {
                    v = false;
                    if($(tt[i]).text().length === 0)
                        text+=' TYP';
                    if($(tg[i]).text().length === 0)
                        text+=' GŁOWĘ';
                    if($(tk[i]).text().length === 0)
                        text+=' KŁODĘ';
                    if($(tn[i]).text().length === 0)
                        text+=' NOGI';
                    if($(tr[i]).text().length === 0)
                        text+=' RUCH';
                    noneVoteError(text, $(t)[i].id);
                }
        }
        return v;
    };
    
    var actionClickCompetition = () =>
    {
        $.ajax({
            url: "/pobierzStatusZwNZak",
            method: 'GET',
            success: () => { 
                $.ajax({
                    url: "/koniecZawodow",
                    method: 'PUT',
                });
                document.getElementById('wyjscie').click();
            },
        }); 
    };
    
    var wg = document.getElementById('wybG');
    var wz = document.getElementById('wybZ');
    var dg = document.getElementById('dodajG-button');
    var dz = document.getElementById('dodajZ-button');
    var zo = document.getElementById("zakOc");
    var zz = document.getElementById("zakZaw");
    dg.addEventListener('click', getPlayer, false);
    wg.addEventListener('dblclick', getPlayer, false);
    dz.addEventListener('click', getNote, false);
    wz.addEventListener('dblclick', getNote, false);
    zo.addEventListener('click', actionClickEndVote, false);
    zz.addEventListener('click', actionClickCompetition, false);
});