/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    {
        var s = document.getElementById('wyb');
        $.ajax({
            url: "/pobierzW",
            method: 'GET',
            success: (data) => {
                for(let i = 0; i < data.length; i++)
                $(s).append("<option value='"+data[i]._id+"'>"+data[i].nazwa+" ("+data[i].plec+"), "+data[i].imie+" "+data[i].nazwisko+"</option>");
            },
        }); 
    }
});