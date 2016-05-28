/* jshint browser: true, esnext: true, jquery: true */

$(() => {
    var modalDodaj = document.getElementById('dodaj-modal');
    var buttonDodaj = document.getElementById("dodaj-button");
    var close = document.getElementsByClassName("close")[0];

    var oknoDodajPokaz = () => {
        modalDodaj.style.display = "block";
    };

    var oknoDodajSchowaj = () => {
        modalDodaj.style.display = "none";
    };

    var oknoDodajSchowaj2 = (e) => {
        if (e.target === modalDodaj)
            modalDodaj.style.display = "none";
    };

    
    buttonDodaj.addEventListener('click', oknoDodajPokaz, false);
    close.addEventListener('click', oknoDodajSchowaj, false);
    window.addEventListener('click', oknoDodajSchowaj2, false);
});