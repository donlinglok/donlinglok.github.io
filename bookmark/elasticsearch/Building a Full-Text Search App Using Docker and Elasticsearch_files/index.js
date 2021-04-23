/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        $('#next-button').click(function(event) {
            event.preventDefault();
            scrollRight()

        });

        $('#prev-button').click(function(event) {
            event.preventDefault();
            scrollLeft()
        });
    });

    function getScrollRemaining (elem) {
        return elem.prop('scrollWidth') - (elem.scrollLeft() + elem.innerWidth())
    }

    function scroll(elem, ammount) {
        elem.animate({
            scrollLeft: "+=" + ammount + "px"
        }, "slow");
    }

    function scrollRight () {
        var elem = $('.featured-posts-scroll')
        var scrollAmount = $('.featured-post').width()
        if (getScrollRemaining(elem) === 0) {
            scrollAmount = elem.prop('scrollWidth') * -1
        }

        scroll(elem, scrollAmount)
    }

    function scrollLeft() {
        var elem = $('.featured-posts-scroll')
        var scrollAmount = $('.featured-post').width() * (-1)
        if (getScrollRemaining(elem) === elem.prop('scrollWidth') - elem.innerWidth()) {
            scrollAmount = elem.prop('scrollWidth')
        }

        scroll(elem, scrollAmount)
    }

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
