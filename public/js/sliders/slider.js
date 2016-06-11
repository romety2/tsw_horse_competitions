/* jshint browser: true, esnext: true, jquery: true, node: true */

$(() => {
    {
        $('#STyp').slider({
            //tooltip: 'always'
        });
    
        $('#STyp').on("change", (e) => {
            $("#ocenaT").text(e.value.newValue);
        });
        
        $('#SGlowa').slider({
            //tooltip: 'always'
        });

        $('#SGlowa').on("change", (e) => {
            $("#ocenaG").text(e.value.newValue);
        });
        
        $('#SKloda').slider({
            //tooltip: 'always'
        });

        $('#SKloda').on("change", (e) => {
            $("#ocenaK").text(e.value.newValue);
        });
        
        $('#SNogi').slider({
            //tooltip: 'always'
        });

        
        $('#SNogi').on("change", (e) => {
            $("#ocenaN").text(e.value.newValue);
        });
        
        $('#SRuch').slider({
            //tooltip: 'always'
        });

        $('#SRuch').on("change", (e) => {
            $("#ocenaR").text(e.value.newValue);
        });
    }
});