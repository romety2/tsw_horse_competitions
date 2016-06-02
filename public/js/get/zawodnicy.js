/* jshint browser: true, esnext: true, jquery: true, node: true */
/* globals oknoEdytujPokaz */

$(() => {
    {
        var confirm = (e) => {
                if (!window.confirm('Na pewno?')) e.preventDefault();
        };

        var t = document.getElementById('tabela');
        var tr, td;
        $.ajax({
            url: "/pobierzW",
            method: 'GET',
            success: (data) => {
                for(let i = 0; i < data.length; i++)
                {
                    tr = $('<tr class="s"/>');
                    tr.append("<td>"+data[i].imie+"</td>");
                    tr.append("<td>"+data[i].nazwisko+"</td>");
                    tr.append("<td>"+data[i].nazwa+"</td>");
                    tr.append("<td>"+data[i].dataUr+"</td>");
                    tr.append("<td>"+data[i].plec+"</td>");
                    tr.append("<td>"+data[i].email+"</td>");
                    td = $('<td/>');
                    td.append(
"<a class='btn btn-xs btn-primary edit' title='Edytuj' role='button' content='"+data[i]._id+"'><span class='glyphicon glyphicon-pencil'></a> "+          
"<a href='/zawodnicy/usun/"+data[i]._id+"' class='btn btn-xs btn-danger confirm' title='Usuń' role='button'><span class='glyphicon glyphicon-trash'></span></a>");
                    tr.append(td);
                    $(t).append(tr);
                    document.getElementsByClassName('confirm')[i].addEventListener('click', confirm, false);
                    document.getElementsByClassName('edit')[i].addEventListener('click', oknoEdytujPokaz, false);
                }
            },
        }); 
    }
});