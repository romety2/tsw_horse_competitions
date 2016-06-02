/* jshint browser: true, esnext: true, node: true, jquery: true */

    $('#szukaj').keyup(function() {
        var rows = $('#tabela .s');
        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

        rows.show().filter(function() {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });  