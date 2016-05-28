/* jshint browser: true, esnext: true, node: true, jquery: true */

$(() => {
    
    var createPlayer = () => {
        $.ajax
            ({
                url: '/add/player',
				type: 'POST',
                data: {
                        imie: document.getElementById('imie').value,
                        nazwisko: document.getElementById('nazwisko').value,
                        nazwa: document.getElementById('nazwa').value,
                        dataUr: document.getElementById('data').value,
                        plec: document.getElementById('plec').value,
                        mail: document.getElementById('email').value
                      }
            });
    };

    var przZapisz = document.getElementById("zapisz-button");
    
    przZapisz.addEventListener('click', createPlayer, false);
});