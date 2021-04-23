/**
 * custom.js
 *
 * @package NewsPlus
 * @since 1.0.0
 * @version 3.0.0
 */
jQuery(function ($) {

    'use strict';

    // Remove no-js class on page load
    $('html').removeClass('no-js').addClass('js-enabled');

    // Image preloader
    var target = $('.slide, .minifolio li a, .post-thumb'),
        images = target.find('img'),
        counter = 0,
        i = 0,
        loaded = [],
        nextDelay = 0,
        timer;
    images.each(function () {
        if ($(this).parent().length === 0) {
            $(this).wrap('<span class="preload" />');
        } else {
            $(this).parent().addClass('preload');
        }
        i += 1;
        loaded[i] = false;
    });

    function removeclass(selector) {
        return function () {
            selector.parent().removeClass('preload');
        };
    }

    images = $.makeArray(images);

    timer = setInterval(function () {
        if (counter >= loaded.length) {
            clearInterval(timer);
            return;
        }
        for (i = 0; i < images.length; i += 1) {
            if (images[i].complete) {
                if (loaded[i] === false) {
                    loaded[i] = true;
                    counter += 1;
                    nextDelay = nextDelay + 100;
                }
                $(images[i]).css('visibility', 'visible').delay(nextDelay).animate({
                    opacity: 1
                }, 300, removeclass($(images[i])));
            } else {
                $(images[i]).css({
                    'visibility': 'hidden',
                    opacity: 0
                });
            }
        }
    }, 100);
});


// document.ready call
jQuery(document).ready(function ($) {

    'use strict';

    var top_pad = $('.site-header').css('paddingTop').replace('px', '');

    // Search trigger

    $('.search-trigger').on('click', function (e) {
        e.preventDefault();
        $(this).parent().find('.search-form').toggleClass('search-active');
        $(this).toggleClass('search-btn-active');
        $(this).parent().find('.search-form input.search-field').focus();
    });

    // Mobile menu drop-down
    if (ss_custom && ss_custom.enable_responsive_menu) {

        if ($('#main-nav').html()) {
            $('ul.nav-menu').clone().removeClass('nav-menu').appendTo('.menu-drop');
        }
        if ($('#optional-nav').html()) {
            $('ul.sec-menu').clone().removeClass('sec-menu').appendTo('.menu-drop');
        }
        $('.menu-button, .menu-button-2').on('click', function (e) {
            e.preventDefault();
            $('.menu-drop').slideToggle(300);
            $(this).toggleClass('activetoggle');
        });
    }

    // Sticky Navbar Animation
    function animateNav() {
        var win_scroll = $(window).scrollTop(),
            win_height = $(window).height(),
            top_nav = $('.top-nav'),
            main_nav = $('#main-nav'),
            resp_nav = $('#responsive-menu'),
            top_nav_offset = $(top_nav).outerHeight(),
            main_nav_offset = '',
            scroll_by = 0,
            ticker_1 = $('.newsplus-news-ticker.after-top-menu'),
            ticker_2 = $('.newsplus-news-ticker.after-main-menu'),
            ticker_offst = 0;

        if (ss_custom && ss_custom.header_style == 'slim') {
            main_nav = $('.header-slim');
        }

        main_nav_offset = $(main_nav).outerHeight();

        // Case 1: When only top nav is sticky
        if (ss_custom && ss_custom.top_bar_sticky && !ss_custom.main_bar_sticky) {
            // Top nav sticky
            if (win_scroll > 0) {
                $(top_nav).addClass('sticky-nav');
                if (ticker_1.length) {
                    ticker_1.css({
                        "margin-top": parseInt(top_nav_offset)
                    });
                } else {
                    if (ss_custom && ss_custom.header_style !== 'slim') {
                        $('.site-header').css({
                            "padding-top": parseInt(top_nav_offset) + parseInt(top_pad)
                        });
                    } else {
                        $('.site-header').css({
                            "margin-top": parseInt(top_nav_offset)
                        });
                    }
                }
            } else {
                $(top_nav).removeClass('sticky-nav');
                if (ticker_1.length) {
                    ticker_1.css({
                        "margin-top": 0
                    });
                } else {
                    if (ss_custom && ss_custom.header_style !== 'slim') {
                        $('.site-header').css({
                            "padding-top": parseInt(top_pad)
                        });
                    } else {
                        $('.site-header').css({
                            "margin-top": 0
                        });
                    }
                }
            }
        }

        // Case 2: When only main nav is sticky
        if (ss_custom && ss_custom.main_bar_sticky && !ss_custom.top_bar_sticky) {

            if (ss_custom && ss_custom.header_style == 'slim') {
                if (ticker_1.length) {
                    ticker_offst = ticker_1.outerHeight();
                    scroll_by = parseInt(ticker_offst) + $(top_nav).outerHeight();
                } else {
                    scroll_by = $(top_nav).outerHeight();
                }
            } else {
                if (ticker_1.length) {
                    ticker_offst = ticker_1.outerHeight();
                    scroll_by = parseInt(ticker_offst) + $(top_nav).outerHeight() + $('.site-header').outerHeight();
                } else {
                    scroll_by = $(top_nav).outerHeight() + $('.site-header').outerHeight();
                }
            }

            if (win_scroll > scroll_by) {
                $(main_nav).addClass('sticky-nav');

                $(resp_nav).addClass('sticky-nav').css({
                    'top': main_nav_offset
                });

                if (ticker_2.length) {
                    ticker_2.css({
                        "margin-top": main_nav_offset
                    });
                } else {
                    $('#main').css({
                        "margin-top": main_nav_offset
                    });
                }

                if (ss_custom && ss_custom.header_style == 'slim') {
                    $('.menu-drop').css({
                        'max-height': win_height - main_nav_offset
                    });
                } else {
                    $('.menu-drop').css({
                        'max-height': win_height - $('.menu-button').outerHeight()
                    });
                }
            } else {
                $(main_nav).removeClass('sticky-nav');

                $(resp_nav).removeClass('sticky-nav').css({
                    'top': 0
                });

                if (ticker_2.length) {
                    ticker_2.css({
                        "margin-top": 0
                    });
                } else {
                    $('#main').css({
                        "margin-top": 0
                    });
                }


                $('.menu-drop').css({
                    'max-height': '100%'
                });
            }
        }

        // Case 3: When both navbars are set to sticky
        if (ss_custom && ss_custom.main_bar_sticky && ss_custom.top_bar_sticky) {

            if (ss_custom && ss_custom.header_style == 'slim') {
                if (ticker_1.length) {
                    ticker_offst = ticker_1.outerHeight();
                    scroll_by = parseInt(ticker_offst);
                } else {
                    scroll_by = 0;
                }
            } else {
                if (ticker_1.length) {
                    ticker_offst = ticker_1.outerHeight();
                    scroll_by = parseInt(ticker_offst) + $('.site-header').outerHeight();
                } else {
                    scroll_by = $('.site-header').outerHeight() - $(top_nav).outerHeight();
                }
            }

            // Top nav sticky
            if (win_scroll > 0) {
                $(top_nav).addClass('sticky-nav');
                if (ticker_1.length) {
                    ticker_1.css({
                        "margin-top": parseInt(top_nav_offset)
                    });
                } else {
                    if (ss_custom && ss_custom.header_style !== 'slim') {
                        $('.site-header').css({
                            "padding-top": parseInt(top_nav_offset) + parseInt(top_pad)
                        });
                    }
                }
            } else {
                $(top_nav).removeClass('sticky-nav');
                if (ticker_1.length) {
                    ticker_1.css({
                        "margin-top": 0
                    });
                } else {
                    if (ss_custom && ss_custom.header_style !== 'slim') {
                        $('.site-header').css({
                            "padding-top": parseInt(top_pad)
                        });
                    }
                }
            }

            // Main nav sticky
            if (win_scroll > scroll_by) {
                $(main_nav).addClass('sticky-nav');

                $(resp_nav).addClass('sticky-nav').css({
                    'top': main_nav_offset + top_nav_offset
                });

                $(main_nav).css({
                    "top": $(top_nav).outerHeight()
                });

                if (ss_custom && ss_custom.header_style == 'slim') {
                    if (ticker_1.length) {
                        ticker_offst = ticker_1.outerHeight();
                        $('#main').css({
                            "margin-top": parseInt(main_nav_offset)
                        });
                    } else if (ticker_2.length) {
                        ticker_2.css({
                            "margin-top": parseInt(main_nav_offset) + parseInt(top_nav_offset)
                        });
                    } else {
                        $('#main').css({
                            "margin-top": parseInt(main_nav_offset) + parseInt(top_nav_offset)
                        });
                    }

                    $('.menu-drop').css({
                        'max-height': win_height - (main_nav_offset + top_nav_offset)
                    });
                } else {
                    $('#main').css({
                        "margin-top": parseInt(main_nav_offset)
                    });

                    $('.menu-drop').css({
                        'max-height': win_height - ($('.menu-button').outerHeight() + top_nav_offset)
                    });
                }
            } else {
                $(main_nav).removeClass('sticky-nav');
                $(resp_nav).removeClass('sticky-nav').css({
                    'top': 0
                });

                if (ticker_1.length) {
                    ticker_offst = ticker_1.outerHeight();
                    $('#main').css({
                        "margin-top": 0
                    });
                } else if (ticker_2.length) {
                    ticker_2.css({
                        "margin-top": 0
                    });
                } else {
                    $('#main').css({
                        "margin-top": 0
                    });
                }

                $(main_nav).css({
                    "top": 0
                });

                $('.menu-drop').css({
                    'max-height': '100%'
                });
            }
        }

    }

    //animateNav();

    $(window).on('load scroll', function () {
        if (!($(window).width() < 600 && ss_custom && ss_custom.mobile_sticky)) {
            animateNav();
        }
    });

    // Navigation drop down effect
    $('.primary-nav ul.sub-menu, .secondary-nav ul.sub-menu').css({
        display: "none"
    });

    $('.primary-nav li, .secondary-nav li').hover(function () {
            $(this).find('ul:first').css({
                visibility: "visible",
                display: "none"
            }).fadeIn(300);
        },
        function () {
            $(this).find('ul:first').css({
                visibility: "visible",
                display: "none"
            });
        });

    function expandable_menu() {
        var sub_menus = $('.menu-drop').find('.menu-item-has-children,.page_item_has_children'),
            expand_menus;
        if (sub_menus.length > 0) {
            sub_menus.each(function () {
                $(this).append('<a class="expand-menu" href="#" title="' + ss_custom.expand_menu_text + '"><i class="fa fa-angle-down"></i></a>').find('.sub-menu,.children').hide();
            });

            expand_menus = $('.menu-drop').find('.expand-menu');

            expand_menus.on('click', function (e) {
                e.preventDefault();
                var icon = $(this).find('.fa');
                icon.toggleClass('rotate-180');
                $(this).prev().slideToggle(300);
            });
        }

    }

    expandable_menu();

    // Scroll to top button
    $('.scroll-to-top').hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-top').fadeIn(300);
        } else {
            $('.scroll-to-top').fadeOut(300);
        }
    });

    $('.scroll-to-top a').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });


    // Print button on single post and single product
    $('.ss-print a').click(function (e) {
        e.preventDefault();
        window.print();
    });

    $(window).on('load', function () {

        // Masonry
        if ($.isFunction($.fn.masonry)) {
            $('.masonry-enabled').masonry({
                itemSelector: 'article.hentry',
                isOriginLeft: !($('body').is('.rtl'))
            });
        }

    });

    // Add accordion like submenu items to side panel lists
    function newsplus_accordion_widgets() {
        var list_widgets = $('.widget_categories,.newsplus_categories,.widget_nav_menu'),
            sub_menus,
            expand_menus,
            expand_text = ss_custom ? ss_custom.expand_menu_text : '';

        if (list_widgets.length) {
            $(list_widgets).find('ul:eq(0)').addClass('accordion-menu');
            sub_menus = $('.accordion-menu').find('ul').parent();

            if (sub_menus.length) {
                $(sub_menus).each(function () {
                    if (!$(this).hasClass('has-children')) {
                        $(this).addClass('has-children').append('<a class="expand-menu" href="#" title="' + expand_text + '"><i class="fa fa-angle-down"></i></a>').find('ul').hide();
                    }
                });
            }

            // Open panel with current item
            $('#sidebar,#secondary').find('.current-menu-ancestor, .current-cat-ancestor').find('.current-menu-item, .current-cat').parents().show();
            $('#sidebar,#secondary').find('.current-menu-ancestor, .current-cat-ancestor').find('.current-menu-item, .current-cat').parents().find('> .expand-menu > .fa').addClass('rotate-180');

            expand_menus = $(list_widgets).find('.expand-menu');

            if (expand_menus.length) {
                $(expand_menus).on('click', function (e) {
                    var icon = $(this).find('.fa');

                    $(this).prev().slideToggle(300);
                    icon.toggleClass('rotate-180');

                    e.preventDefault();
                });
            }
        }
    }

    if (ss_custom && ss_custom.collapse_lists) {
        newsplus_accordion_widgets();
    }
});