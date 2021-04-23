/**
 * custom.js
 *
 * @package NewsPlus
 * @subpackage NewsPlus_Shortcodes
 * @version 3.0.0
 */
jQuery(document).ready(function ($) {

    'use strict';

    // Category submenu toggle	
    $('a.cat-toggle').on('click', function (e) {
        e.preventDefault();
        var this_cat = $(this).parent().find('ul.submenu');
        $('.post-categories .cat-sub').not(this_cat).hide();
        this_cat.toggle();
        $(this).toggleClass('active-link');
        return false;
    });

    // Close category submenus when clicking on body
    $(document).on('click', function () {
        $('.post-categories .cat-sub').hide();
        $('a.cat-toggle').removeClass('active-link');
    });

    // Stop propagation for various selectors
    $(document).on('click', 'a.cat-toggle', function (e) {
        e.stopPropagation();
    });

    // Toggle button
    $('h5.toggle').on('click', function () {
        $(this).next().slideToggle(300);
        $(this).toggleClass('activetoggle');
        return false;
    }).next().hide();

    // Box close button

    $('.box').each(function () {
        $(this).find('.hide-box').click(function () {
            $(this).parent().hide();
        });
    });

    // Tabs
    $('.tabber').each(function () {
        var widgets = $(this).find('div.tabbed'),
            titleList = '<ul class="ss-tabs clear">',
            i,
            widgetTitle,
            listItem;
        for (i = 0; i < widgets.length; i += 1) {
            widgetTitle = $(widgets[i]).children('h4.tab_title').text();
            $(widgets[i]).children('h4.tab_title').hide();
            listItem = '<li><a href="#' + $(widgets[i]).attr('id') + '">' + widgetTitle + '</a></li>';
            titleList += listItem;
        }
        titleList += '</ul>';
        $(widgets[0]).before(titleList);

        // Make first item active
        $(this).find('.ss-tabs > li:first-child').addClass('ui-tabs-active');
        $(this).find('.tabbed').hide();
        $(this).find('.tabbed').eq(0).show();
        $(this).find('.ss-tabs > li > a').on('click', function (e) {
            e.preventDefault();
            $(this).parent().addClass('ui-tabs-active');
            $(this).parent().siblings().removeClass('ui-tabs-active');
            var tab = $(this).attr('href');
            $('.tabbed').not(tab).hide();
            $(tab).show();
        });
    });

    $('.accordion').each(function () {
        $(this).find('.handle').on('click', function (e) {
            e.preventDefault();
            //Expand or collapse this panel
            $(this).next().slideToggle();
            $(this).parent().find('.handle').removeClass('ui-state-active');
            $(this).addClass('ui-state-active');
            //Hide the other panels
            $('.acc-content').not($(this).next()).slideUp();

        });
    });

    if ($.isFunction($.fn.marquee)) {
		$('.np-news-ticker').marquee({
			duration: $(this).data('duration'),
			gap: 0,
			delayBeforeStart: 0,
			direction: $('body').is('.rtl') ? 'right' : 'left',
			startVisible: true,
			duplicated: true,
			pauseOnHover: true,
			allowCss3Support: true
		});
	}

    $(window).on('load', function () {
        // Masonry
        if ($.isFunction($.fn.masonry)) {
            $('.masonry-enabled').masonry({
                itemSelector: 'article.entry-grid, ul.np-gallery > li',
                isOriginLeft: !($('body').is('.rtl'))
            });
        }
    });

    if ($.fn.owlCarousel) {
        var target = $(".product-carousel, .owl-wrap");
        if (target.length) {
            $(target).each(function () {
                var slider = $(this).find(".products, .owl-carousel"),
                    params = $(this).data('params'),
                    margin = ('' === params.margin) ? 0 : parseInt(params.margin),
                    margin_mobile = ('' === params.margin_mobile) ? 0 : parseInt(params.margin_mobile);

                $(slider).owlCarousel({
                    items: parseInt(params.items),
                    loop: 'false' == params.loop ? false : true,
                    margin: margin,
                    autoplay: 'false' == params.autoplay ? false : true,
                    autoplayTimeout: parseInt(params.timeout),
                    autoHeight: 'false' == params.autoheight ? false : true,
                    nav: 'false' == params.nav ? false : true,
                    dots: 'false' == params.dots ? false : true,
                    smartSpeed: parseInt(params.speed),
                    navText: false,
                    rtl: ($("body").is(".rtl")),
                    autoplayHoverPause: true,
                    animateIn: params.animatein,
                    animateOut: params.animateout,
                    stagePadding: params.stagepadding,

                    responsive: {
                        0: {
                            items: 1,
                            margin: (parseInt(params.items) == 1 ? 0 : margin_mobile),
                            dots: false
                        },
                        480: {
                            items: (parseInt(params.items) > 2 ? 2 : parseInt(params.items)),
                            margin: margin_mobile,
                            dots: false
                        },
                        720: {
                            items: (parseInt(params.items) > 3 ? 3 : parseInt(params.items)),
                            margin: margin_mobile,
                            dots: params.dots ? true : false
                        },
                        960: {
                            items: parseInt(params.items)
                        }
                    }
                });
            });
        }
    }

    // PrettyPhoto Init
    $('a[data-rel]').each(function () {
        $(this).attr('rel', $(this).data('rel'));
    });

    if ($.fn.prettyPhoto) {
        $("a[rel^='prettyPhoto[group1]'], a[rel^='prettyPhoto[group2]'], a[rel^='prettyPhoto[inline]'], a[rel^='prettyPhoto']").prettyPhoto();
    }
});