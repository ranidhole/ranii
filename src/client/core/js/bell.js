//BRF Framework - Updated Nov.12.2017
function initBRF() {
    cssScrollCustom();
    reviewScroll();
    equalColumns();
}

//Vertically center modal window and make content scrollable if modal is too long
if ($(window).width() > 976) { //for desktop only
    function setModalMaxHeight(element) {
        this.$element = $(element);
        this.$content = this.$element.find('.modal-content');
        var borderWidth = this.$content.outerHeight() - this.$content.innerHeight();
        var dialogMargin = $(window).width() < 768 ? 20 : 60;
        var contentHeight = $(window).height() - (dialogMargin + borderWidth);
        var headerHeight = this.$element.find('.modal-header').outerHeight() || 0;
        var subHeight = this.$element.find('.modal-sub-header').outerHeight() + 1 || 0;
        var footerHeight = this.$element.find('.modal-footer').outerHeight() || 0;
        var maxHeight = contentHeight - (headerHeight + subHeight + footerHeight);

        //this.$content.css({
        //    'overflow': 'hidden'
        //});

        this.$element
          .find('.modal-body').css({
              'max-height': maxHeight,
              'overflow-y': 'auto'
          });
    }

    $('.modal').on('show.bs.modal', function () {
        $(this).show();
        setModalMaxHeight(this);
    });

    $(window).resize(function () {
        if ($('.modal.in').length != 0) {
            setModalMaxHeight($('.modal.in'));
        }
    });

};

//added to give focus to the modal close button when the modal is launched from a link. Tabbing will then start from this button onward so the first tab will always bring you to the NEXT FOCUSABLE ELEMENT INSIDE THE MODAL
function setFocusTimeout(item) {
    var focusTimeout = window.setTimeout(focusOnCloseBtn, 500);
    function focusOnCloseBtn() {
        $($(item).attr('data-target')).find('.modal-header').find('button').focus();
        clearTimeout(focusTimeout);
    }
}

//View more details - expand/collapse
var iconOpen = 'icon icon-collapse-outline-circled',
    iconClose = 'icon icon-exapnd-outline-circled';
$(document).on('show.bs.collapse hide.bs.collapse', '.accordion', function (e) {
    var $target = $(e.target)
    $target.siblings('.accordion-heading')
    .find('i').toggleClass(iconOpen + ' ' + iconClose);
    if (e.type == 'show')
        $target.prev('.accordion-heading').find('.accordion-toggle').addClass('active');
    if (e.type == 'hide')
        $(this).find('.accordion-toggle').not($target).removeClass('active');
});
//For search filters background colour change when opened
$(".search-filter .accordion-toggle").click(function () {
    $(this).toggleClass("bgBlueDark");
});

//Focuses modal close button when shown
$('.modal').on('shown.bs.modal', function () {
    $('.close').focus();
})


//Mobile hamburger selectbox tab container selection
$(".custom-selection").change(function () {
    var option_activeTab = $('option:selected', this).attr('data-rel');
    $(".tab-content").hide();
    $("#" + option_activeTab).show();
    $(".tab_heading").removeClass("option_active");
    $(this).addClass("option_active");
});
//Popup tooltips/menus
$('.trigger-popup').on('click touch', function () {
    $('.trigger-popup').next().hide();
    $(this).next().show();
});
$(document).on('click touch', function (event) {
    if (!$(event.target).parents().addBack().is('.trigger-popup')) {

        $('.popup').not(this).hide();
    }
});
$('.popup').on('click touch', function (event) {
    event.stopPropagation();
});
//Dropdown menus
$('.trigger-dropdown').on('mouseover focus click touch', function () {
    $('.trigger-dropdown').next().hide();
    $(this).next().show();
});
$(document).on('mouseover focus click touch', function (event) {
    if (!$(event.target).parents().addBack().is('.trigger-dropdown')) {
        $('.connector-drop-down').not(this).hide();
    }
});
$('.connector-drop-down').on('mouseover focus click touch', function (event) {
    event.stopPropagation();
});


//Prevents url redirect on first tap on mobile devices
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
function stopEventOnce(event) {
    event.preventDefault();
    $(this).unbind('click', stopEventOnce);
    return false;
}
$(".trigger-dropdown").bind('click', stopEventOnce);
$(".trigger-dropdown").on('focusout', function () {
    $(".trigger-dropdown").bind('click', stopEventOnce);
});
}



//Detects mobile browser and uses pure css scrollbar instead of js
function cssScrollCustom() {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    if (isChrome || isSafari) {
        if ($('div').hasClass('scroll-wrap')) {
            $('.scroll-wrap').removeClass('scrollbar-inner').addClass('scrollAdjust');
            $('.scrollbar-content').removeClass('scrollbar-content vPadding20-left-xs').addClass('vPadding20');

            if ($(window).width() > 999) {
                $('.modal .scrollbar-area').css("padding", "15px 15px 0 0");
                $('.modal-scroll-area').css("padding", "0");
            }
        }
    }
    else if ($(window).width() > 999) {
        if (typeof $('.scrollbar-inner').scrollbar !== 'undefined') {
            $(".scrollbar-inner").scrollbar();

        }
    }
}
//for custom scrollbar visibility for mobile and tablet
function reviewScroll() {
    if ($(window).width() < 999) {
        if (typeof $('.scrollAdjust').scrollbar !== 'undefined') {
            $(".scrollbar-inner").scrollbar();
            $(".modal-body").removeClass("scrollAdjust");
            $(".modal-body").css("padding", "30px");
        }
    }
}


//for equal height columns
; (function (factory) {
    //'use strict';
    //if (typeof define === 'function' && define.amd) {
    //    define(['jquery'], factory);
    //} else if (typeof exports !== 'undefined') {
    //    module.exports = factory(require('jquery'));
    //} else {
    factory(jQuery);
    //}

}(function ($) {
    'use strict';
    var ColEqualizer = window.ColEqualizer || {};
    ColEqualizer = (function () {
        function ColEqualizer(element) {
            var _ = this;
            _.el = element;
            _.colHeight(_.el);
            _.winLoad();
        }
        return ColEqualizer;
    }());

    ColEqualizer.prototype.colHeight = function (element) {
        var _ = this;
        $(element).each(function (index, el) {
            _.colReset(el);
            var tallest = 0;
            $('[class*=col-]', el).each(function (i, e) {
                var testHeight = $(e).height();
                if (testHeight > tallest) {
                    tallest = testHeight;
                }
            });
            if (tallest > 0) {
                $('[class*=col-]', el).height(tallest);
            }
        });

    };
    ColEqualizer.prototype.colReset = function (el) {
        $('[class*=col-]', el).height('auto');
    };

    ColEqualizer.prototype.resizeWindow = function () {
        var _ = this;
        var viewWidth = window.outerWidth;
        if (viewWidth <= 0) {
            viewWidth = $(window).width();
        }
        // If set, minWidth shows/hides the nav based on the size of the browser
        // If minWidth not set, nav will always show
        if (100 <= viewWidth) {
            _.colHeight(_.el);
        } else {
            _.colReset(_.el);
        }
    };

    ColEqualizer.prototype.winLoad = function () {
        var _ = this;
        var $win = $(window);
        $win.load(function () {
            $win.on('resize', function () {
                _.resizeWindow();
            });
            _.resizeWindow();
        });
    };

    $.fn.colequalizer = function () {
        var _ = this;
        return _.each(function (index, element) {
            element.navinator = new ColEqualizer(element);
        });
    };
}));
function equalColumns() {
    $('.col-eq').colequalizer();

}


//All document ready
$(document).ready(function () {
    //LazyLoad
    if (typeof $('img.lazy').lazyload !== 'undefined') {
        $("img.lazy").lazyload({ effect: "fadeIn" });
    }
    $('.modal').on('shown.bs.modal', function () {
        setTimeout(function () {
            if ($("img.lazy").length > 0) {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            }

        }, 100);
    });

    //Load more search result lists, by default 5 at a time 
    $(".list-wrapper").each(function (index) {
        $(this).find('.search-result-list li:lt(' + $(this).attr('view-child') + ')').show();
    });
    $('.load-more').click(function () {
        var $myWrapper = $(this).closest('.list-wrapper');
        var x = parseInt($myWrapper.attr('view-child'), 10);
        var liSize = $myWrapper.find('.search-result-list li').size();
        x = (x + 5 <= liSize) ? x + 5 : liSize;
        $myWrapper.attr('view-child', x)
        $myWrapper.find('.search-result-list li:lt(' + x + ')').fadeIn();
        if (x == liSize) {
            $myWrapper.find('.load-more').addClass('disabled');
        }
        if ($('img').hasClass('lazy')) {
            $("img.lazy").lazyload();
        }
    });

    //Check to see if the window is top if not then display button
    if ($(window).width() < 999) {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollToTop.mobile').fadeIn();
            } else {
                $('.scrollToTop.mobile').fadeOut();
            }
        });
    }
    //Click event to scroll to top
    $('.scrollToTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });

    //BRF tabs
    $("ul.tabs li").click(function () {
        $(".tab-content").hide();
        var activeTab = $(this).attr("data-rel");
        $("#" + activeTab).fadeIn();
        $("ul.tabs li").removeClass("active_tabs");
        $(this).addClass("active_tabs");
        $(".tab_heading").removeClass("d_active");
        $(".tab_heading[data-rel^='" + activeTab + "']").addClass("d_active");
    });

    //simple accordion
    $('.accordionButton').click(function () {
        $('.accordionButton').removeClass('open');
        $('.accordionContent').slideUp('normal');
        if ($(this).next().is(':hidden') == true) {
            $(this).addClass('open');
            $(this).next().slideDown('normal');
        }
    });
    $('.accordionContent').hide();   

});

//Accordion expand/collapse 
$('.accordion-tog').click(function () {
    $('.collapse-accordion').slideToggle();
    if ($('.accordPanel').attr('aria-expanded') == 'false') {
        $(this).attr('aria-expanded', 'true');
        $('i').attr('aria-expanded', 'true');
        $('.accordion-heading>a>i.icon').addClass('icon-collapse-outline-circled');
        $('.accordion-heading>a>i.icon').removeClass('icon-exapnd-outline-circled');
    }
    else {
        $(this).attr('aria-expanded', 'false');
        $('i').attr('aria-expanded', 'false');
        $('.accordion-heading>a>i.icon').addClass('icon-exapnd-outline-circled');
        $('.accordion-heading>a>i.icon').removeClass('icon-collapse-outline-circled');
    }
});
$('.accordion-tog-1').click(function () {
    $('.collapse-accordion-1').slideToggle();
    if ($('.accordPanel-1').attr('aria-expanded') == 'false') {
        $(this).attr('aria-expanded', 'true');
        $('div>i').attr('aria-expanded', 'true');
        $('.accordion-heading>a>div>i.icon').addClass('icon-collapse-outline-circled');
        $('.accordion-heading>a>div>i.icon').removeClass('icon-exapnd-outline-circled');
    }
    else {
        $(this).attr('aria-expanded', 'false');
        $('div>i').attr('aria-expanded', 'false');
        $('.accordion-heading>a>div>i.icon').addClass('icon-exapnd-outline-circled');
        $('.accordion-heading>a>div>i.icon').removeClass('icon-collapse-outline-circled');
    }
});
//Adds space below the footer when the dock is open to allow the full page to scroll in view 
$(".dock-handle").click(function () {
    var height = $(".summaryTable").height();
    $(".add-height-to-div").height((height) + 100);
});

//Enables the dock button when a rate plan has been selected
$('.usageDiv.usageActive').on('click touch', function () {
    $('.btn-default-blue').removeClass("disabled");
});

//Creates equal height columns inside of the modal window
$('.modal').on('show.bs.modal', function () {
    setTimeout(function () {
        var arr = $.makeArray()
        if ($(window).width() > 768) {
            $('.eq-height .eq-height-div').each(function () {
                arr.push($(this).outerHeight());
            });
            $('.eq-height .eq-height-div').css('height', Math.max.apply(Math, arr) + 'px');
        }
    }, 300);
});


$(document).ready(function () {
    initBRF()
});