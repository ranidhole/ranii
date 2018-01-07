
'use strict';
(function(bell, $) {
    bell.brf = bell.brf || {};


    bell.brf.utils = {
        init: function() {

            $.fn.throttledResize = function($) {
                return $ ? this.bind('resize', bell.brf.utils.debounce($, 100)) : this.trigger('debounce');
            };

            $(document).ready(function() {
                bell.brf.utils.hideBackToTopMobile();
                bell.brf.utils.hideBackToTopDesktop();

                $('#inqC2CImgContainer_AnchoredB').bind('DOMNodeInserted DOMSubtreeModified DOMNodeRemoved', function(event) {
                    bell.brf.utils.checkChatMobile();
                });

                $(window).on("orientationchange", function() {
                    if (bell.brf.utils.checkChatMobile()) {
                        bell.brf.utils.setBackToTopMobile($('#inqC2CImgContainer_AnchoredB').height() + 10);
                    }
                });

                $(window).scroll($.throttle(250, function() {
                    bell.brf.utils.checkChatMobile();
                    if ($(window).innerWidth() < 1025) {
                        bell.brf.utils.hideBackToTopDesktop();
                        if ($(this).scrollTop() > ($(window).innerHeight() - 150)) {
                            if (bell.brf.utils.checkChatMobile()) {
                                bell.brf.utils.setBackToTopMobile($('#inqC2CImgContainer_AnchoredB').height() + 10);
                            }
                            bell.brf.utils.showBackToTopMobile();
                        } else {
                            bell.brf.utils.hideBackToTopMobile();
                        }
                    } else {
                        bell.brf.utils.hideBackToTopMobile();
                        bell.brf.utils.showBackToTopDesktop();
                    }
                }));

                $('.brf-footer-backtotop-trigger').click(function() {
                    $('html,body').animate({ scrollTop: 0 }, 'slow');
                    return false;
                });
            });
        },

        setBackToTopMobile: function(bottomPosition) {
            $('.brf-footer-backtotop-trigger-mobile').css('bottom', bottomPosition);
        },

        showBackToTopDesktop: function() {
            $('.brf-footer-backtotop-desktop').show();
            $('.brf-footer-backtotop-desktop').css('display', 'block');
            $('.brf-footer-backtotop-trigger-desktop').show();
            $('.brf-footer-backtotop-trigger-desktop').css('display', 'block');
        },

        hideBackToTopDesktop: function() {
            $('.brf-footer-backtotop-desktop').hide();
            $('.brf-footer-backtotop-desktop').css('display', 'none');
            $('.brf-footer-backtotop-trigger-desktop').hide();
            $('.brf-footer-backtotop-trigger-desktop').css('display', 'none');
        },

        showBackToTopMobile: function() {
            $('.brf-footer-backtotop-mobile').show();
            $('.brf-footer-backtotop-mobile').css('display', 'block');
            $('.brf-footer-backtotop-trigger-mobile').show();
            $('.brf-footer-backtotop-trigger-mobile').css('display', 'block');
        },

        hideBackToTopMobile: function() {
            $('.brf-footer-backtotop-mobile').hide();
            $('.brf-footer-backtotop-mobile').css('display', 'none');
            $('.brf-footer-backtotop-trigger-mobile').hide();
            $('.brf-footer-backtotop-trigger-mobile').css('display', 'none');
        },

        checkChatMobile: function() {
            var chatMobile = false;
            if ($('#inqC2CImgContainer_AnchoredB').find('input').length && $('#inqC2CImgContainer_AnchoredB input').attr('src').indexOf('bell_mob_global_anchor') > -1) {
                chatMobile = true;
            }
            return chatMobile;
        }

    };

    $(document).ready(function() {

            $.each(bell.brf, function() {
                if (typeof this === 'object' && typeof this.init === 'function') {
                    try {
                        this.init();
                    } catch (e) {
                        console.error("Error initializing module: ", e);
                    }
                }
            });
    });
})(BELL, $);


(function (bell, $) {
    $(document).ready(function () {
        bell.brf.utils.init();
    });
})(BELL, $);
