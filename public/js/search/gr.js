/* jshint browser: true, esnext: true, node: true, jquery: true */

    $('#szukajS').keyup(function() {
        var elements = $('#wybS option');
        var val = $.trim($(this).val()).toLowerCase();

        elements.show().filter(function() {
            var text = $(this).text().toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });  

    $('#szukajZ').keyup(function() {
        var elements = $('#wybZ option');
        var val = $.trim($(this).val()).toLowerCase();

        elements.show().filter(function() {
            var text = $(this).text().toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });  