/* jshint browser: true, esnext: true, jquery: true */

$(() => {
    var toggleMenu = () =>
    {
        var m = document.getElementById('menu');
        var c = m.getAttribute("class");
        var b = document.getElementById('body');
        var t = document.getElementById('tab');
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
        var dd = this.firstElementChild.nextElementSibling;
        if(dd.style.display === "none")
            dd.style.display = "block";
        else
            dd.style.display = "none";
    };
    
    var t = document.getElementById('tab');
    var dd = document.querySelectorAll(".dropdown");
    t.addEventListener('click', toggleMenu, false);
    for(let i = 0; i < dd.length; i++)
    {
        dd[i].firstElementChild.nextElementSibling.style.display = "none";
        dd[i].addEventListener('click', dropdown, false);   
    }
        
});