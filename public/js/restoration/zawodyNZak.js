/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    {
        $.ajax({
            url: "/pobierzZwNZak",
            method: 'GET',
            success: (data) => {
                document.getElementById('wydarzenieZ').setAttribute("value", data.wydarzenie);
                document.getElementById('opisZ').value = data.opis;
                document.getElementById('is').value = data.is;
                if(data.zakres==="10")
                     document.getElementById("radio1Z").checked = true;
                else   
                     document.getElementById("radio2Z").checked = true;
                if(data.rodzaj==="c")
                     document.getElementById("radio1R").checked = true;
                else   
                     document.getElementById("radio2R").checked = true;
            },
        }); 
        
        $.ajax({
            url: "/pobierzZwNDDZaw",
            method: 'GET',
            success: (data) => {
                var s = document.getElementById('wyb');
                for(let i = 0; i < data.length; i++)
                $(s).append("<option value='"+data[i]._id+"'>"+data[i].nazwa+" ("+data[i].plec+"), "+data[i].imie+" "+data[i].nazwisko+"</option>");
            },
        }); 
        
        $.ajax({
            url: "/pobierzLSZwNZak",
            method: 'GET',
            success: (data) => {
                var s = document.getElementById('listaSt');
                for(let i = 0; i < data.length; i++)
                $(s).append("<option value='"+data[i]._zaw+"'>"+data[i].nrStartowy+". "+data[i].nazwa+", "+data[i].imie+" "+data[i].nazwisko+"</option>");
            },
        }); 
    
        $.ajax({
            url: "/pobierzStatusZwNZak",
            method: 'GET',
            success: (data) => {
                if(data === 'dzielenie')
                    document.getElementById('pGr').click();
                else if(data === 'rozpoczete')
                    document.getElementById('pGl').click();
            },
        }); 
    }
});