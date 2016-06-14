/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    {
        $.ajax({
            url: "/pobierzGrZwNZak",
            method: 'GET',
            success: (data) => {
                var s = document.getElementById('listaGr');
                for(let i = 0; i < data.length; i++)
                    $(s).append("<option value='"+data[i].nazwa+"'>"+data[i].nazwa+"  ("+data[i].plec+")"+"</option>");
            },
        }); 
        
        $.ajax({
            url: "/pobierzStatusZwNZak",
            method: 'GET',
            success: (data) => {
                if(data === 'tworzenie')
                    document.getElementById('pZw').click();
                //else if(data === 'rozpoczete')
                    //document.getElementById('pGl').click();
            },
        }); 
    }
});