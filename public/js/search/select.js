/* jshint browser: true, esnext: true, node: true, jquery: true */

    $('#szukaj').keyup(function() {
        var elements = $('#wyb option');
        var val = $.trim($(this).val()).toLowerCase();

        elements.show().filter(function() {
            var text = $(this).text().toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });  