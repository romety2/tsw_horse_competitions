/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    {
        $.ajax({
            url: "/pobierzZwNZak",
            method: 'GET',
            success: (data) => {
                document.getElementById('wydarzenieZ').setAttribute("value", data.wydarzenie);
                document.getElementById('opisZ').value = data.opis;
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
    }
});