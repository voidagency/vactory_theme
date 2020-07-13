/*
 * factory 
 * Responsive base theme for Drupal.
 * 
 *
 * Copyright (c) 2018, 
 * Released under the  license.
*/

//== Scaffolding
//
//## Settings for some of the most global objects.
// @todo: Add viewport example
// @todo: Add Variables example.
// @todo: update nomcloture.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory = Drupal.vactory || {};
    Drupal.vactory.utility = Drupal.vactory.utility || {};
    Drupal.vars = Drupal.vars || {};
    Drupal.vars.vactory = Drupal.vars.vactory || {};

    //== Variables
    //
    //## Global variables
    Drupal.vars.vactory = {
        lang: ($("html").attr("lang") && $("html").attr("lang").length) ? $("html").attr("lang").replace("eng", "en") : 'en',
        is_rtl: ($('html[dir=\'rtl\']').length) ? true : false
    };

})(jQuery, Drupal);
;//== Disable links
//
//## Target elements with CSS class .disablelink and prevent default.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.disableLink = function () {
        $('.disablelink').click(function (e) {
            e.preventDefault();
        });
    };

})(jQuery, Drupal);
;//== Files
//
//## Apply custom skin to upload fields.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.filesUpload = function () {

        var managedFile = jQuery('.form-managed-file, .form-item.form-type-file');
        var fileWrapper = jQuery('.skined-file-wrapper');
        if (managedFile.length) {
            managedFile.each(function (index, el) {

                // Move descriptions below input field.
                var descriptionField = $(el).next('.description');
                if (descriptionField.length) {
                    descriptionField.appendTo($(el).parent().parent());
                    descriptionField.addClass('file-description');
                }

                // Add label text to input field.
                $(el).append('<span class="help-block">' + Drupal.t("Upload your file") + '</span>');

                $(el).find('input[type="file"]').on('change', function (event) {
                    var $this = $(this);

                    if ($this[0].files.length) {
                        $this.closest('.form-item').find('label').text($this[0].files[0].name);
                        $this.closest('.form-item').find('.error').remove();
                    } else {
                        $this.closest('.form-item').find('label').text($this.closest('.form-item').attr('data-label'));
                        $this.closest('.form-item').find('.error').detach().insertAfter($this.closest('.form-item .form-managed-file'));
                    }
                });
                $(el).closest('.form-item').attr('data-label', $(el).closest('.form-item').find('label').text());
            });
        } else if (fileWrapper.length) {
            fileWrapper.find('input[type="file"]').on('change', function (event) {
                var $that = $(this);
                if ($that[0].files.length) {
                    fileWrapper.find('.help-block').text($that[0].files[0].name);
                } else {
                    fileWrapper.find('.help-block').text(Drupal.t('No file chosen'));
                }
            });
        }
    };

})(jQuery, Drupal);
;//== Go TOP Sticky Button.
//
//## Show or hide the sticky footer button
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.gotoStickyButton = function () {
        var $element = $('.vf-go-back-top'),
            $document = $('html, body');

        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $element.fadeIn(200);
            } else {
                $element.fadeOut(200);
            }
        });

        // Animate the scroll to top.
        $element.click(function (event) {
            event.preventDefault();
            $document.animate({scrollTop: 0}, 300);
        });
    };

})(jQuery, Drupal);
;//== Portrait / Landscape detection
//
//## Disable Portrait for Tablet & Landscape for Mobile.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.detectInterstitiel = function () {
        var $_body = $('body'),
            $_window = $(window);

        // Init defaults
        // Whatever we have passed this before or not.
        $_body.data('interstitielDisabled', false);

        // Apply interstitiel
        if (matchMedia("(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)").matches || matchMedia("(max-width: 768px) and (orientation: landscape)").matches) {
            $_body.addClass("interstitiel-mode");
        }

        // Wait until innerheight changes, for max 45 frames
        function orientationChanged() {
            var timeout = 45;
            return new window.Promise(function (resolve) {
                var go = function (i, height0) {
                    window.innerHeight != height0 || i >= timeout ?
                        resolve() :
                        window.requestAnimationFrame(function () {
                            go(i + 1, height0);
                        }); // jshint ignore:line
                };
                go(0, window.innerHeight);
            });
        }

        $_window.on("orientationchange", function () {
            orientationChanged().then(function () {
                // Apply interstitiel
                if ($_body.data('interstitielDisabled') === false) {
                    if (matchMedia("(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)").matches || matchMedia("(max-width: 768px) and (orientation: landscape)").matches) {
                        $_body.addClass("interstitiel-mode");
                    }
                }
            });
        });

        // Close Interstitiel
        $('#interstitiel-button--close').on("click touchstart", function (e) {
            e.preventDefault();
            $_body.removeClass("interstitiel-mode");
            $_body.data('interstitielDisabled', true);
        });
    };

})(jQuery, Drupal);
;//== Outdated Browser
//
//## Identify and upgrade old browsers.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.outdatedBrowser = function () {

        if (typeof outdatedBrowser == "undefined") {
            return;
        }

        // Get base path.
        var themeBasePath = Drupal.settings.basePath + Drupal.settings.vactory_theme.path;
        var languagePath = themeBasePath + '/bower_components/outdated-browser/outdatedbrowser/lang/';
        languagePath += Drupal.vars.vactory.lang + '.html';

        // Instance plugin.
        outdatedBrowser({
            bgColor: '#f25648',
            color: '#ffffff',
            lowerThan: 'transform',
            languagePath: languagePath
        });
    };

})(jQuery, Drupal);
;//== Smart Banner
//
//## Smart Banner support for iOS 4/5 and Android.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.smartBanner = function () {

        if (typeof $.smartbanner == "undefined") {
            return;
        }

        $.smartbanner({
            title: null, // What the title of the app should be in the banner (defaults to <title>)
            author: null, // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
            price: Drupal.t('FREE'), // Price of the app
            appStoreLanguage: 'us', // Language code for App Store
            inAppStore: Drupal.t('On the App Store'), // Text of price for iOS
            inGooglePlay: Drupal.t('In Google Play'), // Text of price for Android
            inAmazonAppStore: Drupal.t('In the Amazon Appstore'),
            inWindowsStore: Drupal.t('In the Windows Store'), // Text of price for Windows
            GooglePlayParams: null, // Aditional parameters for the market
            icon: null, // The URL of the icon (defaults to <meta name="apple-touch-icon">)
            iconGloss: null, // Force gloss effect for iOS even for precomposed
            url: null, // The URL for the button. Keep null if you want the button to link to the app store.
            button: Drupal.t('VIEW'), // Text for the install button
            scale: 'auto', // Scale based on viewport size (set to 1 to disable)
            speedIn: 300, // Show animation speed of the banner
            speedOut: 400, // Close animation speed of the banner
            daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
            daysReminder: 90, // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
            force: null, // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
            hideOnInstall: true, // Hide the banner after "VIEW" is clicked.
            layer: false, // Display as overlay layer or slide down the page
            iOSUniversalApp: true, // If the iOS App is a universal app for both iPad and iPhone, display Smart Banner to iPad users, too.
            appendToSelector: 'body', //Append the banner to a specific selector
            onInstall: function () {
                // alert('Click install');
            },
            onClose: function () {
                // alert('Click close');
            }
        });

    };

})(jQuery, Drupal);
;//== Tabs
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.bootstrap_tabs = function () {
        // Show first tab by default.
        // Ignore the "primary" tabs on the node edit page.
        if ($.fn.tab) {
            var tabs = $('.nav-tabs').not('.primary'),
                hash = window.location.hash;
            tabs.children('li').first().find('a').tab('show');

            if (hash) {
                $('.nav-tabs > li > a[href$="' + hash + '"]').tab('show');
            }
        }
    };

})(jQuery, Drupal);
;//== Views Date Filter
//
//## Apply datepicker > Months view mode.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.viewsDateFilter = function () {
        $('input[name*="date_filter_field_vactory_date"]').each(function () {
            $(this).datepicker('destroy');
            $(this).datepicker({
                language: Drupal.vars.vactory.lang,
                disableTouchKeyboard: true,
                format: "mm/yyyy",
                startView: 1,
                minViewMode: 1,
                autoclose: true
            });
        });
    };

})(jQuery, Drupal);
;//== Views Filter
//
//## Wrap views filters for mobile view.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.viewsFilter = function () {
        // Mobile views filters.
        // Add control panel button
        // Show filters in a modal
        // Only appear if there is content.
        if (!$('.view-empty').length) {
            var _m_control_panel_button = $('<button class="js btn btn-sm btn-primary btn-control-panel"><i class="icon-control-panel filter-gear-icon"></i></button>');
            var _m_control_panel_button_wrap_text_side = Drupal.vars.vactory.is_rtl ? 'text-left' : 'text-right';
            _m_control_panel_button.insertBefore('.view .view-filters');
            _m_control_panel_button.wrap('<div class="d-block d-sm-none ' + _m_control_panel_button_wrap_text_side + '"></div>');

            _m_control_panel_button.on('click', function () {
                $('.view .view-filters').slideToggle();
                //$.fancybox.open({
                //    src: '.view .view-filters',
                //    type: 'inline',
                //    opts: {
                //        animationDuration: 200,
                //        animationEffect: 'material',
                //        modal: true
                //    }
                //});
            });

            // Add help text.
            $('.view .view-filters').prepend('<h4 class="d-block d-sm-none">' + Drupal.t("Filter") + '</h4>');
        }
    };

})(jQuery, Drupal);
;//== WOW
//
//## WOW CSS animation as you scroll down a page.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.wow = function () {
        new WOW().init();
    };

})(jQuery, Drupal);
;//== Custom Select
//
//## Apply custom select
(function ($, Drupal) {
    "use strict";

    Drupal.behaviors.vactory_customSelect = {
        attach: function () {
            /*$.each($('select.selectpicker, select:not([multiple="multiple"]), #lang-dropdown-select-language'), function (i, el) {
                $(el).selectpicker({
                    style: null
                });
            });*/
            $('select:not([multiple="multiple"])').each(function(index, value){
                ($(value).is(':visible') && $(value).hasClass('js-autocomplete')) ? $(value).attr('data-live-search', true).attr('data-none-results-text', Drupal.t('Aucun résultat')) : null;
                ($(value).is(':visible')) ? $(value).selectpicker() : null;
            });
        }
    };
})(jQuery, Drupal);
;//== Datepicker
//
//## Apply datepicker
(function ($, Drupal) {
    "use strict";

    Drupal.behaviors.vactory_datePicker = {
        attach: function () {
            $('.datepicker').datepicker({
                language: Drupal.vars.vactory.lang,
                autoHide: true
            });
        }
    };

})(jQuery, Drupal);
;// Allow dropdown links to be clickable by showing dropdowns on hover/focus.
// Most of the work done here was implemented after an accessibility study.
// @see https://www.drupal.org/node/2500635
(function ($, Drupal) {
    Drupal.behaviors.bootstrap_dropdown = {
        attach: function (context) {
            // var $context = $(context);

            // $context.find('.dropdown').once('factory-dropdown').each(function () {
            //     var dropdown = this;
            //
            //     // Helper function to show the dropdown.
            //     function show() {
            //         if (!$(dropdown).hasClass('open')) {
            //             $('>[data-toggle="dropdown"]', dropdown).trigger('click.bs.dropdown');
            //         }
            //     }
            //
            //     // Helper function to hide the dropdown.
            //     function hide() {
            //         if ($(dropdown).hasClass('open')) {
            //             $('>[data-toggle="dropdown"]', dropdown).trigger('click.bs.dropdown');
            //         }
            //     }
            //
            //     // Show dropdown on hover and focus.
            //     $(this).on('mouseenter.factory.dropdown', function (e) {
            //         show();
            //     });
            //     $(this).on('mouseleave.factory.dropdown', function () {
            //         hide();
            //     });
            //
            //     $(this).on('keydown.factory.dropdown', function (e) {
            //         // Prevent up/down arrow from doing anything -- they conflict with
            //         // using focus to show the dropdown, and the default Bootstrap keydown
            //         // handler will trigger our click handler to visit the link.
            //         if (e.keyCode == 38 || e.keyCode == 40) {
            //             return false;
            //         }
            //         // Show/hide dropdown with spacebar.
            //         if (e.keyCode == 32) {
            //             $('>[data-toggle="dropdown"]', dropdown).trigger('click.bs.dropdown');
            //             return false;
            //         }
            //         // Hide the dropdown with the escape hey.
            //         if (e.keyCode == 27) {
            //             // Leave focus on the parent after it's hidden.
            //             $('>[data-toggle="dropdown"]', dropdown).focus();
            //             hide();
            //             return false;
            //         }
            //     });
            //
            //     // Allow a.dropdown-toggle to be clickable.
            //     if ($(this).has('> a.dropdown-toggle')) {
            //         $(this).on('click.factory.dropdown', function (e) {
            //             var $target = $(e.target);
            //             if ($target.parent().get(0) == dropdown && $target.is('a.dropdown-toggle') && $target.attr('href')) {
            //                 e.preventDefault();
            //                 window.location.href = $target.attr('href');
            //             }
            //         });
            //     }
            // });
            //
            // $context.find('body').once('factory-dropdown-focus').on('focusout.factory.dropdown', function (e) {
            //     var parent = $(e.target).closest('li.factory-dropdown-processed.open').get(0);
            //     if (parent) {
            //         // Defer to after all handlers so we can see where focus landed.
            //         setTimeout(function () {
            //             // Don't do anything if no element is focused - that can only
            //             // happen with the mouse and this is meant to close the menu
            //             // when the keyboard is used to change focus.
            //             if (!document.activeElement || document.activeElement === document.body) {
            //                 return;
            //             }
            //             // Hide the parent if it doesn't contain the now focused element
            //             // and is still open.
            //             if (!parent.contains(document.activeElement) && $(parent).hasClass('open')) {
            //                 $(parent).trigger('click.bs.dropdown');
            //             }
            //         }, 0);
            //     }
            // });

            // jQuery(document).on('click', '.mega-dropdown', function (e) {
            //     e.stopPropagation();
            // });
            // jQuery(document).on('click', '.navbar-nav > .dropdown', function(e) {
            //     e.stopPropagation();
            // });
            // $(".dropdown-submenu").click(function(){
            //     $(".dropdown-submenu > .dropdown-menu").toggleClass("show");
            // });
        }
    };
})(jQuery, Drupal);;////== Webform validation
////
////## Apply validation to webforms.
//(function ($, Drupal) {
//    "use strict";
//
//    Drupal.behaviors.vactory_formValidation = {
//        attach: function () {
//
//            // Form.
//            var $_forms = $('.node-webform');
//
//            // Update JQuery plugin
//            jQuery.extend(jQuery.validator.messages, {
//                // required:Drupal.t("This field is required."),
//                remote: Drupal.t("Please fix this field."),
//                email: Drupal.t("Please enter a valid email address."),
//                url: Drupal.t("Please enter a valid URL."),
//                date: Drupal.t("Please enter a valid date."),
//                dateISO: Drupal.t("Please enter a valid date (ISO)."),
//                number: Drupal.t("Please enter a valid number."),
//                digits: Drupal.t("Please enter only digits."),
//                creditcard: Drupal.t("Please enter a valid credit card number."),
//                equalTo: Drupal.t("Please enter the same value again."),
//                accept: Drupal.t("Please enter a value with a valid extension."),
//                maxlength: jQuery.validator.format(Drupal.t("Please enter no more than {0} characters.")),
//                minlength: jQuery.validator.format(Drupal.t("Please enter at least {0} characters.")),
//                rangelength: jQuery.validator.format(Drupal.t("Please enter a value between {0} and {1} characters long.")),
//                range: jQuery.validator.format(Drupal.t("Please enter a value between {0} and {1}.")),
//                max: jQuery.validator.format(Drupal.t("Please enter a value less than or equal to {0}.")),
//                min: jQuery.validator.format(Drupal.t("Please enter a value greater than or equal to {0}."))
//            });
//
//            $.validator.messages.required = function (param, input) {
//                var _input = $(input), _name = "";
//                // console.log(_input.is("#edit-mail"));
//                if (_input.is("#edit-date-end-datepicker-popup-0") === true) {
//                    _name = $(input).parents('#edit-date-end').siblings('label').text();
//                } else if (_input.is("#edit-date-start-datepicker-popup-0") === true) {
//                    _name = $(input).parents('#edit-date-start').siblings('label').text();
//                } else if (_input.is("#edit-pass") === true) {
//                    _name = $(input).siblings('label').text();
//                } else if (_input.is("input[type='text']") || _input.is("input[type='email']")) {
//                    _name = $(input).siblings('label').text();
//                } else if (_input.is("select")) {
//                    _name = $(input).parents('div,span').siblings('label').text();
//                } else if (_input.is("textarea")) {
//                    _name = $(input).parents('div').siblings('label').text();
//                } else if (_input.is("input[type='file']")) {
//                    _name = $(input).parents('#edit-image-ajax-wrapper').siblings('label').text();
//                } else if (_input.is("input[type='radio']")) {
//                    _name = $(input).parents('.form-radios').siblings('label').text();
//                } else if (_input.is("input[type='checkbox']")) {
//                    _name = Drupal.t("Terms and conditions");
//                }
//                return _name + Drupal.t(' is required');
//            };
//
//            jQuery.validator.addMethod('alphab', function (value, element) {
//                return this.optional(element) || /^[a-zA-Z\W\-_\s]+$/.test(value);
//            }, Drupal.t("This field accept just letters"));
//
//            jQuery.validator.addMethod('tele', function (value, element) {
//                return this.optional(element) || /^(06)((-).[0-9]+){4}$/.test(value);
//            }, Drupal.t("Please enter a valid phone number"));
//
//            jQuery.validator.addMethod('fullEmail', function (value, element) {
//                return this.optional(element) || /\S+@\S+\.\S+/.test(value);
//            }, Drupal.t("Please enter a valid email"));
//
//            jQuery.validator.addMethod('emailOrPhone', function (value, element) {
//                return $("#edit-email").val() !== "" || $("#edit-phone").val() !== "";
//            }, Drupal.t("You must provide at least one contact field"));
//
//            if ($_forms.length) {
//
//                $_forms.find('form').each(function () {
//                    var _this = $(this),
//                        _formid = _this.attr('id'),
//                        _errorsHTML = $('<ul></ul>').attr({
//                            'id': _formid,
//                            'class': 'validation-messages-box alert alert-danger'
//                        }).css('display', 'none'),
//                        _rules = {};
//
//                    $_forms.prepend(_errorsHTML);
//
//                    var __isTop = false;
//                    _this.validate({
//                        errorLabelContainer: $('#' + _formid),
//                        wrapper: 'li',
//                        ignore: '',
//                        rules: _rules,
//                        onkeyup: false,
//                        onclick: false,
//                        highlight: function (element) {
//                            var phoneLabelIndex = "";
//                            $.each(this.errorList, function (key, value) {
//                                if (value.element.name == 'phone' && value.method == 'emailOrPhone') {
//                                    phoneLabelIndex = key;
//                                }
//                            });
//                            if (phoneLabelIndex !== "") {
//                                this.errorList.splice(phoneLabelIndex, 1);
//                            }
//                            if (__isTop === false) {
//                                $('html,body').animate({scrollTop: 0}, 700);
//                                __isTop = true;
//                            }
//                            var _el = $(element);
//                            if (_el.is('select')) {
//                                _el.siblings('button').addClass('error');
//                                _el.siblings('.btn-group').find('button').addClass('error');
//                            } else if (_el.is('input:radio')) {
//                                _el.parents('.form-radios').addClass('radio-error');
//                            } else if (_el.is('input:file')) {
//                                _el.parents('.form-type-managed-file').addClass('error');
//                            } else {
//                                _el.addClass('error');
//                            }
//                        },
//                        unhighlight: function (element) {
//                            var _el = $(element);
//                            if (_el.is('select')) {
//                                _el.siblings('button').removeClass('error');
//                            } else if (_el.is('input:radio')) {
//                                _el.parents('.form-radios').removeClass('radio-error');
//                            } else if (_el.is('input:file')) {
//                                _el.parents('.form-type-managed-file').removeClass('error');
//                            } else {
//                                _el.removeClass('error');
//                            }
//                        }
//                    });
//                });
//            }
//        }
//    };
//
//})(jQuery, Drupal);
;//== Vactory Icons
//
//## Icons as prefix & suffix
(function ($, Drupal) {
    "use strict";

    Drupal.behaviors.setIcon = {
        attach: function () {
            // Icons for non input elements.
            $('[class*="suffix-icon-"]:not(input), [class*="prefix-icon-"]:not(input)').each(function (index, el) {
                var $_el = $(el);
                var $self = $_el;
                var _iconName = '';

                if ($_el.hasClass('js-has-icon')) {
                    return;
                }
                if ((!$_el.hasClass('js-has-icon')) && (!$_el.find('>[class*="icon-"]').length > 0)) { // jshint ignore:line
                    var _array = $_el.attr('class').split(' ');
                    $.each(_array, function (index) {
                        if (_array[index] !== '' && ( _array[index].indexOf("suffix-icon-") != -1 || _array[index].indexOf("prefix-icon-") != -1)) {
                            _iconName = _array[index].split('-icon-');
                        }
                    });
                    if ($_el.is('li')) {
                        $_el = $_el.find('>a');
                        $_el = ( $_el.length ) ? $_el : $_el.find('>.nolink');
                    }

                    if (_iconName[0] == "prefix") {
                        $_el.addClass('js-has-icon');
                        $_el.prepend('<i class="icon-' + _iconName[1] + '"></<i>');
                    } else {
                        $_el.addClass('js-has-icon');
                        $_el.append('<i class="icon-' + _iconName[1] + '"></<i>');
                    }
                    $self.addClass('js-has-icon');
                }
            });

            // Icons for input elements.
            $('input[class*="suffix-icon-"], input[class*="prefix-icon-"]').each(function (index, el) {
                var $_el = $(el);
                var $self = $_el;
                var _iconName = '';

                if ($_el.hasClass('js-has-icon')) {
                    return;
                }

                if ((!$_el.hasClass('js-has-icon')) && (!$_el.next('[class*="icon-"]').length > 0)) { // jshint ignore:line
                    $_el.addClass('js-has-icon');
                    $_el.parent().addClass('form-item--icon');

                    var _array = $_el.attr('class').split(' ');
                    $.each(_array, function (index) {
                        if (_array[index] !== '' && ( _array[index].indexOf("suffix-icon-") != -1 || _array[index].indexOf("prefix-icon-") != -1)) {
                            _iconName = _array[index].split('-icon-');
                        }
                    });

                    $_el.parent().addClass('form-item--icon-' + _iconName[0]);

                    if (_iconName[0] == "prefix") {
                        $_el.parent().addClass('js-has-icon has-icon').prepend('<i class="icon-' + _iconName[1] + '"></<i>');
                    } else {
                        $_el.parent().addClass('js-has-icon has-icon').append('<i class="icon-' + _iconName[1] + '"></<i>');
                    }
                    $self.addClass('js-has-icon');
                }
            });
        }
    };

})(jQuery, Drupal);
;// Bootstrap popover.

(function ($, Drupal) {
    "use strict";

    Drupal.behaviors.bootstrap_popover = {
        attach: function (context, setting) {
            if ($.fn.popover) {
                $("[data-toggle='popover']").popover();
            }
        }
    };

})(jQuery, Drupal);
;//== Custom Select Multiple
//
//## Apply multiple select
(function ($, Drupal) {
    "use strict";

    Drupal.behaviors.selectMultiple = {
        attach: function () {
            // Skin Select
            /*$.each($('select[multiple="multiple"]'), function (i, el) {
                $(el).multiselect({
                    nonSelectedText: Drupal.t('Selectionner...')
                });
            });

            $('.btn.multiselect').removeClass('btn-default');*/
        }
    };

})(jQuery, Drupal);
;//== Tooltip
//
//## Apply custom tooltip for links.
(function ($, Drupal) {
    "use strict";

    // Bootstrap tooltip.
    Drupal.behaviors.bootstrap_tooltip = {
        attach: function (context, setting) {
            if ($.fn.tooltip) {
                $("[data-toggle='tooltip']").tooltip();
            }
        }
    };

    // Factory tooltip.
    Drupal.behaviors.vtooltip = {
        attach: function () {
            $('[class*="has-tooltip"]').each(function () {
                var $self = $(this);

                if ($self.hasClass('js-tooltiped')) {
                    return;
                }

                // Modern tooltip.
                if ($self.hasClass('tooltip-modern')) {
                    var _content = $self.attr('title'),
                        _hasImage = false,
                        _imageSrc = '';

                    if ($self.attr('data-image')) {
                        _hasImage = true;
                        _imageSrc = $self.attr('data-image');
                    }

                    $self.addClass('v-tooltip v-tooltip-effect-1');
                    $self.wrapInner('<span class="v-tooltip-item"></span>');
                    if (!_hasImage) {
                        $self.append('<span class="v-tooltip-content clearfix"><span class="v-tooltip-text no-image"> ' + _content + ' </span></span>');
                    }
                    else {
                        $self.append('<span class="v-tooltip-content clearfix"><img src="' + _imageSrc + '" /><span class="v-tooltip-text"> ' + _content + ' </span></span>');
                    }
                    $self.find('.v-tooltip-content').on('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                }
                else {
                    // Bootstrap tooltip.
                    var _array = $self.attr('class').split(' '),
                        _placement = 'auto';

                    $.each(_array, function (index) {
                        if (_array[index] !== '' && _array[index].indexOf("has-tooltip--") != -1) {
                            _placement = _array[index].split('has-tooltip--')[1];
                        }
                    });

                    $self.tooltip({
                        placement: _placement
                    });
                }
                $self.addClass('js-tooltiped');
            });
        }
    };

})(jQuery, Drupal);
;//== Youtube Video
//
//## Apply jquery.mb.YTPlayer
(function ($, Drupal) {
    "use strict";

    Drupal.behaviors.YTPlayer = {
        attach: function () {
            var $element = $(".ytplayer");
            if (!$element.hasClass('mb_YTPlayer')) {
                $element.YTPlayer();
            }
        }
    };

})(jQuery, Drupal);
;/**
 * Provides an HTML markup for a button.
 *
 * @param {object} button
 *   Configuration object for function.
 * @param {string} button.icon
 *   Button icon using Vactory Font (example: icon-chevron-right, icon-chevron-left).
 * @param {object} button.text
 *   Button body text.
 * @param {object} button.cssClass
 *   Button css class name.
 *
 * Usage: Drupal.theme('vButtonMarkup', {'css': 'slick-next','icon': 'icon-chevron-right'})
 *
 * @return {string}
 *   A string of HTML with a button and an icon enclosed by a i.
 */

(function ($, Drupal) {
    "use strict";

    Drupal.theme.vButtonMarkup = function (button) {

        var buttonIcon = button.icon;
        var buttonText = button.text;

        // Assemble the markup--string manipulation is fast, but if this needs
        // to become more complex, we can switch to creating dom elements.
        var buttonMarkup = '<button type="button" class="' + button.css + '">';

        if (buttonIcon) {
            buttonMarkup += '<i class="' + buttonIcon + '"></i>';
        }

        if (buttonText) {
            buttonMarkup += buttonText;
        }

        buttonMarkup += '</button>';

        return buttonMarkup;
    };

})(jQuery, Drupal);
;//== Init
//
//## Load custom utilities.
(function (domready, Drupal, drupalSettings) {

    "use strict";

    domready(function () {
        Drupal.vactory.utility.wow();
        //Drupal.vactory.utility.outdatedBrowser();
        Drupal.vactory.utility.gotoStickyButton();
        Drupal.vactory.utility.viewsFilter();
        Drupal.vactory.utility.viewsDateFilter();
        //Drupal.vactory.utility.detectInterstitiel();
        Drupal.vactory.utility.disableLink();
        Drupal.vactory.utility.filesUpload();
        //Drupal.vactory.utility.smartBanner();
        Drupal.vactory.utility.bootstrap_tabs();
    });

})(domready, Drupal, window.drupalSettings);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl92YXJpYWJsZXMuanMiLCJkaXNhYmxlLWxpbmsuanMiLCJmaWxlcy11cGxvYWQuanMiLCJnby10b3AuanMiLCJpbnRlcnN0aXRpZWwuanMiLCJvdXRkYXRlZGJyb3dzZXIuanMiLCJzbWFydGJhbm5lci5qcyIsInRhYnMuanMiLCJ2aWV3cy1kYXRlLWZpbHRlci5qcyIsInZpZXdzLWZpbHRlci5qcyIsIndvdy5qcyIsImN1c3RvbS1zZWxlY3QuanMiLCJkYXRlcGlja2VyLmpzIiwiZHJvcGRvd24uanMiLCJmb3JtLXZhbGlkYXRpb24uanMiLCJpY29ucy5qcyIsInBvcG92ZXIuanMiLCJzZWxlY3QtbXVsdGlwbGUuanMiLCJ0b29sdGlwLmpzIiwieXQtdmlkZW8uanMiLCJidXR0b24uanMiLCJfaW5pdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzVJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZmFjdG9yeS5zY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLz09IFNjYWZmb2xkaW5nXG4vL1xuLy8jIyBTZXR0aW5ncyBmb3Igc29tZSBvZiB0aGUgbW9zdCBnbG9iYWwgb2JqZWN0cy5cbi8vIEB0b2RvOiBBZGQgdmlld3BvcnQgZXhhbXBsZVxuLy8gQHRvZG86IEFkZCBWYXJpYWJsZXMgZXhhbXBsZS5cbi8vIEB0b2RvOiB1cGRhdGUgbm9tY2xvdHVyZS5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBEcnVwYWwudmFjdG9yeSA9IERydXBhbC52YWN0b3J5IHx8IHt9O1xuICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkgPSBEcnVwYWwudmFjdG9yeS51dGlsaXR5IHx8IHt9O1xuICAgIERydXBhbC52YXJzID0gRHJ1cGFsLnZhcnMgfHwge307XG4gICAgRHJ1cGFsLnZhcnMudmFjdG9yeSA9IERydXBhbC52YXJzLnZhY3RvcnkgfHwge307XG5cbiAgICAvLz09IFZhcmlhYmxlc1xuICAgIC8vXG4gICAgLy8jIyBHbG9iYWwgdmFyaWFibGVzXG4gICAgRHJ1cGFsLnZhcnMudmFjdG9yeSA9IHtcbiAgICAgICAgbGFuZzogKCQoXCJodG1sXCIpLmF0dHIoXCJsYW5nXCIpICYmICQoXCJodG1sXCIpLmF0dHIoXCJsYW5nXCIpLmxlbmd0aCkgPyAkKFwiaHRtbFwiKS5hdHRyKFwibGFuZ1wiKS5yZXBsYWNlKFwiZW5nXCIsIFwiZW5cIikgOiAnZW4nLFxuICAgICAgICBpc19ydGw6ICgkKCdodG1sW2Rpcj1cXCdydGxcXCddJykubGVuZ3RoKSA/IHRydWUgOiBmYWxzZVxuICAgIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vPT0gRGlzYWJsZSBsaW5rc1xuLy9cbi8vIyMgVGFyZ2V0IGVsZW1lbnRzIHdpdGggQ1NTIGNsYXNzIC5kaXNhYmxlbGluayBhbmQgcHJldmVudCBkZWZhdWx0LlxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkuZGlzYWJsZUxpbmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5kaXNhYmxlbGluaycpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vPT0gRmlsZXNcbi8vXG4vLyMjIEFwcGx5IGN1c3RvbSBza2luIHRvIHVwbG9hZCBmaWVsZHMuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5maWxlc1VwbG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgbWFuYWdlZEZpbGUgPSBqUXVlcnkoJy5mb3JtLW1hbmFnZWQtZmlsZSwgLmZvcm0taXRlbS5mb3JtLXR5cGUtZmlsZScpO1xuICAgICAgICB2YXIgZmlsZVdyYXBwZXIgPSBqUXVlcnkoJy5za2luZWQtZmlsZS13cmFwcGVyJyk7XG4gICAgICAgIGlmIChtYW5hZ2VkRmlsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1hbmFnZWRGaWxlLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuXG4gICAgICAgICAgICAgICAgLy8gTW92ZSBkZXNjcmlwdGlvbnMgYmVsb3cgaW5wdXQgZmllbGQuXG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uRmllbGQgPSAkKGVsKS5uZXh0KCcuZGVzY3JpcHRpb24nKTtcbiAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRpb25GaWVsZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb25GaWVsZC5hcHBlbmRUbygkKGVsKS5wYXJlbnQoKS5wYXJlbnQoKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uRmllbGQuYWRkQ2xhc3MoJ2ZpbGUtZGVzY3JpcHRpb24nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgbGFiZWwgdGV4dCB0byBpbnB1dCBmaWVsZC5cbiAgICAgICAgICAgICAgICAkKGVsKS5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiPicgKyBEcnVwYWwudChcIlVwbG9hZCB5b3VyIGZpbGVcIikgKyAnPC9zcGFuPicpO1xuXG4gICAgICAgICAgICAgICAgJChlbCkuZmluZCgnaW5wdXRbdHlwZT1cImZpbGVcIl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCR0aGlzWzBdLmZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuY2xvc2VzdCgnLmZvcm0taXRlbScpLmZpbmQoJ2xhYmVsJykudGV4dCgkdGhpc1swXS5maWxlc1swXS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmNsb3Nlc3QoJy5mb3JtLWl0ZW0nKS5maW5kKCcuZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmNsb3Nlc3QoJy5mb3JtLWl0ZW0nKS5maW5kKCdsYWJlbCcpLnRleHQoJHRoaXMuY2xvc2VzdCgnLmZvcm0taXRlbScpLmF0dHIoJ2RhdGEtbGFiZWwnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5jbG9zZXN0KCcuZm9ybS1pdGVtJykuZmluZCgnLmVycm9yJykuZGV0YWNoKCkuaW5zZXJ0QWZ0ZXIoJHRoaXMuY2xvc2VzdCgnLmZvcm0taXRlbSAuZm9ybS1tYW5hZ2VkLWZpbGUnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkKGVsKS5jbG9zZXN0KCcuZm9ybS1pdGVtJykuYXR0cignZGF0YS1sYWJlbCcsICQoZWwpLmNsb3Nlc3QoJy5mb3JtLWl0ZW0nKS5maW5kKCdsYWJlbCcpLnRleHQoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWxlV3JhcHBlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZpbGVXcmFwcGVyLmZpbmQoJ2lucHV0W3R5cGU9XCJmaWxlXCJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciAkdGhhdCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKCR0aGF0WzBdLmZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBmaWxlV3JhcHBlci5maW5kKCcuaGVscC1ibG9jaycpLnRleHQoJHRoYXRbMF0uZmlsZXNbMF0ubmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZVdyYXBwZXIuZmluZCgnLmhlbHAtYmxvY2snKS50ZXh0KERydXBhbC50KCdObyBmaWxlIGNob3NlbicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vPT0gR28gVE9QIFN0aWNreSBCdXR0b24uXG4vL1xuLy8jIyBTaG93IG9yIGhpZGUgdGhlIHN0aWNreSBmb290ZXIgYnV0dG9uXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5nb3RvU3RpY2t5QnV0dG9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKCcudmYtZ28tYmFjay10b3AnKSxcbiAgICAgICAgICAgICRkb2N1bWVudCA9ICQoJ2h0bWwsIGJvZHknKTtcblxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZmFkZUluKDIwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmZhZGVPdXQoMjAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQW5pbWF0ZSB0aGUgc2Nyb2xsIHRvIHRvcC5cbiAgICAgICAgJGVsZW1lbnQuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJGRvY3VtZW50LmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDMwMCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vPT0gUG9ydHJhaXQgLyBMYW5kc2NhcGUgZGV0ZWN0aW9uXG4vL1xuLy8jIyBEaXNhYmxlIFBvcnRyYWl0IGZvciBUYWJsZXQgJiBMYW5kc2NhcGUgZm9yIE1vYmlsZS5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmRldGVjdEludGVyc3RpdGllbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRfYm9keSA9ICQoJ2JvZHknKSxcbiAgICAgICAgICAgICRfd2luZG93ID0gJCh3aW5kb3cpO1xuXG4gICAgICAgIC8vIEluaXQgZGVmYXVsdHNcbiAgICAgICAgLy8gV2hhdGV2ZXIgd2UgaGF2ZSBwYXNzZWQgdGhpcyBiZWZvcmUgb3Igbm90LlxuICAgICAgICAkX2JvZHkuZGF0YSgnaW50ZXJzdGl0aWVsRGlzYWJsZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gQXBwbHkgaW50ZXJzdGl0aWVsXG4gICAgICAgIGlmIChtYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiAxMDI0cHgpIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KVwiKS5tYXRjaGVzIHx8IG1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA3NjhweCkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKVwiKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAkX2JvZHkuYWRkQ2xhc3MoXCJpbnRlcnN0aXRpZWwtbW9kZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdhaXQgdW50aWwgaW5uZXJoZWlnaHQgY2hhbmdlcywgZm9yIG1heCA0NSBmcmFtZXNcbiAgICAgICAgZnVuY3Rpb24gb3JpZW50YXRpb25DaGFuZ2VkKCkge1xuICAgICAgICAgICAgdmFyIHRpbWVvdXQgPSA0NTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ28gPSBmdW5jdGlvbiAoaSwgaGVpZ2h0MCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgIT0gaGVpZ2h0MCB8fCBpID49IHRpbWVvdXQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvKGkgKyAxLCBoZWlnaHQwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGdvKDAsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRfd2luZG93Lm9uKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb3JpZW50YXRpb25DaGFuZ2VkKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gQXBwbHkgaW50ZXJzdGl0aWVsXG4gICAgICAgICAgICAgICAgaWYgKCRfYm9keS5kYXRhKCdpbnRlcnN0aXRpZWxEaXNhYmxlZCcpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogMTAyNHB4KSBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdClcIikubWF0Y2hlcyB8fCBtYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNzY4cHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJF9ib2R5LmFkZENsYXNzKFwiaW50ZXJzdGl0aWVsLW1vZGVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ2xvc2UgSW50ZXJzdGl0aWVsXG4gICAgICAgICQoJyNpbnRlcnN0aXRpZWwtYnV0dG9uLS1jbG9zZScpLm9uKFwiY2xpY2sgdG91Y2hzdGFydFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJF9ib2R5LnJlbW92ZUNsYXNzKFwiaW50ZXJzdGl0aWVsLW1vZGVcIik7XG4gICAgICAgICAgICAkX2JvZHkuZGF0YSgnaW50ZXJzdGl0aWVsRGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy89PSBPdXRkYXRlZCBCcm93c2VyXG4vL1xuLy8jIyBJZGVudGlmeSBhbmQgdXBncmFkZSBvbGQgYnJvd3NlcnMuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5vdXRkYXRlZEJyb3dzZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvdXRkYXRlZEJyb3dzZXIgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGJhc2UgcGF0aC5cbiAgICAgICAgdmFyIHRoZW1lQmFzZVBhdGggPSBEcnVwYWwuc2V0dGluZ3MuYmFzZVBhdGggKyBEcnVwYWwuc2V0dGluZ3MudmFjdG9yeV90aGVtZS5wYXRoO1xuICAgICAgICB2YXIgbGFuZ3VhZ2VQYXRoID0gdGhlbWVCYXNlUGF0aCArICcvYm93ZXJfY29tcG9uZW50cy9vdXRkYXRlZC1icm93c2VyL291dGRhdGVkYnJvd3Nlci9sYW5nLyc7XG4gICAgICAgIGxhbmd1YWdlUGF0aCArPSBEcnVwYWwudmFycy52YWN0b3J5LmxhbmcgKyAnLmh0bWwnO1xuXG4gICAgICAgIC8vIEluc3RhbmNlIHBsdWdpbi5cbiAgICAgICAgb3V0ZGF0ZWRCcm93c2VyKHtcbiAgICAgICAgICAgIGJnQ29sb3I6ICcjZjI1NjQ4JyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBsb3dlclRoYW46ICd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgbGFuZ3VhZ2VQYXRoOiBsYW5ndWFnZVBhdGhcbiAgICAgICAgfSk7XG4gICAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy89PSBTbWFydCBCYW5uZXJcbi8vXG4vLyMjIFNtYXJ0IEJhbm5lciBzdXBwb3J0IGZvciBpT1MgNC81IGFuZCBBbmRyb2lkLlxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkuc21hcnRCYW5uZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLnNtYXJ0YmFubmVyID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQuc21hcnRiYW5uZXIoe1xuICAgICAgICAgICAgdGl0bGU6IG51bGwsIC8vIFdoYXQgdGhlIHRpdGxlIG9mIHRoZSBhcHAgc2hvdWxkIGJlIGluIHRoZSBiYW5uZXIgKGRlZmF1bHRzIHRvIDx0aXRsZT4pXG4gICAgICAgICAgICBhdXRob3I6IG51bGwsIC8vIFdoYXQgdGhlIGF1dGhvciBvZiB0aGUgYXBwIHNob3VsZCBiZSBpbiB0aGUgYmFubmVyIChkZWZhdWx0cyB0byA8bWV0YSBuYW1lPVwiYXV0aG9yXCI+IG9yIGhvc3RuYW1lKVxuICAgICAgICAgICAgcHJpY2U6IERydXBhbC50KCdGUkVFJyksIC8vIFByaWNlIG9mIHRoZSBhcHBcbiAgICAgICAgICAgIGFwcFN0b3JlTGFuZ3VhZ2U6ICd1cycsIC8vIExhbmd1YWdlIGNvZGUgZm9yIEFwcCBTdG9yZVxuICAgICAgICAgICAgaW5BcHBTdG9yZTogRHJ1cGFsLnQoJ09uIHRoZSBBcHAgU3RvcmUnKSwgLy8gVGV4dCBvZiBwcmljZSBmb3IgaU9TXG4gICAgICAgICAgICBpbkdvb2dsZVBsYXk6IERydXBhbC50KCdJbiBHb29nbGUgUGxheScpLCAvLyBUZXh0IG9mIHByaWNlIGZvciBBbmRyb2lkXG4gICAgICAgICAgICBpbkFtYXpvbkFwcFN0b3JlOiBEcnVwYWwudCgnSW4gdGhlIEFtYXpvbiBBcHBzdG9yZScpLFxuICAgICAgICAgICAgaW5XaW5kb3dzU3RvcmU6IERydXBhbC50KCdJbiB0aGUgV2luZG93cyBTdG9yZScpLCAvLyBUZXh0IG9mIHByaWNlIGZvciBXaW5kb3dzXG4gICAgICAgICAgICBHb29nbGVQbGF5UGFyYW1zOiBudWxsLCAvLyBBZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIG1hcmtldFxuICAgICAgICAgICAgaWNvbjogbnVsbCwgLy8gVGhlIFVSTCBvZiB0aGUgaWNvbiAoZGVmYXVsdHMgdG8gPG1ldGEgbmFtZT1cImFwcGxlLXRvdWNoLWljb25cIj4pXG4gICAgICAgICAgICBpY29uR2xvc3M6IG51bGwsIC8vIEZvcmNlIGdsb3NzIGVmZmVjdCBmb3IgaU9TIGV2ZW4gZm9yIHByZWNvbXBvc2VkXG4gICAgICAgICAgICB1cmw6IG51bGwsIC8vIFRoZSBVUkwgZm9yIHRoZSBidXR0b24uIEtlZXAgbnVsbCBpZiB5b3Ugd2FudCB0aGUgYnV0dG9uIHRvIGxpbmsgdG8gdGhlIGFwcCBzdG9yZS5cbiAgICAgICAgICAgIGJ1dHRvbjogRHJ1cGFsLnQoJ1ZJRVcnKSwgLy8gVGV4dCBmb3IgdGhlIGluc3RhbGwgYnV0dG9uXG4gICAgICAgICAgICBzY2FsZTogJ2F1dG8nLCAvLyBTY2FsZSBiYXNlZCBvbiB2aWV3cG9ydCBzaXplIChzZXQgdG8gMSB0byBkaXNhYmxlKVxuICAgICAgICAgICAgc3BlZWRJbjogMzAwLCAvLyBTaG93IGFuaW1hdGlvbiBzcGVlZCBvZiB0aGUgYmFubmVyXG4gICAgICAgICAgICBzcGVlZE91dDogNDAwLCAvLyBDbG9zZSBhbmltYXRpb24gc3BlZWQgb2YgdGhlIGJhbm5lclxuICAgICAgICAgICAgZGF5c0hpZGRlbjogMTUsIC8vIER1cmF0aW9uIHRvIGhpZGUgdGhlIGJhbm5lciBhZnRlciBiZWluZyBjbG9zZWQgKDAgPSBhbHdheXMgc2hvdyBiYW5uZXIpXG4gICAgICAgICAgICBkYXlzUmVtaW5kZXI6IDkwLCAvLyBEdXJhdGlvbiB0byBoaWRlIHRoZSBiYW5uZXIgYWZ0ZXIgXCJWSUVXXCIgaXMgY2xpY2tlZCAqc2VwYXJhdGUgZnJvbSB3aGVuIHRoZSBjbG9zZSBidXR0b24gaXMgY2xpY2tlZCogKDAgPSBhbHdheXMgc2hvdyBiYW5uZXIpXG4gICAgICAgICAgICBmb3JjZTogbnVsbCwgLy8gQ2hvb3NlICdpb3MnLCAnYW5kcm9pZCcgb3IgJ3dpbmRvd3MnLiBEb24ndCBkbyBhIGJyb3dzZXIgY2hlY2ssIGp1c3QgYWx3YXlzIHNob3cgdGhpcyBiYW5uZXJcbiAgICAgICAgICAgIGhpZGVPbkluc3RhbGw6IHRydWUsIC8vIEhpZGUgdGhlIGJhbm5lciBhZnRlciBcIlZJRVdcIiBpcyBjbGlja2VkLlxuICAgICAgICAgICAgbGF5ZXI6IGZhbHNlLCAvLyBEaXNwbGF5IGFzIG92ZXJsYXkgbGF5ZXIgb3Igc2xpZGUgZG93biB0aGUgcGFnZVxuICAgICAgICAgICAgaU9TVW5pdmVyc2FsQXBwOiB0cnVlLCAvLyBJZiB0aGUgaU9TIEFwcCBpcyBhIHVuaXZlcnNhbCBhcHAgZm9yIGJvdGggaVBhZCBhbmQgaVBob25lLCBkaXNwbGF5IFNtYXJ0IEJhbm5lciB0byBpUGFkIHVzZXJzLCB0b28uXG4gICAgICAgICAgICBhcHBlbmRUb1NlbGVjdG9yOiAnYm9keScsIC8vQXBwZW5kIHRoZSBiYW5uZXIgdG8gYSBzcGVjaWZpYyBzZWxlY3RvclxuICAgICAgICAgICAgb25JbnN0YWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gYWxlcnQoJ0NsaWNrIGluc3RhbGwnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gYWxlcnQoJ0NsaWNrIGNsb3NlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy89PSBUYWJzXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5ib290c3RyYXBfdGFicyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gU2hvdyBmaXJzdCB0YWIgYnkgZGVmYXVsdC5cbiAgICAgICAgLy8gSWdub3JlIHRoZSBcInByaW1hcnlcIiB0YWJzIG9uIHRoZSBub2RlIGVkaXQgcGFnZS5cbiAgICAgICAgaWYgKCQuZm4udGFiKSB7XG4gICAgICAgICAgICB2YXIgdGFicyA9ICQoJy5uYXYtdGFicycpLm5vdCgnLnByaW1hcnknKSxcbiAgICAgICAgICAgICAgICBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgICAgICB0YWJzLmNoaWxkcmVuKCdsaScpLmZpcnN0KCkuZmluZCgnYScpLnRhYignc2hvdycpO1xuXG4gICAgICAgICAgICBpZiAoaGFzaCkge1xuICAgICAgICAgICAgICAgICQoJy5uYXYtdGFicyA+IGxpID4gYVtocmVmJD1cIicgKyBoYXNoICsgJ1wiXScpLnRhYignc2hvdycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy89PSBWaWV3cyBEYXRlIEZpbHRlclxuLy9cbi8vIyMgQXBwbHkgZGF0ZXBpY2tlciA+IE1vbnRocyB2aWV3IG1vZGUuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS52aWV3c0RhdGVGaWx0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2lucHV0W25hbWUqPVwiZGF0ZV9maWx0ZXJfZmllbGRfdmFjdG9yeV9kYXRlXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmRhdGVwaWNrZXIoJ2Rlc3Ryb3knKTtcbiAgICAgICAgICAgICQodGhpcykuZGF0ZXBpY2tlcih7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IERydXBhbC52YXJzLnZhY3RvcnkubGFuZyxcbiAgICAgICAgICAgICAgICBkaXNhYmxlVG91Y2hLZXlib2FyZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IFwibW0veXl5eVwiLFxuICAgICAgICAgICAgICAgIHN0YXJ0VmlldzogMSxcbiAgICAgICAgICAgICAgICBtaW5WaWV3TW9kZTogMSxcbiAgICAgICAgICAgICAgICBhdXRvY2xvc2U6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IFZpZXdzIEZpbHRlclxuLy9cbi8vIyMgV3JhcCB2aWV3cyBmaWx0ZXJzIGZvciBtb2JpbGUgdmlldy5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LnZpZXdzRmlsdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBNb2JpbGUgdmlld3MgZmlsdGVycy5cbiAgICAgICAgLy8gQWRkIGNvbnRyb2wgcGFuZWwgYnV0dG9uXG4gICAgICAgIC8vIFNob3cgZmlsdGVycyBpbiBhIG1vZGFsXG4gICAgICAgIC8vIE9ubHkgYXBwZWFyIGlmIHRoZXJlIGlzIGNvbnRlbnQuXG4gICAgICAgIGlmICghJCgnLnZpZXctZW1wdHknKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBfbV9jb250cm9sX3BhbmVsX2J1dHRvbiA9ICQoJzxidXR0b24gY2xhc3M9XCJqcyBidG4gYnRuLXNtIGJ0bi1wcmltYXJ5IGJ0bi1jb250cm9sLXBhbmVsXCI+PGkgY2xhc3M9XCJpY29uLWNvbnRyb2wtcGFuZWwgZmlsdGVyLWdlYXItaWNvblwiPjwvaT48L2J1dHRvbj4nKTtcbiAgICAgICAgICAgIHZhciBfbV9jb250cm9sX3BhbmVsX2J1dHRvbl93cmFwX3RleHRfc2lkZSA9IERydXBhbC52YXJzLnZhY3RvcnkuaXNfcnRsID8gJ3RleHQtbGVmdCcgOiAndGV4dC1yaWdodCc7XG4gICAgICAgICAgICBfbV9jb250cm9sX3BhbmVsX2J1dHRvbi5pbnNlcnRCZWZvcmUoJy52aWV3IC52aWV3LWZpbHRlcnMnKTtcbiAgICAgICAgICAgIF9tX2NvbnRyb2xfcGFuZWxfYnV0dG9uLndyYXAoJzxkaXYgY2xhc3M9XCJkLWJsb2NrIGQtc20tbm9uZSAnICsgX21fY29udHJvbF9wYW5lbF9idXR0b25fd3JhcF90ZXh0X3NpZGUgKyAnXCI+PC9kaXY+Jyk7XG5cbiAgICAgICAgICAgIF9tX2NvbnRyb2xfcGFuZWxfYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCcudmlldyAudmlldy1maWx0ZXJzJykuc2xpZGVUb2dnbGUoKTtcbiAgICAgICAgICAgICAgICAvLyQuZmFuY3lib3gub3Blbih7XG4gICAgICAgICAgICAgICAgLy8gICAgc3JjOiAnLnZpZXcgLnZpZXctZmlsdGVycycsXG4gICAgICAgICAgICAgICAgLy8gICAgdHlwZTogJ2lubGluZScsXG4gICAgICAgICAgICAgICAgLy8gICAgb3B0czoge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICBhbmltYXRpb25FZmZlY3Q6ICdtYXRlcmlhbCcsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG1vZGFsOiB0cnVlXG4gICAgICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgICAgIC8vfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQWRkIGhlbHAgdGV4dC5cbiAgICAgICAgICAgICQoJy52aWV3IC52aWV3LWZpbHRlcnMnKS5wcmVwZW5kKCc8aDQgY2xhc3M9XCJkLWJsb2NrIGQtc20tbm9uZVwiPicgKyBEcnVwYWwudChcIkZpbHRlclwiKSArICc8L2g0PicpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy89PSBXT1dcbi8vXG4vLyMjIFdPVyBDU1MgYW5pbWF0aW9uIGFzIHlvdSBzY3JvbGwgZG93biBhIHBhZ2UuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS53b3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG5ldyBXT1coKS5pbml0KCk7XG4gICAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy89PSBDdXN0b20gU2VsZWN0XG4vL1xuLy8jIyBBcHBseSBjdXN0b20gc2VsZWN0XG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgRHJ1cGFsLmJlaGF2aW9ycy52YWN0b3J5X2N1c3RvbVNlbGVjdCA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvKiQuZWFjaCgkKCdzZWxlY3Quc2VsZWN0cGlja2VyLCBzZWxlY3Q6bm90KFttdWx0aXBsZT1cIm11bHRpcGxlXCJdKSwgI2xhbmctZHJvcGRvd24tc2VsZWN0LWxhbmd1YWdlJyksIGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgICAgICQoZWwpLnNlbGVjdHBpY2tlcih7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBudWxsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICAgICAgJCgnc2VsZWN0Om5vdChbbXVsdGlwbGU9XCJtdWx0aXBsZVwiXSknKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgKCQodmFsdWUpLmlzKCc6dmlzaWJsZScpICYmICQodmFsdWUpLmhhc0NsYXNzKCdqcy1hdXRvY29tcGxldGUnKSkgPyAkKHZhbHVlKS5hdHRyKCdkYXRhLWxpdmUtc2VhcmNoJywgdHJ1ZSkuYXR0cignZGF0YS1ub25lLXJlc3VsdHMtdGV4dCcsIERydXBhbC50KCdBdWN1biByw6lzdWx0YXQnKSkgOiBudWxsO1xuICAgICAgICAgICAgICAgICgkKHZhbHVlKS5pcygnOnZpc2libGUnKSkgPyAkKHZhbHVlKS5zZWxlY3RwaWNrZXIoKSA6IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IERhdGVwaWNrZXJcbi8vXG4vLyMjIEFwcGx5IGRhdGVwaWNrZXJcbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBEcnVwYWwuYmVoYXZpb3JzLnZhY3RvcnlfZGF0ZVBpY2tlciA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcuZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlOiBEcnVwYWwudmFycy52YWN0b3J5LmxhbmcsXG4gICAgICAgICAgICAgICAgYXV0b0hpZGU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy8gQWxsb3cgZHJvcGRvd24gbGlua3MgdG8gYmUgY2xpY2thYmxlIGJ5IHNob3dpbmcgZHJvcGRvd25zIG9uIGhvdmVyL2ZvY3VzLlxuLy8gTW9zdCBvZiB0aGUgd29yayBkb25lIGhlcmUgd2FzIGltcGxlbWVudGVkIGFmdGVyIGFuIGFjY2Vzc2liaWxpdHkgc3R1ZHkuXG4vLyBAc2VlIGh0dHBzOi8vd3d3LmRydXBhbC5vcmcvbm9kZS8yNTAwNjM1XG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIERydXBhbC5iZWhhdmlvcnMuYm9vdHN0cmFwX2Ryb3Bkb3duID0ge1xuICAgICAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgICAgICAvLyB2YXIgJGNvbnRleHQgPSAkKGNvbnRleHQpO1xuXG4gICAgICAgICAgICAvLyAkY29udGV4dC5maW5kKCcuZHJvcGRvd24nKS5vbmNlKCdmYWN0b3J5LWRyb3Bkb3duJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyAgICAgdmFyIGRyb3Bkb3duID0gdGhpcztcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHNob3cgdGhlIGRyb3Bkb3duLlxuICAgICAgICAgICAgLy8gICAgIGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmICghJChkcm9wZG93bikuaGFzQ2xhc3MoJ29wZW4nKSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgJCgnPltkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJywgZHJvcGRvd24pLnRyaWdnZXIoJ2NsaWNrLmJzLmRyb3Bkb3duJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byBoaWRlIHRoZSBkcm9wZG93bi5cbiAgICAgICAgICAgIC8vICAgICBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgICAgICAgLy8gICAgICAgICBpZiAoJChkcm9wZG93bikuaGFzQ2xhc3MoJ29wZW4nKSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgJCgnPltkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJywgZHJvcGRvd24pLnRyaWdnZXIoJ2NsaWNrLmJzLmRyb3Bkb3duJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgIC8vIFNob3cgZHJvcGRvd24gb24gaG92ZXIgYW5kIGZvY3VzLlxuICAgICAgICAgICAgLy8gICAgICQodGhpcykub24oJ21vdXNlZW50ZXIuZmFjdG9yeS5kcm9wZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHNob3coKTtcbiAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICAkKHRoaXMpLm9uKCdtb3VzZWxlYXZlLmZhY3RvcnkuZHJvcGRvd24nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICAgJCh0aGlzKS5vbigna2V5ZG93bi5mYWN0b3J5LmRyb3Bkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgLy8gUHJldmVudCB1cC9kb3duIGFycm93IGZyb20gZG9pbmcgYW55dGhpbmcgLS0gdGhleSBjb25mbGljdCB3aXRoXG4gICAgICAgICAgICAvLyAgICAgICAgIC8vIHVzaW5nIGZvY3VzIHRvIHNob3cgdGhlIGRyb3Bkb3duLCBhbmQgdGhlIGRlZmF1bHQgQm9vdHN0cmFwIGtleWRvd25cbiAgICAgICAgICAgIC8vICAgICAgICAgLy8gaGFuZGxlciB3aWxsIHRyaWdnZXIgb3VyIGNsaWNrIGhhbmRsZXIgdG8gdmlzaXQgdGhlIGxpbmsuXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMzggfHwgZS5rZXlDb2RlID09IDQwKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgLy8gU2hvdy9oaWRlIGRyb3Bkb3duIHdpdGggc3BhY2ViYXIuXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMzIpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICQoJz5bZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXScsIGRyb3Bkb3duKS50cmlnZ2VyKCdjbGljay5icy5kcm9wZG93bicpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgIC8vIEhpZGUgdGhlIGRyb3Bkb3duIHdpdGggdGhlIGVzY2FwZSBoZXkuXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMjcpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIExlYXZlIGZvY3VzIG9uIHRoZSBwYXJlbnQgYWZ0ZXIgaXQncyBoaWRkZW4uXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAkKCc+W2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nLCBkcm9wZG93bikuZm9jdXMoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgICAvLyBBbGxvdyBhLmRyb3Bkb3duLXRvZ2dsZSB0byBiZSBjbGlja2FibGUuXG4gICAgICAgICAgICAvLyAgICAgaWYgKCQodGhpcykuaGFzKCc+IGEuZHJvcGRvd24tdG9nZ2xlJykpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgJCh0aGlzKS5vbignY2xpY2suZmFjdG9yeS5kcm9wZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB2YXIgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYgKCR0YXJnZXQucGFyZW50KCkuZ2V0KDApID09IGRyb3Bkb3duICYmICR0YXJnZXQuaXMoJ2EuZHJvcGRvd24tdG9nZ2xlJykgJiYgJHRhcmdldC5hdHRyKCdocmVmJykpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAkdGFyZ2V0LmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gJGNvbnRleHQuZmluZCgnYm9keScpLm9uY2UoJ2ZhY3RvcnktZHJvcGRvd24tZm9jdXMnKS5vbignZm9jdXNvdXQuZmFjdG9yeS5kcm9wZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLyAgICAgdmFyIHBhcmVudCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJ2xpLmZhY3RvcnktZHJvcGRvd24tcHJvY2Vzc2VkLm9wZW4nKS5nZXQoMCk7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgLy8gICAgICAgICAvLyBEZWZlciB0byBhZnRlciBhbGwgaGFuZGxlcnMgc28gd2UgY2FuIHNlZSB3aGVyZSBmb2N1cyBsYW5kZWQuXG4gICAgICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgbm8gZWxlbWVudCBpcyBmb2N1c2VkIC0gdGhhdCBjYW4gb25seVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8gaGFwcGVuIHdpdGggdGhlIG1vdXNlIGFuZCB0aGlzIGlzIG1lYW50IHRvIGNsb3NlIHRoZSBtZW51XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyB3aGVuIHRoZSBrZXlib2FyZCBpcyB1c2VkIHRvIGNoYW5nZSBmb2N1cy5cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGlmICghZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8gSGlkZSB0aGUgcGFyZW50IGlmIGl0IGRvZXNuJ3QgY29udGFpbiB0aGUgbm93IGZvY3VzZWQgZWxlbWVudFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8gYW5kIGlzIHN0aWxsIG9wZW4uXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBpZiAoIXBhcmVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAmJiAkKHBhcmVudCkuaGFzQ2xhc3MoJ29wZW4nKSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICQocGFyZW50KS50cmlnZ2VyKCdjbGljay5icy5kcm9wZG93bicpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgLy8galF1ZXJ5KGRvY3VtZW50KS5vbignY2xpY2snLCAnLm1lZ2EtZHJvcGRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgLy8gICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIC8vIGpRdWVyeShkb2N1bWVudCkub24oJ2NsaWNrJywgJy5uYXZiYXItbmF2ID4gLmRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLy8gICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIC8vICQoXCIuZHJvcGRvd24tc3VibWVudVwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gICAgICQoXCIuZHJvcGRvd24tc3VibWVudSA+IC5kcm9wZG93bi1tZW51XCIpLnRvZ2dsZUNsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTsiLCIvLy8vPT0gV2ViZm9ybSB2YWxpZGF0aW9uXG4vLy8vXG4vLy8vIyMgQXBwbHkgdmFsaWRhdGlvbiB0byB3ZWJmb3Jtcy5cbi8vKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbi8vICAgIFwidXNlIHN0cmljdFwiO1xuLy9cbi8vICAgIERydXBhbC5iZWhhdmlvcnMudmFjdG9yeV9mb3JtVmFsaWRhdGlvbiA9IHtcbi8vICAgICAgICBhdHRhY2g6IGZ1bmN0aW9uICgpIHtcbi8vXG4vLyAgICAgICAgICAgIC8vIEZvcm0uXG4vLyAgICAgICAgICAgIHZhciAkX2Zvcm1zID0gJCgnLm5vZGUtd2ViZm9ybScpO1xuLy9cbi8vICAgICAgICAgICAgLy8gVXBkYXRlIEpRdWVyeSBwbHVnaW5cbi8vICAgICAgICAgICAgalF1ZXJ5LmV4dGVuZChqUXVlcnkudmFsaWRhdG9yLm1lc3NhZ2VzLCB7XG4vLyAgICAgICAgICAgICAgICAvLyByZXF1aXJlZDpEcnVwYWwudChcIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCIpLFxuLy8gICAgICAgICAgICAgICAgcmVtb3RlOiBEcnVwYWwudChcIlBsZWFzZSBmaXggdGhpcyBmaWVsZC5cIiksXG4vLyAgICAgICAgICAgICAgICBlbWFpbDogRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiKSxcbi8vICAgICAgICAgICAgICAgIHVybDogRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBVUkwuXCIpLFxuLy8gICAgICAgICAgICAgICAgZGF0ZTogRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlLlwiKSxcbi8vICAgICAgICAgICAgICAgIGRhdGVJU086IERydXBhbC50KFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF0ZSAoSVNPKS5cIiksXG4vLyAgICAgICAgICAgICAgICBudW1iZXI6IERydXBhbC50KFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgbnVtYmVyLlwiKSxcbi8vICAgICAgICAgICAgICAgIGRpZ2l0czogRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgb25seSBkaWdpdHMuXCIpLFxuLy8gICAgICAgICAgICAgICAgY3JlZGl0Y2FyZDogRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBjcmVkaXQgY2FyZCBudW1iZXIuXCIpLFxuLy8gICAgICAgICAgICAgICAgZXF1YWxUbzogRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgdGhlIHNhbWUgdmFsdWUgYWdhaW4uXCIpLFxuLy8gICAgICAgICAgICAgICAgYWNjZXB0OiBEcnVwYWwudChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIHdpdGggYSB2YWxpZCBleHRlbnNpb24uXCIpLFxuLy8gICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChEcnVwYWwudChcIlBsZWFzZSBlbnRlciBubyBtb3JlIHRoYW4gezB9IGNoYXJhY3RlcnMuXCIpKSxcbi8vICAgICAgICAgICAgICAgIG1pbmxlbmd0aDogalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQoRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIpKSxcbi8vICAgICAgICAgICAgICAgIHJhbmdlbGVuZ3RoOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChEcnVwYWwudChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGJldHdlZW4gezB9IGFuZCB7MX0gY2hhcmFjdGVycyBsb25nLlwiKSksXG4vLyAgICAgICAgICAgICAgICByYW5nZTogalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQoRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9LlwiKSksXG4vLyAgICAgICAgICAgICAgICBtYXg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KERydXBhbC50KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHswfS5cIikpLFxuLy8gICAgICAgICAgICAgICAgbWluOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChEcnVwYWwudChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB7MH0uXCIpKVxuLy8gICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICQudmFsaWRhdG9yLm1lc3NhZ2VzLnJlcXVpcmVkID0gZnVuY3Rpb24gKHBhcmFtLCBpbnB1dCkge1xuLy8gICAgICAgICAgICAgICAgdmFyIF9pbnB1dCA9ICQoaW5wdXQpLCBfbmFtZSA9IFwiXCI7XG4vLyAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhfaW5wdXQuaXMoXCIjZWRpdC1tYWlsXCIpKTtcbi8vICAgICAgICAgICAgICAgIGlmIChfaW5wdXQuaXMoXCIjZWRpdC1kYXRlLWVuZC1kYXRlcGlja2VyLXBvcHVwLTBcIikgPT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICAgICBfbmFtZSA9ICQoaW5wdXQpLnBhcmVudHMoJyNlZGl0LWRhdGUtZW5kJykuc2libGluZ3MoJ2xhYmVsJykudGV4dCgpO1xuLy8gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfaW5wdXQuaXMoXCIjZWRpdC1kYXRlLXN0YXJ0LWRhdGVwaWNrZXItcG9wdXAtMFwiKSA9PT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgICAgIF9uYW1lID0gJChpbnB1dCkucGFyZW50cygnI2VkaXQtZGF0ZS1zdGFydCcpLnNpYmxpbmdzKCdsYWJlbCcpLnRleHQoKTtcbi8vICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX2lucHV0LmlzKFwiI2VkaXQtcGFzc1wiKSA9PT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgICAgIF9uYW1lID0gJChpbnB1dCkuc2libGluZ3MoJ2xhYmVsJykudGV4dCgpO1xuLy8gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfaW5wdXQuaXMoXCJpbnB1dFt0eXBlPSd0ZXh0J11cIikgfHwgX2lucHV0LmlzKFwiaW5wdXRbdHlwZT0nZW1haWwnXVwiKSkge1xuLy8gICAgICAgICAgICAgICAgICAgIF9uYW1lID0gJChpbnB1dCkuc2libGluZ3MoJ2xhYmVsJykudGV4dCgpO1xuLy8gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfaW5wdXQuaXMoXCJzZWxlY3RcIikpIHtcbi8vICAgICAgICAgICAgICAgICAgICBfbmFtZSA9ICQoaW5wdXQpLnBhcmVudHMoJ2RpdixzcGFuJykuc2libGluZ3MoJ2xhYmVsJykudGV4dCgpO1xuLy8gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfaW5wdXQuaXMoXCJ0ZXh0YXJlYVwiKSkge1xuLy8gICAgICAgICAgICAgICAgICAgIF9uYW1lID0gJChpbnB1dCkucGFyZW50cygnZGl2Jykuc2libGluZ3MoJ2xhYmVsJykudGV4dCgpO1xuLy8gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfaW5wdXQuaXMoXCJpbnB1dFt0eXBlPSdmaWxlJ11cIikpIHtcbi8vICAgICAgICAgICAgICAgICAgICBfbmFtZSA9ICQoaW5wdXQpLnBhcmVudHMoJyNlZGl0LWltYWdlLWFqYXgtd3JhcHBlcicpLnNpYmxpbmdzKCdsYWJlbCcpLnRleHQoKTtcbi8vICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX2lucHV0LmlzKFwiaW5wdXRbdHlwZT0ncmFkaW8nXVwiKSkge1xuLy8gICAgICAgICAgICAgICAgICAgIF9uYW1lID0gJChpbnB1dCkucGFyZW50cygnLmZvcm0tcmFkaW9zJykuc2libGluZ3MoJ2xhYmVsJykudGV4dCgpO1xuLy8gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfaW5wdXQuaXMoXCJpbnB1dFt0eXBlPSdjaGVja2JveCddXCIpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgX25hbWUgPSBEcnVwYWwudChcIlRlcm1zIGFuZCBjb25kaXRpb25zXCIpO1xuLy8gICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgcmV0dXJuIF9uYW1lICsgRHJ1cGFsLnQoJyBpcyByZXF1aXJlZCcpO1xuLy8gICAgICAgICAgICB9O1xuLy9cbi8vICAgICAgICAgICAgalF1ZXJ5LnZhbGlkYXRvci5hZGRNZXRob2QoJ2FscGhhYicsIGZ1bmN0aW9uICh2YWx1ZSwgZWxlbWVudCkge1xuLy8gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHwgL15bYS16QS1aXFxXXFwtX1xcc10rJC8udGVzdCh2YWx1ZSk7XG4vLyAgICAgICAgICAgIH0sIERydXBhbC50KFwiVGhpcyBmaWVsZCBhY2NlcHQganVzdCBsZXR0ZXJzXCIpKTtcbi8vXG4vLyAgICAgICAgICAgIGpRdWVyeS52YWxpZGF0b3IuYWRkTWV0aG9kKCd0ZWxlJywgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50KSB7XG4vLyAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25hbChlbGVtZW50KSB8fCAvXigwNikoKC0pLlswLTldKyl7NH0kLy50ZXN0KHZhbHVlKTtcbi8vICAgICAgICAgICAgfSwgRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBwaG9uZSBudW1iZXJcIikpO1xuLy9cbi8vICAgICAgICAgICAgalF1ZXJ5LnZhbGlkYXRvci5hZGRNZXRob2QoJ2Z1bGxFbWFpbCcsIGZ1bmN0aW9uICh2YWx1ZSwgZWxlbWVudCkge1xuLy8gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHwgL1xcUytAXFxTK1xcLlxcUysvLnRlc3QodmFsdWUpO1xuLy8gICAgICAgICAgICB9LCBEcnVwYWwudChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsXCIpKTtcbi8vXG4vLyAgICAgICAgICAgIGpRdWVyeS52YWxpZGF0b3IuYWRkTWV0aG9kKCdlbWFpbE9yUGhvbmUnLCBmdW5jdGlvbiAodmFsdWUsIGVsZW1lbnQpIHtcbi8vICAgICAgICAgICAgICAgIHJldHVybiAkKFwiI2VkaXQtZW1haWxcIikudmFsKCkgIT09IFwiXCIgfHwgJChcIiNlZGl0LXBob25lXCIpLnZhbCgpICE9PSBcIlwiO1xuLy8gICAgICAgICAgICB9LCBEcnVwYWwudChcIllvdSBtdXN0IHByb3ZpZGUgYXQgbGVhc3Qgb25lIGNvbnRhY3QgZmllbGRcIikpO1xuLy9cbi8vICAgICAgICAgICAgaWYgKCRfZm9ybXMubGVuZ3RoKSB7XG4vL1xuLy8gICAgICAgICAgICAgICAgJF9mb3Jtcy5maW5kKCdmb3JtJykuZWFjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgX2Zvcm1pZCA9IF90aGlzLmF0dHIoJ2lkJyksXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnNIVE1MID0gJCgnPHVsPjwvdWw+JykuYXR0cih7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBfZm9ybWlkLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogJ3ZhbGlkYXRpb24tbWVzc2FnZXMtYm94IGFsZXJ0IGFsZXJ0LWRhbmdlcidcbi8vICAgICAgICAgICAgICAgICAgICAgICAgfSkuY3NzKCdkaXNwbGF5JywgJ25vbmUnKSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgX3J1bGVzID0ge307XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICRfZm9ybXMucHJlcGVuZChfZXJyb3JzSFRNTCk7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgIHZhciBfX2lzVG9wID0gZmFsc2U7XG4vLyAgICAgICAgICAgICAgICAgICAgX3RoaXMudmFsaWRhdGUoe1xuLy8gICAgICAgICAgICAgICAgICAgICAgICBlcnJvckxhYmVsQ29udGFpbmVyOiAkKCcjJyArIF9mb3JtaWQpLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyOiAnbGknLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmU6ICcnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICBydWxlczogX3J1bGVzLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICBvbmtleXVwOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljazogZmFsc2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwaG9uZUxhYmVsSW5kZXggPSBcIlwiO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHRoaXMuZXJyb3JMaXN0LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5lbGVtZW50Lm5hbWUgPT0gJ3Bob25lJyAmJiB2YWx1ZS5tZXRob2QgPT0gJ2VtYWlsT3JQaG9uZScpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmVMYWJlbEluZGV4ID0ga2V5O1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBob25lTGFiZWxJbmRleCAhPT0gXCJcIikge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JMaXN0LnNwbGljZShwaG9uZUxhYmVsSW5kZXgsIDEpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9faXNUb3AgPT09IGZhbHNlKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgNzAwKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX2lzVG9wID0gdHJ1ZTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZWwgPSAkKGVsZW1lbnQpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9lbC5pcygnc2VsZWN0JykpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZWwuc2libGluZ3MoJ2J1dHRvbicpLmFkZENsYXNzKCdlcnJvcicpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lbC5zaWJsaW5ncygnLmJ0bi1ncm91cCcpLmZpbmQoJ2J1dHRvbicpLmFkZENsYXNzKCdlcnJvcicpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfZWwuaXMoJ2lucHV0OnJhZGlvJykpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZWwucGFyZW50cygnLmZvcm0tcmFkaW9zJykuYWRkQ2xhc3MoJ3JhZGlvLWVycm9yJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF9lbC5pcygnaW5wdXQ6ZmlsZScpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2VsLnBhcmVudHMoJy5mb3JtLXR5cGUtbWFuYWdlZC1maWxlJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lbC5hZGRDbGFzcygnZXJyb3InKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgdW5oaWdobGlnaHQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2VsID0gJChlbGVtZW50KTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZWwuaXMoJ3NlbGVjdCcpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2VsLnNpYmxpbmdzKCdidXR0b24nKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX2VsLmlzKCdpbnB1dDpyYWRpbycpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2VsLnBhcmVudHMoJy5mb3JtLXJhZGlvcycpLnJlbW92ZUNsYXNzKCdyYWRpby1lcnJvcicpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfZWwuaXMoJ2lucHV0OmZpbGUnKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lbC5wYXJlbnRzKCcuZm9ybS10eXBlLW1hbmFnZWQtZmlsZScpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZWwucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICB9XG4vLyAgICAgICAgfVxuLy8gICAgfTtcbi8vXG4vL30pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vPT0gVmFjdG9yeSBJY29uc1xuLy9cbi8vIyMgSWNvbnMgYXMgcHJlZml4ICYgc3VmZml4XG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5zZXRJY29uID0ge1xuICAgICAgICBhdHRhY2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIEljb25zIGZvciBub24gaW5wdXQgZWxlbWVudHMuXG4gICAgICAgICAgICAkKCdbY2xhc3MqPVwic3VmZml4LWljb24tXCJdOm5vdChpbnB1dCksIFtjbGFzcyo9XCJwcmVmaXgtaWNvbi1cIl06bm90KGlucHV0KScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuICAgICAgICAgICAgICAgIHZhciAkX2VsID0gJChlbCk7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxmID0gJF9lbDtcbiAgICAgICAgICAgICAgICB2YXIgX2ljb25OYW1lID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAoJF9lbC5oYXNDbGFzcygnanMtaGFzLWljb24nKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgoISRfZWwuaGFzQ2xhc3MoJ2pzLWhhcy1pY29uJykpICYmICghJF9lbC5maW5kKCc+W2NsYXNzKj1cImljb24tXCJdJykubGVuZ3RoID4gMCkpIHsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgICAgICAgICAgICAgICAgIHZhciBfYXJyYXkgPSAkX2VsLmF0dHIoJ2NsYXNzJykuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKF9hcnJheSwgZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2FycmF5W2luZGV4XSAhPT0gJycgJiYgKCBfYXJyYXlbaW5kZXhdLmluZGV4T2YoXCJzdWZmaXgtaWNvbi1cIikgIT0gLTEgfHwgX2FycmF5W2luZGV4XS5pbmRleE9mKFwicHJlZml4LWljb24tXCIpICE9IC0xKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pY29uTmFtZSA9IF9hcnJheVtpbmRleF0uc3BsaXQoJy1pY29uLScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRfZWwuaXMoJ2xpJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRfZWwgPSAkX2VsLmZpbmQoJz5hJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkX2VsID0gKCAkX2VsLmxlbmd0aCApID8gJF9lbCA6ICRfZWwuZmluZCgnPi5ub2xpbmsnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChfaWNvbk5hbWVbMF0gPT0gXCJwcmVmaXhcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgJF9lbC5hZGRDbGFzcygnanMtaGFzLWljb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRfZWwucHJlcGVuZCgnPGkgY2xhc3M9XCJpY29uLScgKyBfaWNvbk5hbWVbMV0gKyAnXCI+PC88aT4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRfZWwuYWRkQ2xhc3MoJ2pzLWhhcy1pY29uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkX2VsLmFwcGVuZCgnPGkgY2xhc3M9XCJpY29uLScgKyBfaWNvbk5hbWVbMV0gKyAnXCI+PC88aT4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkc2VsZi5hZGRDbGFzcygnanMtaGFzLWljb24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gSWNvbnMgZm9yIGlucHV0IGVsZW1lbnRzLlxuICAgICAgICAgICAgJCgnaW5wdXRbY2xhc3MqPVwic3VmZml4LWljb24tXCJdLCBpbnB1dFtjbGFzcyo9XCJwcmVmaXgtaWNvbi1cIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgJF9lbCA9ICQoZWwpO1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZiA9ICRfZWw7XG4gICAgICAgICAgICAgICAgdmFyIF9pY29uTmFtZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRfZWwuaGFzQ2xhc3MoJ2pzLWhhcy1pY29uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgoISRfZWwuaGFzQ2xhc3MoJ2pzLWhhcy1pY29uJykpICYmICghJF9lbC5uZXh0KCdbY2xhc3MqPVwiaWNvbi1cIl0nKS5sZW5ndGggPiAwKSkgeyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICAgICAgICAgICAgICAgICAgJF9lbC5hZGRDbGFzcygnanMtaGFzLWljb24nKTtcbiAgICAgICAgICAgICAgICAgICAgJF9lbC5wYXJlbnQoKS5hZGRDbGFzcygnZm9ybS1pdGVtLS1pY29uJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hcnJheSA9ICRfZWwuYXR0cignY2xhc3MnKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2goX2FycmF5LCBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfYXJyYXlbaW5kZXhdICE9PSAnJyAmJiAoIF9hcnJheVtpbmRleF0uaW5kZXhPZihcInN1ZmZpeC1pY29uLVwiKSAhPSAtMSB8fCBfYXJyYXlbaW5kZXhdLmluZGV4T2YoXCJwcmVmaXgtaWNvbi1cIikgIT0gLTEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ljb25OYW1lID0gX2FycmF5W2luZGV4XS5zcGxpdCgnLWljb24tJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRfZWwucGFyZW50KCkuYWRkQ2xhc3MoJ2Zvcm0taXRlbS0taWNvbi0nICsgX2ljb25OYW1lWzBdKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX2ljb25OYW1lWzBdID09IFwicHJlZml4XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRfZWwucGFyZW50KCkuYWRkQ2xhc3MoJ2pzLWhhcy1pY29uIGhhcy1pY29uJykucHJlcGVuZCgnPGkgY2xhc3M9XCJpY29uLScgKyBfaWNvbk5hbWVbMV0gKyAnXCI+PC88aT4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRfZWwucGFyZW50KCkuYWRkQ2xhc3MoJ2pzLWhhcy1pY29uIGhhcy1pY29uJykuYXBwZW5kKCc8aSBjbGFzcz1cImljb24tJyArIF9pY29uTmFtZVsxXSArICdcIj48LzxpPicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRzZWxmLmFkZENsYXNzKCdqcy1oYXMtaWNvbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy8gQm9vdHN0cmFwIHBvcG92ZXIuXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBEcnVwYWwuYmVoYXZpb3JzLmJvb3RzdHJhcF9wb3BvdmVyID0ge1xuICAgICAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5nKSB7XG4gICAgICAgICAgICBpZiAoJC5mbi5wb3BvdmVyKSB7XG4gICAgICAgICAgICAgICAgJChcIltkYXRhLXRvZ2dsZT0ncG9wb3ZlciddXCIpLnBvcG92ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vPT0gQ3VzdG9tIFNlbGVjdCBNdWx0aXBsZVxuLy9cbi8vIyMgQXBwbHkgbXVsdGlwbGUgc2VsZWN0XG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5zZWxlY3RNdWx0aXBsZSA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBTa2luIFNlbGVjdFxuICAgICAgICAgICAgLyokLmVhY2goJCgnc2VsZWN0W211bHRpcGxlPVwibXVsdGlwbGVcIl0nKSwgZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgICAgICAgJChlbCkubXVsdGlzZWxlY3Qoe1xuICAgICAgICAgICAgICAgICAgICBub25TZWxlY3RlZFRleHQ6IERydXBhbC50KCdTZWxlY3Rpb25uZXIuLi4nKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoJy5idG4ubXVsdGlzZWxlY3QnKS5yZW1vdmVDbGFzcygnYnRuLWRlZmF1bHQnKTsqL1xuICAgICAgICB9XG4gICAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy89PSBUb29sdGlwXG4vL1xuLy8jIyBBcHBseSBjdXN0b20gdG9vbHRpcCBmb3IgbGlua3MuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gQm9vdHN0cmFwIHRvb2x0aXAuXG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5ib290c3RyYXBfdG9vbHRpcCA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZykge1xuICAgICAgICAgICAgaWYgKCQuZm4udG9vbHRpcCkge1xuICAgICAgICAgICAgICAgICQoXCJbZGF0YS10b2dnbGU9J3Rvb2x0aXAnXVwiKS50b29sdGlwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRmFjdG9yeSB0b29sdGlwLlxuICAgIERydXBhbC5iZWhhdmlvcnMudnRvb2x0aXAgPSB7XG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnW2NsYXNzKj1cImhhcy10b29sdGlwXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxmID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgIGlmICgkc2VsZi5oYXNDbGFzcygnanMtdG9vbHRpcGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIE1vZGVybiB0b29sdGlwLlxuICAgICAgICAgICAgICAgIGlmICgkc2VsZi5oYXNDbGFzcygndG9vbHRpcC1tb2Rlcm4nKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2NvbnRlbnQgPSAkc2VsZi5hdHRyKCd0aXRsZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2hhc0ltYWdlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBfaW1hZ2VTcmMgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJHNlbGYuYXR0cignZGF0YS1pbWFnZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaGFzSW1hZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2ltYWdlU3JjID0gJHNlbGYuYXR0cignZGF0YS1pbWFnZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJHNlbGYuYWRkQ2xhc3MoJ3YtdG9vbHRpcCB2LXRvb2x0aXAtZWZmZWN0LTEnKTtcbiAgICAgICAgICAgICAgICAgICAgJHNlbGYud3JhcElubmVyKCc8c3BhbiBjbGFzcz1cInYtdG9vbHRpcC1pdGVtXCI+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV9oYXNJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGYuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInYtdG9vbHRpcC1jb250ZW50IGNsZWFyZml4XCI+PHNwYW4gY2xhc3M9XCJ2LXRvb2x0aXAtdGV4dCBuby1pbWFnZVwiPiAnICsgX2NvbnRlbnQgKyAnIDwvc3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZi5hcHBlbmQoJzxzcGFuIGNsYXNzPVwidi10b29sdGlwLWNvbnRlbnQgY2xlYXJmaXhcIj48aW1nIHNyYz1cIicgKyBfaW1hZ2VTcmMgKyAnXCIgLz48c3BhbiBjbGFzcz1cInYtdG9vbHRpcC10ZXh0XCI+ICcgKyBfY29udGVudCArICcgPC9zcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkc2VsZi5maW5kKCcudi10b29sdGlwLWNvbnRlbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBCb290c3RyYXAgdG9vbHRpcC5cbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hcnJheSA9ICRzZWxmLmF0dHIoJ2NsYXNzJykuc3BsaXQoJyAnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9wbGFjZW1lbnQgPSAnYXV0byc7XG5cbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKF9hcnJheSwgZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2FycmF5W2luZGV4XSAhPT0gJycgJiYgX2FycmF5W2luZGV4XS5pbmRleE9mKFwiaGFzLXRvb2x0aXAtLVwiKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wbGFjZW1lbnQgPSBfYXJyYXlbaW5kZXhdLnNwbGl0KCdoYXMtdG9vbHRpcC0tJylbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRzZWxmLnRvb2x0aXAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiBfcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkc2VsZi5hZGRDbGFzcygnanMtdG9vbHRpcGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vPT0gWW91dHViZSBWaWRlb1xuLy9cbi8vIyMgQXBwbHkganF1ZXJ5Lm1iLllUUGxheWVyXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5ZVFBsYXllciA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKFwiLnl0cGxheWVyXCIpO1xuICAgICAgICAgICAgaWYgKCEkZWxlbWVudC5oYXNDbGFzcygnbWJfWVRQbGF5ZXInKSkge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LllUUGxheWVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIFByb3ZpZGVzIGFuIEhUTUwgbWFya3VwIGZvciBhIGJ1dHRvbi5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYnV0dG9uXG4gKiAgIENvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b24uaWNvblxuICogICBCdXR0b24gaWNvbiB1c2luZyBWYWN0b3J5IEZvbnQgKGV4YW1wbGU6IGljb24tY2hldnJvbi1yaWdodCwgaWNvbi1jaGV2cm9uLWxlZnQpLlxuICogQHBhcmFtIHtvYmplY3R9IGJ1dHRvbi50ZXh0XG4gKiAgIEJ1dHRvbiBib2R5IHRleHQuXG4gKiBAcGFyYW0ge29iamVjdH0gYnV0dG9uLmNzc0NsYXNzXG4gKiAgIEJ1dHRvbiBjc3MgY2xhc3MgbmFtZS5cbiAqXG4gKiBVc2FnZTogRHJ1cGFsLnRoZW1lKCd2QnV0dG9uTWFya3VwJywgeydjc3MnOiAnc2xpY2stbmV4dCcsJ2ljb24nOiAnaWNvbi1jaGV2cm9uLXJpZ2h0J30pXG4gKlxuICogQHJldHVybiB7c3RyaW5nfVxuICogICBBIHN0cmluZyBvZiBIVE1MIHdpdGggYSBidXR0b24gYW5kIGFuIGljb24gZW5jbG9zZWQgYnkgYSBpLlxuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBEcnVwYWwudGhlbWUudkJ1dHRvbk1hcmt1cCA9IGZ1bmN0aW9uIChidXR0b24pIHtcblxuICAgICAgICB2YXIgYnV0dG9uSWNvbiA9IGJ1dHRvbi5pY29uO1xuICAgICAgICB2YXIgYnV0dG9uVGV4dCA9IGJ1dHRvbi50ZXh0O1xuXG4gICAgICAgIC8vIEFzc2VtYmxlIHRoZSBtYXJrdXAtLXN0cmluZyBtYW5pcHVsYXRpb24gaXMgZmFzdCwgYnV0IGlmIHRoaXMgbmVlZHNcbiAgICAgICAgLy8gdG8gYmVjb21lIG1vcmUgY29tcGxleCwgd2UgY2FuIHN3aXRjaCB0byBjcmVhdGluZyBkb20gZWxlbWVudHMuXG4gICAgICAgIHZhciBidXR0b25NYXJrdXAgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCInICsgYnV0dG9uLmNzcyArICdcIj4nO1xuXG4gICAgICAgIGlmIChidXR0b25JY29uKSB7XG4gICAgICAgICAgICBidXR0b25NYXJrdXAgKz0gJzxpIGNsYXNzPVwiJyArIGJ1dHRvbkljb24gKyAnXCI+PC9pPic7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYnV0dG9uVGV4dCkge1xuICAgICAgICAgICAgYnV0dG9uTWFya3VwICs9IGJ1dHRvblRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBidXR0b25NYXJrdXAgKz0gJzwvYnV0dG9uPic7XG5cbiAgICAgICAgcmV0dXJuIGJ1dHRvbk1hcmt1cDtcbiAgICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IEluaXRcbi8vXG4vLyMjIExvYWQgY3VzdG9tIHV0aWxpdGllcy5cbihmdW5jdGlvbiAoZG9tcmVhZHksIERydXBhbCwgZHJ1cGFsU2V0dGluZ3MpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZG9tcmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LndvdygpO1xuICAgICAgICAvL0RydXBhbC52YWN0b3J5LnV0aWxpdHkub3V0ZGF0ZWRCcm93c2VyKCk7XG4gICAgICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkuZ290b1N0aWNreUJ1dHRvbigpO1xuICAgICAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LnZpZXdzRmlsdGVyKCk7XG4gICAgICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkudmlld3NEYXRlRmlsdGVyKCk7XG4gICAgICAgIC8vRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5kZXRlY3RJbnRlcnN0aXRpZWwoKTtcbiAgICAgICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5kaXNhYmxlTGluaygpO1xuICAgICAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmZpbGVzVXBsb2FkKCk7XG4gICAgICAgIC8vRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5zbWFydEJhbm5lcigpO1xuICAgICAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmJvb3RzdHJhcF90YWJzKCk7XG4gICAgfSk7XG5cbn0pKGRvbXJlYWR5LCBEcnVwYWwsIHdpbmRvdy5kcnVwYWxTZXR0aW5ncyk7Il19
