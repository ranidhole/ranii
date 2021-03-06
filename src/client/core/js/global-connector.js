﻿'use strict';
var jQBRF = $.noConflict();
var BELL = (function (bell, $) {

    bell.brf = bell.brf || {};

    bell.brf.globalConnector = {

        // Selectors
        $window: $(window),
        $body: $('body'),
        $globalConnector: $('.connector'),
        $globalConnectorNav: $('.connector-nav'),
        $navCloseButton: $('.connector-nav-close-button'),
        $navOpenButton: $('.connector-nav-open-button'),
        $navAreas: $('.connector-area'),
        $navLobs: $('.connector-lob'),
        $navLobFlyouts: $('.connector-lob-flyout'),
        $mobileFederalBar: $('.federal-bar-mobile'),
        $supportSection: $('.connector-area_support'),
        $GNactiveLob: $('.connector-active-lob'),
        $GNactiveLobOffset: $('.connector-active-lob .active').offset().left,

        /**
         * Initializes the global connector.
         * @constructor
         */
        init: function () {

            var self = this;

            // Opens and closes mobile navigation menu
            this.$navOpenButton.on('click', (function (e) {
                this.toggleNavigation();
            }).bind(this));

            this.$navCloseButton.on('click', (function () {
                this.$body.removeClass('connector-active');
            }).bind(this));

            this.$supportSection.on('click', function (e) {
                if (self.$window.innerWidth() <= bell.brf.breakpoints.sm.max) {
                    var $target = $(e.target);

                    if ($target.is('a') && $target.parent().is('.connector-area')) {
                        e.preventDefault();
                    }
                }
            });

            this.$screen = $('<div class="screen"></div>');
            this.$body.append(this.$screen);

            this.$screen.on('click', (function () {
                this.toggleNavigation();
            }).bind(this));

            // Prevent redirecting to new page when certain links are clicked
            this.$mobileFederalBar.on('click', '.federal-bar-label', this.toggleMobileFederalSelection.bind(this));

            // Handles bulk of navigation clicks for mobile menu
            this.$globalConnector.on('click', this.globalConnectorClickHandler.bind(this));

            // Handles mobile federal bar selections
            this.$mobileFederalBar.on('click', 'li', this.toggleMobileFederalSelection.bind(this));
            
            // GN scrollTo active
            this.$GNactiveLob.animate({
                scrollLeft: Math.ceil(this.$GNactiveLobOffset)
            }, 'slow');

        },

        outside: function ($container, callback) {
            var self = this;
            $(document).off("click", self._outsideClickHandler).on("click", { '$container': $container, 'callback': callback }, self._outsideClickHandler);
        },

        _outsideClickHandler: function (e) {
            if (!e.data.$container.is(e.target) && e.data.$container.has(e.target).length === 0) {
                e.data.callback(e);
            }
        },



        toggleNavigation: function () {
            this.$navOpenButton.toggleClass('active');
            this.$body.toggleClass('connector-active');
        },

        /**
           * Handles click events for global connector for mobile(?).
        */
        globalConnectorClickHandler: function (event) {
            var $eventTarget = $(event.target),
            $globalConnectorLink = ($eventTarget.is('a')) ? $eventTarget : $eventTarget.closest('a'),
            $globalConnectorLinkParent = $globalConnectorLink.parent();

            if ($globalConnectorLinkParent.hasClass('connector-area')) {

                if ($globalConnectorLinkParent.hasClass("active")) {
                    this.$navAreas.removeClass("active");
                    this.$navLobFlyouts.removeClass("active");
                    this.$navLobs.removeClass("active");

                    $globalConnectorLinkParent.removeClass("active");

                    if ($globalConnectorLinkParent.hasClass('connector-area_no-lob-level')) {

                        var $closestLobFlyout = $globalConnectorLinkParent.find('.connector-lob-flyout');
                        $globalConnectorLinkParent.removeClass("active");
                        $closestLobFlyout.removeClass("active");
                    }

                } else {
                    this.$navAreas.removeClass("active");
                    this.$navLobFlyouts.removeClass("active");
                    this.$navLobs.removeClass("active");

                    $globalConnectorLinkParent.addClass("active");

                    if ($globalConnectorLinkParent.hasClass('connector-area_no-lob-level')) {

                        var $closestLobFlyout = $globalConnectorLinkParent.find('.connector-lob-flyout'),
                            $closestLob = $globalConnectorLinkParent.find('.connector-lob');

                        $globalConnectorLinkParent.addClass("active");
                        $closestLobFlyout.addClass("active");
                        $closestLob.addClass("active");
                    }
                }

            } else if ($globalConnectorLinkParent.hasClass('connector-lob')) {
                var $closestLobFlyout = $globalConnectorLinkParent.closest('.connector-lob-flyout');

                if ($globalConnectorLinkParent.hasClass("active")) {
                    this.$navLobs.removeClass("active");
                    $globalConnectorLinkParent.removeClass("active");
                    $closestLobFlyout.removeClass("active");
                } else {
                    this.$navLobs.removeClass("active");
                    $globalConnectorLinkParent.addClass("active");
                    $closestLobFlyout.addClass("active");

                    if ($globalConnectorLinkParent.hasClass('connector-area_no-lob-level')) {

                        var $closestLobFlyout = $globalConnectorLinkParent.find('.connector-lob-flyout'),
                            $closestLob = $globalConnectorLinkParent.find('.connector-lob');

                        $globalConnectorLinkParent.addClass("active");
                        $closestLobFlyout.addClass("active");
                        $closestLob.addClass("active");
                    }
                }
            } else if ($globalConnectorLinkParent.hasClass('federal-bar-mobile-lang-province')) {
                $globalConnectorLinkParent.toggleClass('active')
            }

        },


        /**
         * Toggles the open or closed state of the federal menu for mobile.
         * @param {object} event - Event object from click event handler
         */
        toggleMobileFederalSelection: function (event) {
            var $this = $(event.currentTarget);

        }
    };


    /**
		* showNavigation the open or closed state of the main menu for desktop.
	 */

    bell.brf.showNavigation = {

        $navAreas: $('.connector-area'),
        $navLobs: $('.connector-lob'),

        init: function () {

            var self = this;
            /*Showing flyouts on focus*/

            this.$navAreas.focus(function (e) {
                addHoverOnFocus(e.target);
            }).blur(function (e) {
                removeHoverOnFocus(e.target);
            });

            this.$navLobs.find('a').focus(function (e) {
                addHoverOnFocus(e.target);
            }).blur(function (e) {
                removeHoverOnFocus(e.target);
            });

            function addHoverOnFocus(element) {

                var $element = $(element);

                if ($element.is('.connector-area')) {
                    self.$navAreas.removeClass('hover');
                    $(element).addClass('hover');
                } else {
                    self.$navAreas.removeClass('hover');
                    $element.closest('.connector-area').addClass('hover');
                }
            }

            function removeHoverOnFocus(element) {

                var $element = $(element);

                if ($element.is('.connector-area')) {
                    $(element).removeClass('hover');
                } else {
                    $element.closest('.connector-area').removeClass('hover');
                }
            }

        }

    };

    /**
    * login the open or closed state of the Login modal.
    */

    bell.brf.login =
					{
					    $globalConnector: $('.connector'),
					    init: function () {
					        var self = this;
					        this.$globalConnector.on('click', '#login-register-button', function (event) {
					            event.preventDefault();

					            var $modal = $(".connector-login-modal");
					            $modal.toggleClass('active');
					            if (typeof s_oTrackPage !== "undefined") {
					                s_oTrackPage({ s_oAPT: "657-1-0", s_oARS: "" });
					            }

					            bell.brf.globalConnector.outside($(this).parent(), function () {
					                $modal.removeClass('active');
					            });
					        });

					    }
					};

    /**
    * preferences the open or closed state of the federal bar link provinces.
    */

    bell.brf.preferences =
                          {
                              provincesSelector: ".federal-bar-link-provinces",
                              $body: $('body'),

                              init: function () {
                                  var self = this;

                                  $('header *, footer *').on('focus', function (e) {

                                      var $provinceSelector = $('.federal-bar-link-provinces');

                                      if ($(e.target).closest('.federal-bar-link-provinces').length == 0) {
                                          if ($provinceSelector.hasClass('active')) {
                                              $provinceSelector.removeClass('active');
                                          }
                                      }

                                  });


                                  $(".js-current-language").on("click", function () {
                                      self.saveLanguage($(this));
                                  });

                                  $(".js-current-province").on("click", function (event) {

                                      var $this = $(this);
                                      var $container = $this.closest('footer').length === 1 ? $('footer') : $('header');
                                      var $provinceSelector = $container.find(self.provincesSelector);
                                      $provinceSelector.toggleClass("active");

                                      bell.brf.globalConnector.outside($this, function () {
                                          $provinceSelector.removeClass('active');
                                      });
                                  });


                                  $(".federal-bar-mobile").on("click", "#js-preferences-mobile", function () {
                                      $(".federal-bar-mobile-link-preferences").toggleClass("active");
                                  });

                                  $(".js-current-language-native").on("change", function (e, data) {
                                      self.saveProvince($(e.target).val());
                                  });

                                  $(self.provincesSelector).find(".checkboxes a.province-item").on("click", function (e, data) {
                                      self.saveProvince($(this).find("input").val());
                                  });

                                  $(".js-province-mobile").on("change", function (e, data) {
                                      self.saveProvince(this.value);
                                  });

                                  this.$initLangRegion = $('#initial-lang-region');
                                  this.$initLangRegion.on('submit', this.submitInitLangRegion.bind(this));

                                  $('#initial-lang-reigon-backdrop, #initial-lang-region').on('click', (function (e) {
                                      if (event.target == this) {
                                          $('body :focusable').off('focus', self._forceFocusInLangRegion.bind(self));
                                          self.$body.removeClass('init-lang-region-active');
                                      }
                                  }));

                                  // Determine whether to show language and region select on page load
                                  var gemini = this.getCookie('gemini');
                                  var $initialRegion = $("input[name='initial-region']:checked");

                                  //if (this.$initLangRegion.length > 0) {
                                  //    if (typeof gemini !== 'undefined') {
                                  //        $.each(gemini.split('|'), function () {
                                  //            var field = this.split('=');
                                  //            if (field[0] === 'region') {
                                  //                if (field[1].length <= 0) {
                                  //                    this.showLanguageRegion();
                                  //                } else {
                                  //                    return false;
                                  //                }
                                  //            }
                                  //        });
                                  //    } else {
                                  //        this.showLanguageRegion();
                                  //    }
                                  //}
                              },

                              showLanguageRegion: function () {
                                  $('body').addClass('init-lang-region-active');

                                  this.$initLangRegion.find('input[name=initial-lang]:checked').eq(0).focus();
                                  $('body :focusable').on('focus', this._forceFocusInLangRegion.bind(this));
                                  if (typeof s_oTrackPage !== "undefined") {
                                      s_oTrackPage({
                                          s_oAPT: "104-0-0",
                                          s_oPRM: "Provice selector",
                                          s_oLBC: "Select a language"
                                      });
                                  }
                              },

                              //Force focus to stay in the language/region lightbox until a combination is selected
                              _forceFocusInLangRegion: function (e) {
                                  var self = this;

                                  if ($(e.target).closest('#initial-lang-region').length < 1) {
                                      self.$initLangRegion.find('input[name=initial-lang]:checked').eq(0).focus();
                                  }
                              },

                              saveLanguage: function ($language) {
                                  var language = $language.data("alternative");
                                  var vanityurl = $language.data("vanityurl");
                                  this.setLanguageRegionCookieValue(language, null);
                                  var langRegex = /(language=\w+)|(lang=\w+)/i;

                                  if (vanityurl && vanityurl.length > 0) {
                                      if (langRegex.test(vanityurl)) {
                                          window.location = vanityurl.replace(langRegex, "lang=" + language);
                                      } else {
                                          window.location = vanityurl;
                                      }
                                  } else if (langRegex.test(location.href)) {
                                      location.href = location.href.replace(langRegex, "lang=" + language);
                                  } else {
                                      window.location.reload();
                                  }
                              },

                              saveProvince: function (province) {
                                  var language = $(".js-current-language").data("language");
                                  this.setLanguageRegionCookieValue(language, province);
                                  this.paramURLCheck("prov=", province);
                                  window.location.reload();
                              },
                              paramURLCheck: function (text, value) {
                                  var urlParam = window.location.search.split('&');
                                  var index = -1;
                                  var paramIndex = $(urlParam).each(function (listIndex) {
                                      if (this.indexOf(text) !== -1) {
                                          index = listIndex;
                                      }
                                  });
                                  if (index !== -1) {
                                      var pramString = text;
                                      if (index == 0) {
                                          pramString = "?" + text;
                                      }
                                      urlParam[index] = pramString + value;
                                      window.history.pushState("{\"location\":\"" + urlParam.join('&') + "\"}", urlParam.join('&'), urlParam.join('&'));
                                  }
                              },

                              //e.g. setLanguageRegionCookieValue("EN", "ON") or setLanguageRegionCookieValue("EN", "ON",true)
                              //incase of supplying only one value i.e. province then other should be null
                              //e.g. setLanguageRegionCookieValue(null, "ON") //it will check cookie value first
                              //e.g. setLanguageRegionCookieValue("EN","ON",true) //will create new cookie without leveraging current browser cookies
                              setLanguageRegionCookieValue: function (lang, region, larsegmenttype, bIgnorePreviousCookie) {
                                  var geminiCookieName = "gemini";
                                  var cookieVal = bIgnorePreviousCookie == true ? null : this.getCookie(geminiCookieName);
                                  var geminiCookieVal = this.getGeminiString(lang, region, cookieVal, larsegmenttype);
                                  var hostname = window.location.hostname;
                                  var domain = ".bell.ca";
                                  this.setCookie(geminiCookieName, geminiCookieVal, 90, domain);
                              },

                              getGeminiString: function (lang, region, cval, larsegmenttype) {
                                  var retVal = "region=" + region + "|language=" + lang + "|province=" + region + "|LarSegmentType=" + larsegmenttype;
                                  if (cval != null) {
                                      var strSpl = cval.split('|');

                                      if (region != null && region.length != 0) {
                                          strSpl[0] = "region=" + region;
                                          strSpl[2] = "province=" + region;
                                      }

                                      if (lang != null && lang.length != 0) {
                                          strSpl[1] = "language=" + lang;
                                      }

                                      if (larsegmenttype != null && larsegmenttype != undefined && larsegmenttype.length != 0) {
                                          strSpl[3] = "LarSegmentType=" + larsegmenttype;
                                      }

                                      retVal = strSpl[0] + "|" + strSpl[1] + "|" + strSpl[2] + "|" + strSpl[3];
                                  }

                                  return retVal;
                              },

                              setCookie: function (name, value, days, domain) {
                                  var expires = "", date = new Date();

                                  if (!days || isNaN(days)) {
                                      days = 365;
                                  }

                                  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                                  expires = "; expires=" + date.toGMTString();

                                  var setCookieVal = name + "=" + value + expires + "; path=/";

                                  if (domain) {
                                      setCookieVal += "; domain=" + domain;
                                  }

                                  document.cookie = setCookieVal;
                              },

                              getCookie: function (name) {
                                  var value = "; " + document.cookie;
                                  var parts = value.split("; " + name + "=");
                                  if (parts.length == 2) {
                                      return parts.pop().split(";").shift();
                                  }
                              },

                              submitInitLangRegion: function (event) {
                                  event.preventDefault();

                                  var lang = "EN";
                                  var region = "ON";

                                  var $initialLanguage = $("input[name='initial-lang']:checked");
                                  if ($initialLanguage.length > 0) {
                                      lang = $initialLanguage.val();
                                  }

                                  var $initialRegion = $("input[name='initial-region']:checked");
                                  if ($initialRegion.length > 0) {
                                      region = $initialRegion.val();
                                  }

                                  var currLang = $("#hdn_currentLang").val();
                                  var vanityURL = $("#hdn_vanityURL").val();
                                  var altVanityURL = $("#hdn_altVanityURL").val();

                                  this.setLanguageRegionCookieValue(lang, region, "", true);

                                  $('body :focusable').off('focus', this._forceFocusInLangRegion.bind(this));
                                  this.$body.removeClass('init-lang-region-active');

                                  if (currLang.toLowerCase() != lang.toLowerCase()) {
                                      window.location = altVanityURL;
                                  } else {
                                      window.location.reload(true);
                                  }
                              },

                              RedirectToPageProv: function (o, provAvl, locUrl) {
                                  var region = o.value;

                                  BELL.brf.preferences.setLanguageRegionCookieValue(null, region);

                                  var pound = "";
                                  var bpound = location.href;
                                  if (provAvl.indexOf(region) == -1) {
                                      window.location.href = locUrl + "?prov=" + region;
                                      return;
                                  }
                                  if (location.href.indexOf('#') !== -1) {
                                      pound = location.href.substring(location.href.indexOf('#'));
                                      bpound = location.href.substring(0, location.href.indexOf('#'));
                                  }

                                  var provRegex = /prov=\w+/;
                                  if (provRegex.test(location.href)) {
                                      location.href = location.href.replace(provRegex, "prov=" + region);
                                  } else {
                                      var sep = location.href.indexOf('?') !== -1 ? "&" : "?";
                                      location.href = bpound + sep + "prov=" + region + pound;
                                  }
                              }
                          };

    /**
    * search the used for navigation search box attempt.
    */

    bell.brf.search = {
        // Constants
        ACTIVE_CLASS: 'active',
        SEARCH_ACTIVE_CLASS: 'connector-search-active',
        OPEN_TRANSITION_TIME: 0,
        CLOSE_TRANSITION_TIME: 0,
        AUTOCOMPLETE_URL: 'http://www.bell.ca/Search/Search/GetAutoComplete',
        //AUTOCOMPLETE_URL: 'http://fesa-www.ids.int.bell.ca/Search/Search/GetAutoComplete',   
        CARET_CLASSES: 'caret caret_top-sm caret_top-md caret_top-lg',

        // Selectors
        $body: $('body'),
        $connector: $('.connector'),
        $screen: $('#search-screen'),

        /**
         * Initializes search component.
         * @constructor
         */
        init: function () {
            var self = this;
            // Initializes autocomplete suggestion widget
            var $inputs = $('.search-bar-header #topNavSearch,.search-bar-footer #topNavSearch');

            this.province = $('meta[name=province]').attr("content");
            this.language = $('meta[name=language]').attr("content");
            this.defaultXhrTimeout = 7500;

            $inputs.each((function (i, query) {
                this.initQuery(query);
            }).bind(this));
        },

        initQuery: function (query) {
            var self = this;
            var $query = $(query);
            var $form = $query.closest("form");
            var $reset = $form.find("[type='reset']");
            var $formWrap = $form.closest(".connector-search-wrap");
            var $suggestions = $($form.data("suggestions"));
            self.AUTOCOMPLETE_URL = $form.data("autocompletehost");

            var autocomplete;

            $query.autocomplete({
                source: function (request, response) {
                    self.autocompleteSource(request, response, $form, self.AUTOCOMPLETE_URL);
                },
                select: function (event, ui) {
                    var itemVal = ui.item.label;
                    if (itemVal.indexOf(":") > -1) {
                        location.href = itemVal.substring(itemVal.indexOf(":") + 1);
                    } else {
                        $query.val(itemVal);
                        $form.trigger('submit');
                    }

                },
                open: function (event, ui) {
                    self.openAutoComplete(event, ui, self, autocomplete);
                },
                appendTo: $form.data("suggestions"),
                minLength: 2
            }).autocomplete('widget');

            autocomplete = $query.data('ui-autocomplete');
            if ($suggestions.attr("id") != "footer-autocomplete-search-results") {
                $suggestions.children('.ui-autocomplete').addClass(self.CARET_CLASSES);
            }


            $query.on('keyup', (function (event) {
                this.handleQueryInput(event, $form, $reset, $formWrap, $query);
            }).bind(self));

            // Submits search query
            $form.on('submit', self.submit);

            // Clears autocomplete list when form is reset
            $form.on('reset', (function () {
                self.$body.removeClass(self.SEARCH_ACTIVE_CLASS);
                $reset.add(self.$screen).removeClass(self.ACTIVE_CLASS);
                $form.removeClass(self.ACTIVE_CLASS);
                autocomplete.term = null;
                $suggestions.children().empty()
            }));

            // Closes search if backdrop screen is clicked on
            self.$screen.on('click', (function () {
                $form.trigger('reset');
            }));

            if ($formWrap.length > 0) {
                // Opens search menu for mobile and tablet

                var $searchButton = $('#connector-search-button');

                $searchButton.on('click', (function (event) {
                    if ($formWrap.hasClass(this.ACTIVE_CLASS)) {
                        $searchButton.removeClass('active');
                        this.closeQueryInput(event, $formWrap, $form, $query);
                    } else {
                        $searchButton.addClass('active');
                        this.openQueryInput($formWrap, $query);
                    }
                }).bind(self));

            }
        },

        /**
        * Closes the search menu for mobile and tablet.
        * @param {object} event - Event handler
        */
        closeQueryInput: function (event, $formWrap, $form, $query) {

            var self = this;

            event.preventDefault();
            $formWrap.removeClass(this.ACTIVE_CLASS);
            $query.trigger('blur');
            setTimeout((function () {
                $form.trigger('reset');
                self.$connector.removeClass(self.SEARCH_ACTIVE_CLASS);
            }), self.OPEN_TRANSITION_TIME);
        },

        /**
        * Opens and closes autocomplete and query menu depending on query contents.
        * @param {object} event - Event handler
        */
        handleQueryInput: function (event, $form, $reset, $formWrap, $query) {
            var queryLength = $(event.currentTarget).val().length;
            if (queryLength > 0 && !$reset.hasClass(this.ACTIVE_CLASS)) {
                $reset.addClass(this.ACTIVE_CLASS);
                $form.addClass(this.ACTIVE_CLASS);
                if (!this.$connector.hasClass(this.SEARCH_ACTIVE_CLASS)) {
                    this.openQueryInput($formWrap, $query);
                }
            } else if (queryLength <= 0 && $reset.hasClass(this.ACTIVE_CLASS)) {
                $form.trigger('reset');
            }
        },

        /**
        * Opens the search menu for mobile and tablet.
        */
        openQueryInput: function ($formWrap, $query) {

            var self = this;

            this.$connector.addClass(this.SEARCH_ACTIVE_CLASS);

            setTimeout((function () {
                $formWrap.addClass(self.ACTIVE_CLASS);
            }), self.OPEN_TRANSITION_TIME);

            setTimeout((function () {
                $query.trigger('focus');
            }), 300);
        },

        openAutoComplete: function (event, ui, self, autocomplete) {
            var template = '<span class="ui-autocomplete-term">' + autocomplete.term + '</span>';
            autocomplete.menu.element.find('div.ui-menu-item-wrapper').each((function (i, $result) {


                var $result = $($result);
                var phrase = $result.text();

                if (phrase.indexOf(":") > -1)
                    phrase = phrase.substring(0, phrase.indexOf(":"));

                $result.html(phrase.replace(autocomplete.term, template));
            }));
            self.$body.addClass(self.SEARCH_ACTIVE_CLASS);
            self.$screen.addClass(self.ACTIVE_CLASS);
        },

        /**
        * Configures the source for jQuery-UI's autocomplete.
        * @param {object} request - Request to server containing search query
        * @param {object} response - Response from server queried
        */
        autocompleteSource: function (request, response, $form, url) {
            var mktseg = $form.data('mktseg');

            var xhr = $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                timeout: bell.brf.search.defaultXhrTimeout,
                data: {
                    q: request.term.trim(),
                    prov: bell.brf.search.province,
                    lang: bell.brf.search.language,
                    mktseg: mktseg,
                    ver: 'w'
                }
            });

            xhr.done(function (searchResults) {
                if (searchResults.length > 5) {
                    searchResults = searchResults.splice(0, 5);
                }

                response($.map(searchResults, function (result) {
                    var lbl = result;
                    var vl = result;
                    if (/<[^>]*>/g.test(vl))
                        vl = vl.replace(/<[^>]*>/g, '');
                    if (lbl.indexOf(":") > -1)
                        vl = vl.substring(0, vl.indexOf(":"));
                    return { label: lbl, value: vl };
                }));
            });

            xhr.error(function (e) {
                console.error('Search Autocomplete: Unable to query server: ', e);
            });
        },

        /**
         * Prevents form from submitting if query is empty.
         * @param {object} event - Event handler
         */
        submit: function () {
            var $form = $(this).closest("form");
            var $query = $form.find("input[name='query']");
            var raw = $query.val();
            var text = $(raw).text();
            $query.val(text.length > 0 ? text : raw);
            var action = $form.data('url').replace('#qbox#', $query.val());
            $form.prop('action', action);
            return true;
        }
    };

    return bell;

})(BELL || {}, $);


