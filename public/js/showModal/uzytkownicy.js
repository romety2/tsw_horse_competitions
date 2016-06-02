/* jshint browser: true, esnext: true, node: true, jquery: true */

    var oknoEdytujPokaz = function() {
        var id = this.getAttribute("content");
        var em = document.getElementById('edytuj-modal').style.display = "block";
        var form = document.getElementById('edytuj-form');
        form.setAttribute("action", "/uzytkownicy/edytuj/"+id);
        $.ajax({
            url: '/pobierzUz/'+id,
            method: 'GET',
            success: function(data){
                document.getElementById('imieE').setAttribute("value", data.imie);
                document.getElementById('nazwiskoE').setAttribute("value", data.nazwisko);
                document.getElementById('usernameE').setAttribute("value", data.username);
                if("Sędzia" === data.role)
                {
                    document.getElementById('opcjaSE').setAttribute("selected", "selected");
                    document.getElementById('opcjaAE').removeAttribute("selected");
                }
                else
                {
                    document.getElementById('opcjaAE').setAttribute("selected", "selected");
                    document.getElementById('opcjaSE').removeAttribute("selected");
                }
            },
        });
    };

$(() => {
    var oknoDodajPokaz = () => {
        modalDodaj.style.display = "block";
    };

    var oknoDodajSchowaj = () => {
        modalDodaj.style.display = "none";
    };

    var oknoEdytujSchowaj = () => {
        modalEdytuj.style.display = "none";
    };

    var oknoDodajSchowaj2 = (e) => {
        if (e.target === modalDodaj)
            modalDodaj.style.display = "none";
    };
    
    var oknoEdytujSchowaj2 = (e) => {
        if (e.target === modalEdytuj)
            modalEdytuj.style.display = "none";
    };

    var modalDodaj = document.getElementById('dodaj-modal');
    var modalEdytuj = document.getElementById('edytuj-modal');
    var buttonDodaj = document.getElementById("dodaj-button");
    var back = document.getElementsByClassName("back");
    var przDodaj = document.getElementById("dodaj-button");
    
    buttonDodaj.addEventListener('click', oknoDodajPokaz, false);
    back[0].addEventListener('click', oknoDodajSchowaj, false);
    back[1].addEventListener('click', oknoDodajSchowaj, false);
    back[2].addEventListener('click', oknoEdytujSchowaj, false);
    back[3].addEventListener('click', oknoEdytujSchowaj, false);
    window.addEventListener('click', oknoDodajSchowaj2, false);
    window.addEventListener('click', oknoEdytujSchowaj2, false);
});