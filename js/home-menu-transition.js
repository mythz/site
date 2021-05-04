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

