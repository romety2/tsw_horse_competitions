/* jshint browser: true, esnext: true, jquery: true, node: true */
$(() => {
    {
        var t = document.getElementById('tabela');
        var tr;
        $.ajax({
            url: "/pobierzWZaw",
            method: 'GET',
            success: function(data){
                for(let i = 0; i < data.length; i++)
                {
                    tr = $('<tr/>');
                    tr.append("<td>"+data[i].imie+"</td>");
                    tr.append("<td>"+data[i].nazwisko+"</td>");
                    tr.append("<td>"+data[i].nazwa+"</td>");
                    tr.append("<td>"+data[i].dataUr+"</td>");
                    tr.append("<td>"+data[i].plec+"</td>");
                    $(t).append(tr);
                }
            },
        });
    }
});