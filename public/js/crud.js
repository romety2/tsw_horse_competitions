/* jshint browser: true, esnext: true, node: true, jquery: true */

$(() => {
    var modalDodaj = document.getElementById('dodaj-modal');
    var buttonDodaj = document.getElementById("dodaj-button");
    var back = document.getElementsByClassName("back");

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

    console.log(close);
    buttonDodaj.addEventListener('click', oknoDodajPokaz, false);
    back[0].addEventListener('click', oknoDodajSchowaj, false);
    back[1].addEventListener('click', oknoDodajSchowaj, false);
    window.addEventListener('click', oknoDodajSchowaj2, false);
});