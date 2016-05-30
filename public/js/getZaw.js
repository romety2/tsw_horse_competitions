/* jshint browser: true, esnext: true, jquery: true, node: true */
$(() => {
    {
        var confirm = (e) => {
                if (!window.confirm('Na pewno?')) e.preventDefault();
        };

        var c; 
        
        var t = document.getElementById('tabela');
        var tr, td;
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
                    td = $('<td/>');
                    td.append(
"<a href='/zawodnicy/usun/"+data[i]._id+"' class='btn btn-xs btn-danger confirm' title='Usuń' role='button'><span class='glyphicon glyphicon-trash'></span></a>");
                    tr.append(td);
                    $(t).append(tr);
                    c = document.getElementsByClassName('confirm')[i].addEventListener('click', confirm, false);
                }
            },
        });
    }
});