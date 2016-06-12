/* jshint browser: true, esnext: true, jquery: true, node: true */
/* globals sendGroup, sendVote */

$(() => {
    {                       
        var st = document.getElementById('STyp');
        var sg = document.getElementById('SGlowa');
        var sk = document.getElementById('SKloda');
        var sn = document.getElementById('SNogi');
        var sr = document.getElementById('SRuch');
        $.ajax({
            url: "/pobUst",
            method: 'GET',
            success: (data) => {
                if(data !== '')
                {
                    if(data.zakres === '10')
                    {
                        st.setAttribute("data-slider-max", '10');
                        sg.setAttribute("data-slider-max", '10');
                        sk.setAttribute("data-slider-max", '10');
                        sn.setAttribute("data-slider-max", '10');
                        sr.setAttribute("data-slider-max", '10');
                    }
                    else
                    {
                        st.setAttribute("data-slider-max", '20');
                        sg.setAttribute("data-slider-max", '20');
                        sk.setAttribute("data-slider-max", '20');
                        sn.setAttribute("data-slider-max", '20');
                        sr.setAttribute("data-slider-max", '20');
                    }
                    if(data.rodzaj === 'c')
                    {
                        st.setAttribute("data-slider-step", '1');
                        sg.setAttribute("data-slider-step", '1');
                        sk.setAttribute("data-slider-step", '1');
                        sn.setAttribute("data-slider-step", '1');
                        sr.setAttribute("data-slider-step", '1');
                    }
                    else
                    {
                        st.setAttribute("data-slider-step", '0.5');
                        sg.setAttribute("data-slider-step", '0.5');
                        sk.setAttribute("data-slider-step", '0.5');
                        sn.setAttribute("data-slider-step", '0.5');
                        sr.setAttribute("data-slider-step", '0.5');
                    }
                    $('#STyp').slider({
                        //tooltip: 'always'
                    });

                    $('#STyp').on("change", (e) => {
                        $("#ocenaT").text(e.value.newValue);
                        sendVote(e.value.newValue, 'typ',  document.getElementById('pokoj').value);
                     if($(document.getElementById('nSt')).text().length !== 0)
                            $.ajax({
                                url: "/zapiszOcene/"+e.value.newValue+'/typ/'+document.getElementById('pokoj').value+'/'+$(document.getElementById('nSt')).text(),
                                method: 'PUT'
                            });
                    });

                    $('#SGlowa').slider({
                        //tooltip: 'always'
                    });

                    $('#SGlowa').on("change", (e) => {
                        $("#ocenaG").text(e.value.newValue);
                        sendVote(e.value.newValue, 'glowa',  document.getElementById('pokoj').value);
                    });

                    $('#SKloda').slider({
                        //tooltip: 'always'
                    });

                    $('#SKloda').on("change", (e) => {
                        sendVote(e.value.newValue, 'kloda',  document.getElementById('pokoj').value);
                        $("#ocenaK").text(e.value.newValue);
                    });

                    $('#SNogi').slider({
                        //tooltip: 'always'
                    });


                    $('#SNogi').on("change", (e) => {
                        $("#ocenaN").text(e.value.newValue);
                        sendVote(e.value.newValue, 'nogi',  document.getElementById('pokoj').value);
                    });

                    $('#SRuch').slider({
                        //tooltip: 'always'
                    });

                    $('#SRuch').on("change", (e) => {
                        $("#ocenaR").text(e.value.newValue);
                        sendVote(e.value.newValue, 'ruch',  document.getElementById('pokoj').value);
                    });
                    
                }
            },
        }); 
    }
});