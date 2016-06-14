/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    {
        $.ajax({
            url: "/pobierzGrNieUzyte",
            method: 'GET',
            success: (data) => {
                var g = document.getElementById('wybG');
                for(let i = 0; i < data.length; i++)
                    $(g).append("<option value='"+data[i].nazwa+"'>"+data[i].nazwa+"  ("+data[i].plec+")"+"</option>");
            },
        });
        
        $.ajax({
            url: "/pobierzGrWUzyciu",
            method: 'GET',
            success: (data) => {
                var z = document.getElementById('wybZ');
                for(let i = 0; i < data.length; i++)
                    $(z).append("<option value='"+data[i]._zaw+"'>"+data[i].nrStartowy+". "+data[i].nazwa+", "+data[i].imie+" "+data[i].nazwisko+"</option>");
                    if(data.length !== 0)
                    {
                    document.getElementById('wybG').disabled = true;
                    $.ajax({
                        url: "/pobierzNazweGrZLS/"+data[data.length-1]._id,
                        method: 'GET',
                        success: (data2) => {
                            $("#nGr").text(data2.nazwa);
                            $("#nGr").val(data2.nazwa);
                            $.ajax({
                                url: "/pobierzSedziowWGr/"+$("#nGr").text(),
                                method: 'GET',
                                success: (data3) => {
                                    $("#tabela .temp").remove();
                                    var tb = document.getElementById('tabela');
                                    for(let i = 0; i < data3.length; i++)
                                        $(tb).append("<tr id="+data3[i].username+" class='temp'><td>"+data3[i].imie+" "+data3[i].nazwisko+"</td><td class='typ'></td><td class='glowa'></td><td class='kloda'></td><td class='nogi'></td><td class='ruch'></td></tr>");
                                    },
                                }); 
                            },
                        }); 
                    }
                },
            }); 
        
            $.ajax({
            url: "/pobierzOcenianegoLS",
            method: 'GET',
            success: (data) => {
                    var ns;
                    document.getElementById('zakOc').disabled = true;
                    document.getElementById('zakZaw').disabled = true;
                    if(data !== '')
                    {
                        $("#nZaw").text(data.nrStartowy+'. '+data.nazwa+', '+data.imie+' '+data.nazwisko);
                        document.getElementById('wybZ').disabled = true;
                        document.getElementById('zakOc').disabled = false;
                        if($('#wybZ option').length === 0)
                        {
                        ns = $("#nZaw").text().indexOf('.');
                        ns = $("#nZaw").text().substring(0, ns);
                        console.log(ns);
                        document.getElementById('wybG').disabled = true;
                        $.ajax({
                            url: "/pobierzNazweGrZLSWNS/"+ns,
                            method: 'GET',
                            success: (data2) => {
                                $("#nGr").text(data2.nazwa);
                                $("#nGr").val(data2.nazwa);
                                $.ajax({
                                    url: "/pobierzSedziowWGr/"+$("#nGr").text(),
                                    method: 'GET',
                                    success: (data3) => {
                                        $("#tabela .temp").remove();
                                        var tb = document.getElementById('tabela');
                                        for(let i = 0; i < data3.length; i++)
                                            $(tb).append("<tr id="+data3[i].username+" class='temp'><td>"+data3[i].imie+" "+data3[i].nazwisko+"</td><td class='typ'></td><td class='glowa'></td><td class='kloda'></td><td class='nogi'></td><td class='ruch'></td></tr>");
                                        },
                                    }); 
                                },
                            }); 
                        }
                    }
                    else
                    {
                         if($("#wybZ option").length === 0 && $("#wybG option").length === 0) 
                             document.getElementById('zakZaw').disabled = false;
                    }
                },
            });
        
        $.ajax({
            url: "/pobierzStatusZwNZak",
            method: 'GET',
            success: (data) => {
                if(data === 'dzielenie')
                    document.getElementById('pGr').click();
                if(data === 'tworzenie')
                    document.getElementById('pZw').click();
            },
        }); 
    }
});