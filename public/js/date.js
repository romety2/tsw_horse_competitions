/* jshint esnext: true, jquery: true */
$(() => {
    {
        $( "#data" ).datepicker
        (
            {
				changeMonth: true,
				changeYear: true,
				dateFormat: "yy-mm-dd",
            }
        );
    }
});