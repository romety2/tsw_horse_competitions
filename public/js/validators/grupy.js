/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    
    var validator = () =>
    {
        var kom = document.getElementById("komunikat");
        var k = document.getElementById("klik");
        $.ajax({
            url: "/walidacjaGr",
            method: 'GET',
            success: (data) => {
                    if(data === '')
                    {
                        $.ajax({
                            url: "/glosowanie",
                            method: 'PUT',
                        }); 
                       k.click();
                    }
                    else
                    {
                        kom.style.display = 'block';
                        $(kom).text("");
                        $(kom).append("<b>Błąd!</b> "+data);
                    }
                },
            }); 
    };

    var zb = document.getElementById('zacznij-button'); 
    zb.addEventListener('click', validator, false);
});