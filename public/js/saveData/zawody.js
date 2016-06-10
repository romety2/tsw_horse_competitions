/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    {
        var w = document.getElementById('wydarzenieZ');
        var o = document.getElementById('opisZ');
        var is = document.getElementById('is');
        var z1 = document.getElementById('radio1Z');
        var z2 = document.getElementById('radio2Z');
        var r1 = document.getElementById('radio1R');
        var r2 = document.getElementById('radio2R');
        var upW = function() {
            $.ajax({
                url: '/edytujZawody/'+this.id,
                method: 'PUT',
                data: {dana: this.value},
            });
        };
        w.addEventListener('blur', upW, false);
        o.addEventListener('blur', upW, false);
        is.addEventListener('blur', upW, false);
        z1.addEventListener('click', upW, false);
        z2.addEventListener('click', upW, false);
        r1.addEventListener('click', upW, false);
        r2.addEventListener('click', upW, false);
    }
});