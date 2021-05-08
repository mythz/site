let $1 = (sel, el) => typeof sel === "string" ? (el || document).querySelector(sel) : sel || null,
    $$ = (sel, el) => typeof sel === "string" ? Array.prototype.slice.call((el || document).querySelectorAll(sel)) : Array.isArray(sel) ? sel : [sel];

function on(sel, handlers) {
    $$(sel).forEach(e => {
        Object.keys(handlers).forEach(function (evt) {
            let fn = handlers[evt];
            if (typeof evt === 'string' && typeof fn === 'function') {
                e.addEventListener(evt, fn.bind(e));
            }
        })
    });
}


/* STICKY NAV */
$(document).ready(function () {
    $('.main-navigation').onePageNav({
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        filter: ':not(.external)',
        changeHash: true
    });

    // Bootstrap Navbar and dropdowns
    let toggle = $1('.navbar-toggle'),
        collapse = $1('.navbar-collapse'),
        dropdowns = $$('.dropdown');
    function toggleMenu() {
        collapse.classList.toggle('collapse');
        collapse.classList.toggle('in');
    }
    function closeMenus() {
        for (let j = 0; j < dropdowns.length; j++) {
            $1('.dropdown-toggle',dropdowns[j]).classList.remove('dropdown-open');
            dropdowns[j].classList.remove('open');
        }
    }
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener('click', function() {
            if (document.body.clientWidth < 768) {
                let open = this.classList.contains('open');
                closeMenus();
                if (!open) {
                    $1('.dropdown-toggle',this).classList.toggle('dropdown-open');
                    this.classList.toggle('open');
                }
            }
        });
    }
    function closeMenusOnResize() {
        if (document.body.clientWidth >= 768) {
            closeMenus();
            collapse.classList.add('collapse');
            collapse.classList.remove('in');
        }
    }
    on(window, { resize: closeMenusOnResize });
    on(toggle, { click: toggleMenu });
});

/* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK - ADDED ON V1.5*/
if (matchMedia('(max-width: 480px)').matches) {
    $('.main-navigation a').on('click', function () {
        $(".navbar-toggle").click();
    });
}

/* Nuget copy */
function copy(e) {
    let $el = document.createElement("input");
    let $parent = e.parentElement.parentElement;
    let $lbl = $parent.firstElementChild;
    $el.setAttribute("value", $lbl.innerText);
    document.body.appendChild($el);
    $el.select();
    document.execCommand("copy");
    document.body.removeChild($el);
    let $copyText = $parent.parentElement.querySelector('.copy-text');
    $copyText.innerHTML = '<label>copied!</label>';
    setTimeout(function () {
        $copyText.innerHTML = '';
    }, 5000);
}


/* Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 FIX */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    let msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    )
    document.querySelector('head').appendChild(msViewportStyle)
}