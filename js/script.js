$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('ul.nav > li').removeClass('active');
            switch(this.hash.substr(1)){
                case "home":
                    $( "ul.nav li:nth-child(1)" ).addClass('active');
                    break;
                case "about":
                    $( "ul.nav li:nth-child(2)" ).addClass('active');
                    break;
                case "work":
                    $( "ul.nav li:nth-child(3)" ).addClass('active');
                    break;
                case "contact":
                    $( "ul.nav li:nth-child(4)" ).addClass('active');
                    break;
            }
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000, function() {
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    return false;
                } else {
                    $target.attr('tabindex','-1');
                    $target.focus();
                };
            });
        }
    }
});

$('ul.nav > li').click(function (e) {
    $('ul.nav > li').removeClass('active');
    $(this).addClass('active');
});

$(".fa-facebook, .fa-github, .fa-linkedin, .fa-free-code-camp").hover(function(){
    $(this).toggleClass("fa-inverse");
})

$(document).ready(function(){
    var navH = $("#navbar").height();
    $("body>div").each(function(){
        $(this).css("padding-top", navH);
    })
});