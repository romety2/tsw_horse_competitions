/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    var getPlayer = () =>
    {
        $.ajax({
            url: "/pobierzLSZwNZakWGr/"+wg.value,
            method: 'GET',
            success: (data) => {
                var z = document.getElementById('wybZ');
                for(let i = 0; i < data.length; i++)
                    $(z).append("<option value='"+data[i]._zaw+"'>"+data[i].nrStartowy+". "+data[i].nazwa+", "+data[i].imie+" "+data[i].nazwisko+"</option>");
                document.getElementById('nGr').innerHTML = wg.value;
                $('#wybG option')[wg.selectedIndex].remove();
                wg.disabled = true;
                },
            }); 
    };
    
    var getNote = () =>
    {
        document.getElementById('nZaw').innerHTML = wz.options[wz.selectedIndex].text;
        $('#wybZ option')[wz.selectedIndex].remove();
        wz.disabled = true;
        zo.disabled = false;
    };
    
    var actionClickEndVote = () =>
    {
        wz.disabled = false;
        if(wz.options.length === 0)
            wg.disabled = false;
        if(wg.options.length === 0)
            zz.disabled = false;
        zo.disabled = true;
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
});