//BACK-TO-TOP

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});


// SCROLL TO ELEMENT

function scroll_to(id) {
    $('html,body').animate({
        scrollTop: $('#' + id).offset().top
    }, 500);
}

function scroll_to_now(id) {
    $('html,body').animate({
        scrollTop: $('#' + id).offset().top
    }, 0);
}


function scroll_to_up(id) {
    var mq = window.matchMedia('(max-width: 991px)'); // Verifico se la dimensione è fino a 767px
    var offset = 0;
    if (mq.matches) {
        offset = 50; // Se la dimensione è fino a 991px, aggiungo 50px all'offset().top
    } else {
        offset = 70; // Se la dimensione è da 992px in poi, aggiungo 70px all'offset().top
    }
    $('html,body').animate({
        scrollTop: $('#' + id).offset().top - offset // Sottraggo l'offset appropriato all'offset().top
    }, 500);
}

function scroll_to_up_now(id) {
    var mq = window.matchMedia('(max-width: 991px)'); // Verifico se la dimensione è fino a 767px
    var offset = 0;
    if (mq.matches) {
        offset = 50; // Se la dimensione è fino a 991px, aggiungo 50px all'offset().top
    } else {
        offset = 70; // Se la dimensione è da 992px in poi, aggiungo 70px all'offset().top
    }
    $('html,body').animate({
        scrollTop: $('#' + id).offset().top - offset // Sottraggo l'offset appropriato all'offset().top
    }, 0);
}


// SCROLL TO ELEMENT SLOWLY

function scroll_to_slow(id) {
    $('html,body').animate({
        scrollTop: $('#' + id).offset().top
    }, 800);
}


// SHRINK NAVBAR

$(window).on("scroll touchmove", function () {
    $('#navbar').toggleClass('navbar-small', $(document).scrollTop() > 0);
});

$(window).on("scroll touchmove", function () {
    $('#navbar-full').toggleClass('navbar-small', $(document).scrollTop() > 0);
});


// ADD, REMOVE E TOGGLE CLASS d-block

function dblock() {
    var element = document.getElementById("boxCommento");
    element.classList.add("d-block");
}

function dblocksearchresults() {
    var element = document.getElementById("searchResults");
    element.classList.add("d-block");
}

function removedblock() {
    var element = document.getElementById("searchResults");
    element.classList.remove("d-block");
}

function removedblockcomment() {
    var element = document.getElementById("boxCommento");
    element.classList.remove("d-block");
}

function removedshow(id) {
    var element = document.getElementById(id);
    element.classList.remove("show");
}

function togglePopupResults() {
    var search = document.getElementById("popupResults");
    if (search.classList.contains("d-none")) {
        search.classList.remove("d-none");
        search.classList.add("d-flex");
    } else {
        search.classList.remove("d-flex");
        search.classList.add("d-none");
    }
}


// TOAST MESSAGE

$(window).ready(function () {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-position",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "300",
        "timeOut": "2500",
        "extendedTimeOut": "1000"
    }
});



// MASONRY


document.addEventListener("DOMContentLoaded", function () {
    var grid = document.querySelector('.masonry');

    if (!grid) {
        return;
    }

    if (typeof imagesLoaded !== "function" || typeof Masonry !== "function") {
        return;
    }

    imagesLoaded(grid, function () {
        new Masonry(grid, {
            itemSelector: '.masonry-item',
            gutter: 28,
            percentPosition: true
        });
    });
});


