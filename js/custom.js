/* =================================
   LOADER                     
=================================== */
// makes sure the whole site is loaded
$("#home").waitUntilExists(function () {
    // will first fade out the loading animation
    jQuery(".status").fadeOut();
    // will fade out the whole DIV that covers the website.
    jQuery(".preloader").fadeOut();
})

/* =================================
===  RESPONSIVE VIDEO           ====
=================================== */

$(".video-container").fitVids();
$(".videos").owlCarousel({
    dots: true,
    items: 1,
    nav: false
});


/* =================================
===  MAILCHIMP                 ====
=================================== */

$('.mailchimp').ajaxChimp({
    callback: mailchimpCallback,
    url: "http://webdesign7.us6.list-manage.com/subscribe/post?u=9445a2e155b82208d73433060&amp;id=16dc80e353" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
});

function mailchimpCallback(resp) {
    if (resp.result === 'success') {
        $('.subscription-success').html('<i class="icon_check_alt2"></i><br/>' + resp.msg).fadeIn(1000);
        $('.subscription-error').fadeOut(500);

    } else if (resp.result === 'error') {
        $('.subscription-error').html('<i class="icon_close_alt2"></i><br/>' + resp.msg).fadeIn(1000);
    }
}

/* =================================
===  STICKY NAV                 ====
=================================== */

$(document).ready(function () {
    $('.main-navigation').onePageNav({
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        filter: ':not(.external)',
        changeHash: true
    });

});


/* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK - ADDED ON V1.5*/

if (matchMedia('(max-width: 480px)').matches) {
    $('.main-navigation a').on('click', function () {
        $(".navbar-toggle").click();
    });
}


/* NAVIGATION VISIBLE ON SCROLL */

$(document).ready(function () {
    mainNav();
});

$(window).scroll(function () {
    mainNav();
});

var animatingMenu = false;

if (matchMedia('(min-width: 992px), (max-width: 767px)').matches) {
    function mainNav() {
        if (animatingMenu) {
            return;
        }
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 200) {
            $('.floating-navigation').stop().animate({'top': '-120'}, 600);
        } else {
            $('.floating-navigation').stop().animate({'top': '0'}, 600);
        }

        if (top > 1980) {
            $('.sticky-navigation').stop().animate({'top': '0', 'position': 'fixed', 'display': 'block'}, 400);
        } else {
            $('.sticky-navigation').stop().animate({'top': '-120', 'position': 'relative', 'display': 'none'}, 400);
        }
        animatingMenu = true;
        setTimeout(function () {
            animatingMenu = false;
        }, 100)
    }
}

if (matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
    function mainNav() {
        if (animatingMenu) {
            return;
        }
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 200) {
            $('.floating-navigation').stop().animate({'top': '-250'}, 600);
        } else {
            $('.floating-navigation').stop().animate({'top': '0'}, 600);
        }

        if (top > 1980) {
            $('.sticky-navigation').stop().animate({'top': '0', 'position': 'fixed', 'display': 'block'}, 400);
        } else {
            $('.sticky-navigation').stop().animate({'top': '-120', 'position': 'relative', 'display': 'none'}, 400);
        }
        animatingMenu = true;
        setTimeout(function () {
            animatingMenu = false;
        }, 100)
    }
}

if (matchMedia('(max-width: 768px)').matches) {
    function mainNav() {
        // Do nothing, think of a way to better handle dynamic menu in mobile for scrolling features.
    }
}


/* =================================
===  DOWNLOAD BUTTON CLICK SCROLL ==
=================================== */
jQuery(function ($) {
    $('#download-button').localScroll({
        duration: 1000
    });
});


/* =================================
===  FULL SCREEN HEADER         ====
=================================== */
function alturaMaxima() {
    var altura = $(window).height();
    $(".full-screen").css('min-height', altura);

}

$(document).ready(function () {
    alturaMaxima();
    $(window).bind('resize', alturaMaxima);
});


/* =================================
===  SMOOTH SCROLL             ====
=================================== */
var scrollAnimationTime = 1200,
    scrollAnimation = 'easeInOutExpo';
$('a.scrollto').bind('click.smoothscroll', function (event) {
    event.preventDefault();
    var target = this.hash;
    $('html, body').stop().animate({
        'scrollTop': $(target).offset().top
    }, scrollAnimationTime, scrollAnimation, function () {
        window.location.hash = target;
    });
});


/* =================================
===  WOW ANIMATION             ====
=================================== */
wow = new WOW(
    {
        mobile: false
    });
wow.init();


/* =================================
===  OWL CROUSEL               ====
=================================== */
$(document).ready(function () {
    var owl = $("#screenshots");

    owl.owlCarousel({
        items: 2, //10 items above 1000px browser width
        itemsDesktop: [1000, 2], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //2 items between 600 and 0
        itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
    });
});


/* =================================
===  Nivo Lightbox              ====
=================================== */
$(document).ready(function () {

    $('#screenshots a').nivoLightbox({
        effect: 'fadeScale',
    });

});

/* =================================
===  SUBSCRIPTION FORM          ====
=================================== */
$("#subscribe").submit(function (e) {
    e.preventDefault();
    var email = $("#subscriber-email").val();
    var dataString = 'email=' + email;

    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    if (isValidEmail(email)) {
        $.ajax({
            type: "POST",
            url: "subscribe/subscribe.php",
            data: dataString,
            success: function () {
                $('.subscription-success').fadeIn(1000);
                $('.subscription-error').fadeOut(500);
                $('.hide-after').fadeOut(500);
            }
        });
    } else {
        $('.subscription-error').fadeIn(1000);
    }

    return false;
});


/* =================================
===  CONTACT FORM          ====
=================================== */
$("#contact").submit(function (e) {
    e.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var dataString = 'name=' + name + '&email=' + email + '&message=' + message;

    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {
        $.ajax({
            type: "POST",
            url: "sendmail.php",
            data: dataString,
            success: function () {
                $('.success').fadeIn(1000);
                $('.error').fadeOut(500);
            }
        });
    } else {
        $('.error').fadeIn(1000);
        $('.success').fadeOut(500);
    }

    return false;
});


/* =================================
===  EXPAND COLLAPSE            ====
=================================== */
$('.expand-form').simpleexpand({
    'defaultTarget': '.expanded-contact-form'
});


/* =================================
===  STELLAR                    ====
=================================== */
$(window).stellar({
    horizontalScrolling: false
});


/* =================================
===  Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 FIX
=================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    )
    document.querySelector('head').appendChild(msViewportStyle)
}