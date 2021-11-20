window.onscroll = function() {
    scrollFunction()
}
function scrollFunction(){
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        document.getElementById("header").style.backgroundColor = "white";
        document.getElementById("header").style.padding = "5px 5px";
        if (window.innerWidth <= 992)
        document.getElementById("wavylogo").style.display = "block";
        document.querySelector(".navbar-toggler").style.top = "10px";
        document.getElementById("header").style.padding = "0px 0px";
    } else {
        document.getElementById("header").style.backgroundColor = "transparent";
        document.getElementById("header").style.padding = "0px 0px";
        document.getElementById("wavylogo").style.display = "block";
        document.querySelector(".navbar-toggler").style.top = '10px';
    }
}
window.onresize = function() {
    if (window.innerWidth > 992)
    document.getElementById("wavylogo").style.display = "none";
    else
    document.getElementById("wavylogo").style.display = "block";
}