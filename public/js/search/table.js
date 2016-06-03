/* jshint browser: true, esnext: true, node: true, jquery: true */

    $('#szukaj').keyup(function() {
        var rows = $('#tabela .s');
        var val = $.trim($(this).val()).toLowerCase();

        rows.show().filter(function() {
            var text = $(this).text().toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });