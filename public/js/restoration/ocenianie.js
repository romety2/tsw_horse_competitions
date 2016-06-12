/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    $.ajax({
        url: "/sprawdzCzyNieOceniam/"+document.getElementById('pokoj').value,
        method: 'GET',
        success: (data) => {
            if(data !== '')
            {
                $(document.getElementById('nGr')).text(data.grupa);
                $(document.getElementById('nSt')).text(', Nr startowy: '+data.ns);
            }
        },
    });
});