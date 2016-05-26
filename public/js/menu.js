/* jshint browser: true, esnext: true, devel: true, jquery: true */

$(() => {
    var toggleMenu = function()
    {
        var m = document.getElementById('menu');
        var c = m.getAttribute("class");
        var b = document.getElementById('body');
        var t = document.getElementById('tab');
        console.log(c);
        if(c === "navbar navbar-default menu menu-show") 
        {
            m.setAttribute("class", "navbar navbar-default menu menu-hide");
            b.setAttribute("class", "body-hide");
            t.setAttribute("class", "btn btn-default tab-hide");
        }
        else
        {
            m.setAttribute("class", "navbar navbar-default menu menu-show");
            b.setAttribute("class", "body-show");
            t.setAttribute("class", "btn btn-default tab-show");
        }
    };
    
    var dropdown= function()
    {
        var dd = this.nextElementSibling;
        if(dd.style.display === "none")
            dd.style.display = "block";
        else
            dd.style.display = "none";
    };
    
    var t = document.getElementById('tab');
    var dd = document.querySelectorAll(".drop");
    t.addEventListener('click', toggleMenu, false);
    for(let i = 0; i < dd.length; i++)
        dd[i].addEventListener('click', dropdown, false);
});