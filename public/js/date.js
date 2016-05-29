/* jshint esnext: true, jquery: true */
$(() => {
    {
        $( "#dataUr" ).datepicker
        (
            {
				changeMonth: true,
				changeYear: true,
				dateFormat: "yy-mm-dd",
            }
        );
    }
});