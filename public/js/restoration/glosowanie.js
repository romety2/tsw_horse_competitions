/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    {
        $.ajax({
            url: "/pobierzGrZwNZak",
            method: 'GET',
            success: (data) => {
                var s = document.getElementById('wybG');
                for(let i = 0; i < data.length; i++)
                    $(s).append("<option value='"+data[i].nazwa+"'>"+data[i].nazwa+"  ("+data[i].plec+")"+"</option>");
            },
        }); 
    }
    
    var zo = document.getElementById("zakOc");
    var zz = document.getElementById("zakZaw");
    zo.disabled = true;
    zz.disabled = true;
});