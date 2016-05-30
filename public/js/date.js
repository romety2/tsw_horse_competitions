/* jshint esnext: true, jquery: true */
$(() => {
    {
        $( "#dataUrD" ).datepicker
        (
            {
				changeMonth: true,
				changeYear: true,
				dateFormat: "yy-mm-dd",
            }
        );
        
        $( "#dataUrE" ).datepicker
        (
            {
				changeMonth: true,
				changeYear: true,
				dateFormat: "yy-mm-dd",
            }
        );
    }
});