/*
 * vactory 
 * Responsive base theme for Drupal.
 * 
 *
 * Copyright (c) 2020, 
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
;// accordion utilities
//==

(function ($, Drupal) {
  "use strict";

  // accordion scroll
  Drupal.vactory.utility.accordionScroll = function () {
    $(document).ready(function () {

      $('.collapse').on('shown.bs.collapse', function (e) {
        var $headerHeight = $('.vh-header').outerHeight(),
          $panel = $(this).closest('.card'),
          $scrollOffset = $headerHeight;
        if (matchMedia("(max-width: 991px)").matches) {
          $scrollOffset = 0;
        }
        $('html,body').animate({
          scrollTop: $panel.offset().top
        }, 300);
      });

    });
  };

  // initialize slick slider inside accordion
  Drupal.vactory.utility.accordionSlider = function () {
    $(document).ready(function () {
      // initialization
      $('.collapse').on('show.bs.collapse', function () {
        var _slider = $(this).find('.slick-wrapper');
        if (_slider.length) {
          _slider.each(function () {
            if ($(this).hasClass('slick-initialized')) {
              return;
            }
            $(this).slick();
          });
        }
      });

      //destruction
      // comment this event to stop destruction of slick
      $('.collapse').on('hidden.bs.collapse', function () {
        var _slickSlider = $(this).find('.slick-slider');
        if (_slickSlider.length) {
          _slickSlider.each(function () {
            $(this).slick('unslick');
          });
        }
      });

    });
  };


})(jQuery, Drupal);
;(function ($, Drupal) {
  "use strict";
  Drupal.vactory.utility.addToAnyButton = function () {
    $(document).scroll(function () {
      var buttons         = $('.vf-addtoany-fixed');
      var heightBanner    = $(".vf-banner").height();
      var heightSlider    = $(".vf-slider").height();
      var offsetFooter    = $(".vf-footer").offset().top-($(".vf-footer").height()+buttons.height()*2);
      if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true ))
      {
        var  top = document.documentElement.scrollTop;
      }
      else
      {
        var  top = window.scrollY;
      } 
      if((top>=heightBanner || top>=heightSlider) && top<=offsetFooter){
        buttons.addClass('buttons-fixed');
        setTimeout(function(){ buttons.addClass('fade-left'); }, 300);
      }
      else {
        buttons.removeClass('buttons-fixed fade-left');
      }
    });
  }
})(jQuery, Drupal);;/**
 * Created by void on 10/09/2018.
 */
//== Animate Numbers
//
//## Animate numbers of chiffres clé
var goToNumber;
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.animateNumbers = function () {
    $(document).ready(function () {

      var intervalAnimation = 0.5;

      goToNumber = function (target) {
        target.each(function (index, item) {
          var getMax = parseFloat($(item).attr('data-number')),
            intervalNumber = 0,
            increment = getMax / 100,
            animated = true,
            isInt = (Number(getMax) === getMax && getMax % 1 === 0);
          if (!$(item).hasClass('animated')) {
            animated = (!($(item).parents('.slick-initialized').length && !$(item).parents('.slick-current').length));
            var myInterval = (animated) ? setInterval(function () {
              if (intervalNumber < getMax) {
                intervalNumber = intervalNumber + increment;
                !$(item).hasClass('animated') ? $(item).addClass('animated') : null;
                if(isInt) { // Condition to know if it is an integer or float
                  (intervalNumber >= getMax) ? $(item).text(getMax) : $(item).text(Math.ceil(Math.ceil(intervalNumber)));
                }
                else {
                  (intervalNumber >= getMax) ? $(item).text(getMax) : $(item).text(intervalNumber.toFixed(1));
                }
                (intervalNumber >= getMax) ? clearInterval(myInterval) : null;
              }
            }, intervalAnimation) : null;
          }
        });
      };
    });
  };

})(jQuery, Drupal);

;//== Datepicker
//
//## Apply datepicker

(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.datepicker = function () {

    $(document).ready(function () {

      $('.datepicker').datepicker({
        language: Drupal.vars.vactory.lang,
        autoHide: true
      });

      // Datepicker example 1.
      $('#datepicker-example-1').datepicker({});

      // Datepicker example 2.
      $('#datepicker-example-2').datepicker({});

    });
  };

})(jQuery, Drupal);
;//== Disable links
//
//## Target elements with CSS class .disablelink and prevent default.
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.disableLink = function () {

    $(document).ready(function () {
      $('.disablelink').click(function (e) {
        e.preventDefault();
      });
    });
  };

})(jQuery, Drupal);
;// //== Files
// //
// //## Apply custom skin to upload fields.
// (function ($, Drupal) {
//   "use strict";
//
//   Drupal.vactory.utility.filesUpload = function () {
//
//     $(document).ready(function () {
//       var managedFile = jQuery('.form-managed-file,
// .form-item.form-type-file'); var fileWrapper = jQuery('.skinned-file'); if
// (managedFile.length) { managedFile.each(function (index, el) {  // Move
// descriptions below input field. var descriptionField =
// $(el).next('.description'); if (descriptionField.length) {
// descriptionField.appendTo($(el).parent().parent());
// descriptionField.addClass('file-description'); }  // Add label text to input
// field. $(el).append('<span class="help-block">' + Drupal.t("Upload your
// file") + '</span>');  $(el).find('input[type="file"]').on('change', function
// (event) { var $this = $(this);  if ($this[0].files.length) {
// $this.closest('.form-item').find('label').text($this[0].files[0].name); $this.closest('.form-item').find('.error').remove(); } else { $this.closest('.form-item').find('label').text($this.closest('.form-item').attr('data-label')); $this.closest('.form-item').find('.error').detach().insertAfter($this.closest('.form-item .form-managed-file')); } }); $(el).closest('.form-item').attr('data-label', $(el).closest('.form-item').find('label').text()); }); } else if (fileWrapper.length) { fileWrapper.find('input[type="file"]').on('change', function (event) { var $that = $(this); if ($that[0].files.length) { fileWrapper.find('.help-block').text($that[0].files[0].name); } else { fileWrapper.find('.help-block').text(Drupal.t('No file chosen')); } }); } });  };  })(jQuery, Drupal);
;//== Form validation
//
//## add validation to forms.
(function ($, Drupal) {
  "use strict";
  var __isTop = false;
  jQuery.validator.setDefaults({
    debug: false,

    // change error class
    errorClass: "is-invalid",

    // change valid class
    validClass: "is-valid",

    // error element tag
    errorElement: "div",

    // comment this two fields to use bootstrap default markup for error
    wrapper: "li",

    // validation event
    onkeyup: false,
    onclick: false,

    // ignored elements when validating
    ignore: "",

    // personalised rules
    // add rules with the name of the input fields
    rules: {
      // simple rule, converted to {required:true}
      name: {
        required: true,
        minlength: 4,
      },
      // compound rule
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 4
      },
      phone: {
        tele: true
      }
    },

    // personalised messages
    messages: {
      // required:Drupal.t("This field is required."),
      remote: Drupal.t("Please fix this field."),
      email: Drupal.t("Please enter a valid email address."),
      url: Drupal.t("Please enter a valid URL."),
      date: Drupal.t("Please enter a valid date."),
      dateISO: Drupal.t("Please enter a valid date (ISO)."),
      number: Drupal.t("Please enter a valid number."),
      digits: Drupal.t("Please enter only digits."),
      creditcard: Drupal.t("Please enter a valid credit card number."),
      equalTo: Drupal.t("Please enter the same value again."),
      accept: Drupal.t("Please enter a value with a valid extension."),
      maxlength: jQuery.validator.format(Drupal.t("Please enter no more than {0} characters.")),
      minlength: jQuery.validator.format(Drupal.t("Please enter at least {0} characters.")),
      rangelength: jQuery.validator.format(Drupal.t("Please enter a value between {0} and {1} characters long.")),
      range: jQuery.validator.format(Drupal.t("Please enter a value between {0} and {1}.")),
      max: jQuery.validator.format(Drupal.t("Please enter a value less than or equal to {0}.")),
      min: jQuery.validator.format(Drupal.t("Please enter a value greater than or equal to {0}."))
    },
    highlight: function (element) {
      // _this.addClass('was-validated');

      var phoneLabelIndex = "";

      $.each(this.errorList, function (key, value) {
        if (value.element.name == 'phone' && value.method == 'emailOrPhone') {
          phoneLabelIndex = key;
        }
      });
      if (phoneLabelIndex !== "") {
        this.errorList.splice(phoneLabelIndex, 1);
      }

      // comment this statment if not using error messages wrapper
      if (__isTop === false) {
        $('html,body').animate({
          scrollTop: $('.validation-messages-box.alert').offset().top - 200
        }, 700);
        __isTop = true;
      }

      var _el = $(element);
      if (_el.is('select')) {
        // _el.parent('.select-wrapper').addClass('is-invalid');
        //_el.siblings('.selected-option').addClass('is-invalid');
        // _el.siblings('.btn-group').find('button').addClass('is-invalid');
        _el.siblings('.selected-option').parent().addClass('is-invalid');
      }
      else if (_el.is('input[type="radio"]')) {
        _el.parents('.form-type-radios').addClass('is-invalid');
      }
      else if (_el.is('file')) {
        _el.parent().addClass('is-invalid');
        _el.parents('.form-managed-file').addClass('is-invalid');
      }
      else if (_el.is('input[type="hidden"]')) {
        _el.parents('.form-managed-file').addClass('is-invalid');
      }
      else {
        _el.addClass('is-invalid');
      }
    },
    unhighlight: function (element) {
      var _el = $(element);
      if (_el.is('select')) {
        // _el.parent('.select-wrapper').removeClass('is-invalid');
        //_el.siblings('.selected-option').removeClass('is-invalid');
        // _el.siblings('.btn-group').find('button').removeClass('is-invalid');
        _el.siblings('.selected-option').parent().removeClass('is-invalid');
      }
      else if (_el.is('input[type="radio"]')) {
        _el.parents('.form-type-radios').removeClass('is-invalid');
      }
      else if (_el.is('input[type="file"]')) {
        _el.removeClass('is-invalid');
        _el.parents('.form-managed-file').removeClass('is-invalid');
      }
      else if (_el.is('input[type="hidden"]')) {
        _el.parents('.form-managed-file').removeClass('is-invalid');
      }
      else {
        _el.removeClass('is-invalid');
      }
    },
    // handler for invalid form
    invalidHandler: function (event, validator) {
      // 'this' refers to the form
      var errors = validator.numberOfInvalids();
      if (errors) {
        // comment if not using errors messages wrapper
        $(".validation-messages-box").show();
      }
      else {
        // comment if not using errors messages wrapper
        $(".validation-messages-box").hide();
      }
    },

    // handler for valid form
    submitHandler: function (form) {
      // do other things for a valid form
      form.submit();
    }
  });

  // add specific method

  jQuery.validator.addMethod('fullEmail', function (value, element) {
    return this.optional(element) || /\S+@\S+\.\S+/.test(value);
  }, Drupal.t("Please enter a valid email"));

  jQuery.validator.addMethod('emailOrPhone', function (value, element) {
    return $("#edit-email").val() !== "" || $("#edit-phone").val() !== "";
  }, Drupal.t("You must provide at least one contact field"));

  jQuery.validator.addMethod('captcha_validation', function (value, element) {
    var googleResponse = jQuery('#g-recaptcha-response').val();
    return googleResponse.length > 0;
  }, Drupal.t("Veuillez valider le captcha"));

  jQuery.validator.addMethod('password', function (value, element) {
    return this.optional(element) || value.length >= 5;
  });

  jQuery.validator.addMethod('search_key_validation', function (value, element) {
    return /^.*[\u0041-\u005A\u0061-\u007A\u00C0-\u00F6\u0600-\u06FF0-9]{3}.*$/.test(value);
  }, Drupal.t("Vous devez inclure au moins un mot-clé pour correspondre au contenu. Les mots-clés doivent contenir au moins 3 caractères, et la ponctuation est ignorée."));

  jQuery.validator.addMethod("require_from_group", function (value, element, options) {
    var validator = this;
    var selector = options[1];
    var validOrNot = $(selector, element.form).filter(function () {
      return validator.elementValue(this);
    }).length >= options[0];

    if (!$(element).data('being_validated')) {
      var fields = $(selector, element.form);
      fields.data('being_validated', true);
      fields.valid();
      fields.data('being_validated', false);
    }
    return validOrNot;
  }, Drupal.t("Veuillez renseigner au moin {0} champs."));

  // add specific method - Letter & letter acented & Arabic caracters
  jQuery.validator.addMethod('alphab', function (value, element) {
    return this.optional(element) || /^[\u0041-\u005A\u0061-\u007A\u00C0-\u00F6\u0600-\u06FF \-\s]+$/.test(value)
    //return this.optional(element) || /^[\u0000-\u007F\u0600-\u06FF
    // \-_\s]+$/.test(value) return this.optional(element) ||
    // /^[\p{L}]+[\p{L}\s-]*$/.test(value)
  });

  jQuery.validator.addMethod('no_arabic', function (value, element) {
    return this.optional(element) || /^[^\u0600-\u06FF]+$/.test(value)
  });

  jQuery.validator.addMethod('tele', function (value, element) {
    return this.optional(element) || /[+]{0,1}[0-9]{1,4}[\s]{0,1}[0-9]{9,14}$/.test(value);
  }, Drupal.t("Veuillez saisir un numéro de téléphone valide"));

  jQuery.validator.addMethod('emailOrPhone', function (value, element) {
    return $("#edit-email").val() !== "" || $("#edit-mobile-phone").val() !== "";
  }, Drupal.t("Vous devez renseigner au moin un champ de contact"));

  jQuery.validator.addMethod("extension", function (value, element, param) {
    param = typeof param === "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
    return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
  }, Drupal.t("Veuillez saisir une valeur avec une extension valide."));

  jQuery.validator.addMethod('tele_maroc', function (value, element) {
    return this.optional(element) || /^0[6|7]\d{8}$/.test(value);
  }, Drupal.t("Veuillez saisir un numéro de téléphone mobile valide"));

  jQuery.validator.addMethod('tele_fixe_maroc', function (value, element) {
    return this.optional(element) || /^05\d{8}$/.test(value);
  }, Drupal.t("Veuillez saisir un numéro de téléphone fixe valide"));

  jQuery.validator.addMethod('cin', function (value, element) {
    return this.optional(element) ||
      // CIN maroc sans tiret.
      /^(([a-zA-Z]{1,2})([0-9]{3,6}))$/.test(value) ||
      // CIN maroc avec tiret sans espace.
      /^(([a-zA-Z]{2})[-]([0-9]{3,6}))$/.test(value) ||
      // CIN maroc avec tiret et espace.
      /^(([a-zA-Z]{1})[ ][-]([0-9]{3,6}))$/.test(value) ||
      // CIN Etranger avec tiret avec espace.
      /^(([a-zA-Z]{1})[ ][-]([0-9]{1,6})([a-zA-Z]{1}))$/.test(value) ||
      // CIN Etranger avec tiret sans espace.
      /^(([a-zA-Z]{2})[-]([0-9]{1,6})([a-zA-Z]{1}))$/.test(value) ||
      // CIN Etranger sans tiret.
      /^(([a-zA-Z]{1,2})([0-9]{1,6})([a-zA-Z]{1}))$/.test(value)
  }, Drupal.t("Format de la CIN incorrecte"));

  jQuery.validator.addMethod('captcha_validation', function (value, element) {
    var googleResponse = jQuery('#g-recaptcha-response').val();
    return googleResponse.length > 0;
  }, Drupal.t("Veuillez valider le captcha"));

  jQuery.validator.addMethod('secured_password', function (value, element) {
    return this.optional(element) || (value.length >= 8 && /^(?=.*\d)(?=.*([a-zA-Z])).{8,20}$/.test(value));
  });

  jQuery.validator.addMethod('password', function (value, element) {
    return this.optional(element) || (value.length >= 5);
  });

  // override default messages for specific form field
  $.validator.messages.required = function (param, input) {
    var _input = $(input),
      _name = "";

    if (typeof _input.data('webform-required-error') !== 'undefined') {
      return _input.data('webform-required-error');
    }
    else if (_input.is("file") === true) {
      _name = _input.parents('.form-managed-filed').find('.managed-file-placeholder').text();
    }
    else if (_input.is("textarea") === true) {
      _name = _input.parents('.form-type-textarea').find('label').text();
    }
    else if (_input.attr('type') == 'radio') {
      _name = _input.parents('.form-type-radios').find('> label').text();
    }
    else if (_input.is("select") === true) {
      _name = $(input).parents('.form-type-select').find(' > label').text();
    }
    else {
      _name = _input.parent('.form-group').find('label').text();
    }

    return Drupal.t('Field') + ' ' + _name.replace('*', '') + ' ' + Drupal.t(' is required');
  };

  // override default messages for input type minlength
  $.validator.messages.minlength = function (param, input) {
    var _name = $(input).parents('.form-group').find('label').text();
    return Drupal.t("Le champ @name doit être composé de @param lettres au moins", {
      '@name': _name.replace('*', ''),
      '@param': param
    });
  };

  Drupal.vactory.utility.formValidation = function () {

    $(document).ready(function () {
      // the form container/parents
      // add selector of forms
      var $_forms = $('.webform-submission-form, .js-form-control');

      // add validation for forms
      if ($_forms.length) {
        // foreach form
        $_forms.each(function () {
          // create error messages container
          var _this = $(this),
            _formid = _this.attr('id'),
            _errorsHTML = $('<ul></ul>').attr({
              'id': _formid,
              'class': 'validation-messages-box alert alert-danger'
            }).css('display', 'none');

          $(this).parent().prepend(_errorsHTML);


          // unhighlight radios buttons group
          _this.find('input[type=radio]').each(function () {
            $(this).change(function () {
              if ($(this).parents('.form-type-radios').hasClass('is-invalid')) {
                $(this).parents('.form-type-radios').removeClass('is-invalid');
              }
            });
          });

          _this.validate({
            errorLabelContainer: $('#' + _formid),
          });


          jQuery.extend(jQuery.validator.messages, {
            email: Drupal.t("Please enter a valid email address."),
          });

          jQuery('input[type="file"]').each(function() {
            var $self = $(this);
            if($self.find('.webform-document-file').hasClass('required')) {
              $self.rules('add', {
                required: true,
              })
            }
          })

        }); // end foreach
      } //end if
    });
  };

})(jQuery, Drupal);
;//== Go TOP Sticky Button.
//
//## Show or hide the sticky footer button
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.gotoStickyButton = function () {
    $(document).ready(function () {
      var $element = $('.vf-go-back-top'),
        $document = $('html, body');

      $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
          $element.fadeIn(200);
        }
        else {
          $element.fadeOut(200);
        }
      });

      // Animate the scroll to top.
      $element.click(function (event) {
        event.preventDefault();
        $document.animate({scrollTop: 0}, 300);
      });
    });
  };

})(jQuery, Drupal);
;//== Portrait / Landscape detection
//
//## Disable Portrait for Tablet & Landscape for Mobile.
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.detectInterstitiel = function () {
    $(document).ready(function () {
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
    });
  };

})(jQuery, Drupal);
;//== form label animations
//
//## Apply custom class to add animations to forms label.
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.labelAnimation = function () {

    $(document).ready(function () {

      $('form .animated-label input').each(function (index, value) {
        ($(value).val().length > 0) ? $(value).parent().find('label').addClass('animated') : $(value).parent().find('label').removeClass('animated');
      });

      $('form .animated-label textarea').each(function (index, value) {
        ($(value).val().length > 0) ? $(value).parent().find('label').addClass('animated') : $(value).parent().find('label').removeClass('animated');
      });

      $('form .animated-label input').on('focusin', function () {
        $(this).parent().find('label').addClass('animated');
      });

      $('form .animated-label input').on('focusout', function () {
        if (!this.value) {
          $(this).parent().find('label').removeClass('animated');
        }
      });

      $('form .animated-label textarea').on('focusin', function () {
        $(this).parent().find('label').addClass('animated');
      });

      $('form .animated-label textarea').on('focusout', function () {
        if (!this.value) {
          $(this).parent().find('label').removeClass('animated');
        }
      });

    });

  };

})(jQuery, Drupal);
;/**
 * Created by void on 10/09/2018.
 */
/**
 * @file
 */
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.linkscroll = function () {
    $(document).ready(function () {

      // scroll to the bottom of tabs slider
      $('.link-scroll').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $(this).parents('.paragraph').offset().top + $(this).parents('.paragraph').outerHeight(true)
        }, 300);
      });

    });
  };

})(jQuery, Drupal);

;//== Outdated Browser
//
//## Identify and upgrade old browsers.
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.outdatedBrowser = function () {
    $(document).ready(function () {
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
    });

  };

})(jQuery, Drupal);
;(function ($, Drupal) {
    "use strict";
  
    Drupal.vactory.utility.satisfactionForm = function () {
        $(document).ready(function () {
            //satisfaction range by input radio  
            $('.satisfaction-range .form-radio').each(function () {
                if($(this).is(':checked')) {
                    $(this).parents('.radio').addClass('active');
                }
            });
            
            $('.satisfaction-range .form-radio').on('click',function(){
                $(this).parents('.satisfaction-range').find('.radio').removeClass('active');
                $(this).parents('.radio').addClass('active');
            });
        });
    }
})(jQuery, Drupal);;//== multi select
//
//## Apply multiselect


(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.selectMultiple = function () {

    $(document).ready(function () {
      $.each($('select[multiple="multiple"]'), function (i, el) {
        $(el).multiselect({
          nonSelectedText: Drupal.t('Selectionner...')
        });
      });

      $('.btn.multiselect').removeClass('btn-default');

    });
  };

})(jQuery, Drupal);
;//== select picker
//
//## Apply selectpicker


(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.selectpicker = function () {

    $(document).ready(function () {

      var isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      var options = {style: null,};

      $.each($('select.selectpicker:not([multiple="multiple"]), select.skinned-select, select.lang-dropdown-select-element'), function (i, el) {
        if ($(el).hasClass('lang-dropdown-select-element')) {
          $(el).selectpicker({
            style: null,
            dropupAuto : true,// to force the dropdown to always open down
          });
        }
        else {
          $(el).selectpicker({
            style: 'custom'
          });
        }
      });

      $('select.selectpicker:not([multiple="multiple"]), select.skinned-select').each(function (index, value) {
        ($(value).is(':visible') && $(value).hasClass('js-autocomplete')) ? $(value).attr('data-live-search', true).attr('data-none-results-text', Drupal.t('Aucun résultat')) : null;
        ($(value).is(':visible')) ? $(value).selectpicker() : null;
      });

      $('select:not(.skinned-select):not(.selectpicker):not(.lang-dropdown-select-element)').each(function () {
        if ($(this).attr('data-placeholder-value')) {
          $(this).find('option[value="none"]').text($(this).attr('data-placeholder-value'));
        }
        $(this).parent().addClass('group-select');
        if (!($(this).siblings().is("span"))) {
          $(this).parent().append("<span class='selected-option'> " + $(this).find("option:selected").text() + "</span>");
        }
      });
      $('select:not(.skinned-select):not(.selectpicker):not(.lang-dropdown-select-element)').change(function () {
        var str = $(this).find("option:selected").text();
        $(this).parent().find(".selected-option").text(str);
      });


    });
  };

})(jQuery, Drupal);
;//== Slick Slider
/**
 * arrows (boolean) : Enable Next/Prev arrows
 * dots (boolean) : Current slide indicator dots
 * slidesToShow (int) : # of slides to show at a time
 * slidesToScroll (int) : # of slides to scroll at a time
 * autoplay (boolean) : Enables auto play of slides
 * autoplaySpeed (int : 3000) : Auto play change interval
 * centerMode (boolean) : Enables centered view with partial prev/next slides.
 * Use with odd numbered slidesToShow counts. centerPadding (string: 50px) :
 * Side padding when in center mode. (px or %) dotsClass (string: slick-dots) :
 * Class for slide indicator dots container draggable (boolean) : Enables
 * desktop dragging infinite (boolean) : Infinite looping initialSlide (int) :
 * Slide to start on rtl (boolean) : Change the slider's direction to become
 * right-to-left speed (int) : Transition speed variableWidth (boolean) :
 * Disables automatic slide width calculation adaptiveHeight (boolean) : Adapts
 * slider height to the current slide prevArrow (string (html | jQuery
 * selector) | object (DOM node | jQuery object)) : Allows you to select a node
 * or customize the HTML for the "Previous" arrow. nextArrow (string (html |
 * jQuery selector) | object (DOM node | jQuery object)) : Allows you to select
 * a node or customize the HTML for the "Next" arrow. accessibility (boolean) :
 * Enables tabbing and arrow key navigation. Unless autoplay: true, sets
 * browser focus to current slide (or first of current slide set, if multiple
 * slidesToShow) after slide change. For full a11y compliance enable
 * focusOnChange in addition to this. useTransform useTransform :
 * Enable/Disable CSS Transforms cssEase (string : ease) : CSS3 easing easing
 * (string: linear) : animate() fallback easing focusOnSelect (boolean): Enable
 * focus on selected element (click) focusOnChange (boolean) : Puts focus on
 * slide after change lazyLoad (string : ondemand|progressive) : Accepts
 * 'ondemand' or 'progressive' for lazy load technique. 'ondemand' will load
 * the image as soon as you slide to it, 'progressive' loads one image after
 * the other when the page loads. pauseOnDotsHover (boolean) : Pauses autoplay
 * when a dot is hovered pauseOnFocus (boolean) ; Pauses autoplay when slider
 * is focussed pauseOnHover (boolean) : Pauses autoplay on hover swipe
 * (boolean) :  Enables touch swipe
 *
 *
 *
 * We manage slider on our twig with data. exemple:
 * <div class="vf-slick-slider" data-dots="true" data-arrows="true"
 * data-toshow="3" data-mobile-arrows="false"></div>
 *
 */

//## Initialize slider


(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.sliders = function () {

    $(document).ready(function () {

      // Variables
      var $slickSlider = $('.vf-slick-slider'),
        rtlMode = Drupal.vars.vactory.is_rtl,
        resizeTimer,
        prevArrow = Drupal.theme('vButtonMarkup', {
          'css': rtlMode ? 'slick-next' : 'slick-prev',
          'icon': rtlMode ? 'icon-chevron-right' : 'icon-chevron-left',
          'ariaLabel': rtlMode ? 'next-slide' : 'previous-slide'
        }),
        nextArrow = Drupal.theme('vButtonMarkup', {
          'css': rtlMode ? 'slick-prev' : 'slick-next',
          'icon': rtlMode ? 'icon-chevron-left' : 'icon-chevron-right',
          'ariaLabel': rtlMode ? 'previous-slide' : 'next-slide'
        });

      // function to slick slider on desktop | mobile
      function initSlider() {
        $slickSlider.each(function (index, value) {
          var _IS_MOBILE_VIEW = (matchMedia("only screen and (max-width: 992px)").matches) ? true : false,
            $slider = $(value),
            _slidesToShow = ($(value).data('toshow') !== undefined) ? $(value).data('toshow') : 1, // number slides to show on desktop
            $settings_slider = {
              rtl: rtlMode,
              dots: ($slider.data('dots') !== undefined) ? $slider.data('dots') : true,
              arrows: ($slider.data('arrows') !== undefined) ? $slider.data('arrows') : true,
              infinite: ($slider.data('infinite') !== undefined) ? $slider.data('infinite') : true,
              slidesToShow: ($slider.data('toshow') !== undefined) ? $slider.data('toshow') : 1,
              slidesToScroll: ($slider.data('toscroll') !== undefined) ? $slider.data('toscroll') : 1,
              autoplay: ($slider.data('autoplay') !== undefined) ? $slider.data('autoplay') : false,
              autoplaySpeed: ($slider.data('autoplayspeed') !== undefined) ? $slider.data('autoplayspeed') :3000,
              adaptiveHeight: ($slider.data('adaptiveheight') !== undefined) ? $slider.data('adaptiveheight') : false,
              centerMode: $($slider.data('centermode') !== undefined) ? $slider.data('centermode') : false,
              centerPadding: $($slider.data('centerpadding') !== undefined) ? $slider.data('centerpadding') : "50px",
              variableWidth: $($slider.data('variablewidth') !== undefined) ? $slider.data('variablewidth') : false,
              cssEase: 'cubic-bezier(0.585, -0.005, 0.635, 0.920)',
              useTransform: ($slider.data('usetransform') !== undefined) ? $slider.data('usetransform'): true,
              accessibility: ($slider.data('accesibility') !== undefined) ? $slider.data('accesibility') :false,
              speed: ($slider.data('speed') !== undefined) ? $slider.data('speed') : 800,
              prevArrow: prevArrow,
              nextArrow: nextArrow,
              lazyLoad: ($slider.data('lazyload') !== undefined) ? $slider.data('lazyload') : 'ondemand',
              draggable: ($slider.data('draggable') !== undefined) ? $slider.data('draggable') : true,
              easing: 'linear',
              focusOnChange: false,
              focusOnSelect: false,
              pauseOnDotsHover: false,
              pauseOnFocus: true,
              pauseOnHover: true,
              swipe: ($slider.data('swipe') !== undefined) ? $slider.data('swipe') : true,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    arrows: ($slider.data('mobile-arrows') !== undefined) ? $slider.data('mobile-arrows') : false,
                    dots: ($slider.data('mobile-dots')) ? $slider.data('mobile-dots') : true,
                    slidesToShow: ($slider.data('toshow') !== undefined) ? Math.floor($slider.data('toshow')) : 1,
                    slidesToScroll: ($slider.data('toscroll') !== undefined) ? Math.floor($slider.data('toscroll')) : 1,
                    speed: ($slider.data('speed') !== undefined) ? $slider.data('speed') : 800,
                    cssEase: 'ease'
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    arrows: ($slider.data('mobile-arrows') !== undefined) ? $slider.data('mobile-arrows') : false,
                    dots: ($slider.data('mobile-dots') !== undefined) ? $slider.data('mobile-dots') : true,
                    infinite: ($slider.data('mobile-infinite') !== undefined) ? $slider.data('mobile-infinite') : true,
                    slidesToShow: ($slider.data('mobile-toshow') !== undefined) ? $slider.data('mobile-toshow') : 1,
                    slidesToScroll: ($slider.data('mobile-toscroll') !== undefined) ? $slider.data('mobile-toscroll') : 1,
                    autoplay: ($slider.data('mobile-autoplay') !== undefined) ? $slider.data('mobile-autoplay') : false,
                    adaptiveHeight: ($slider.data('mobile-adaptiveheight') !== undefined) ? $slider.data('mobile-adaptiveheight') : false,
                    centerMode: $($slider.data('mobile-centermode') !== undefined) ? $slider.data('mobile-centermode') : false,
                    centerPadding: $($slider.data('mobile-centerpadding') !== undefined) ? $slider.data('mobile-centerpadding') : "35px",
                    variableWidth: $($slider.data('mobile-variablewidth') !== undefined) ? $slider.data('mobile-variablewidth') : false,
                    appendArrows: ($slider.parent().find('.slick-controls').length > 0) ? $slider.parent().find('.slick-controls') : $slider,
                    appendDots: ($slider.parent().find('.slick-controls').length > 0) ? $slider.parent().find('.slick-controls') : $slider,
                  }
                }
              ],
            }; // Json of slick slider

          //  Lazy load images
          $slider.find('img.slick-lazyload').each(function (index, value) {
            if (matchMedia('(max-width: 768px)').matches && $(value).data('mobile') !== undefined) {
              $(value).data('lazy', $(value).data('mobile'));
            }
            else {
              $(value).data('lazy', $(value).data('desktop'));
            }
          });

          // Remove loading after load images
          $slider.on('lazyLoaded', function (event, slick, image, imageSource) {
            if($(image).parents('.loading').length > 0) {
              $(image).parents('.loading').removeClass('loading');
            }
          });


          if ($slider.data('equalheight') !== undefined && $slider.data('equalheight') !== undefined && !$slider.hasClass('slick-initialized')) {
            $slider.addClass('slick-use-equal-height')
          }


          if (($slider.find('> *').length > _slidesToShow || $slider.find('.slick-slide:not(.slick-cloned)').length > _slidesToShow) && !_IS_MOBILE_VIEW) {
            if ($slider.hasClass('vf-slick-mobile') && $slider.hasClass('slick-initialized')) {
              $slider.slick('destroy');
            }
            else if (!$slider.hasClass('slick-initialized') && !$slider.hasClass('vf-slick-mobile')) {
              $slider.slick($settings_slider);
            }
            else if (!$slider.hasClass('vf-slick-mobile') && $slider.hasClass('slick-initialized')) {
              $slider.slick('refresh');
            }
          }
          else if (_IS_MOBILE_VIEW && $slider.find(" > *").length > 1 && !$slider.hasClass('slick-initialized')) {
            $slider.slick($settings_slider);
          }
          else if (_IS_MOBILE_VIEW && $slider.hasClass('slick-initialized')) {
            $slider.slick('refresh');
          }
          else if ($slider.find('.slick-slide:not(.slick-cloned)').length <= _slidesToShow && !_IS_MOBILE_VIEW && $slider.hasClass('slick-initialized')) {
            $slider.slick('destroy');
          }
        });
      }

      // function to call all function to run after a slick change (swipe slick
      // slider or click arrow or autoplay)
      function afterSlickChange(target) {
        var _IS_MOBILE_VIEW = (matchMedia("only screen and (max-width: 992px)").matches) ? true : false;
        if (_IS_MOBILE_VIEW) {
          if (target.find('.slick-current .js-number-animate').length) {
            goToNumber(target.find('.slick-current .js-number-animate'));
          }
        }
      }

      // Call init slider on the load of page
      initSlider();

      // Call initSlider on resize of window to trigger slider on mobile or
      // destroy slider on desktop
      $(window).resize(function () {
        clearTimeout(resizeTimer); // After finish resizing
        resizeTimer = setTimeout(function () {
          initSlider();
        }, 250);
      });

      // Slick slider callback
      $slickSlider.on('afterChange', function (event, slick, currentSlide) {
        afterSlickChange($(this));
      });

    });
  };

})(jQuery, Drupal);
;//== Smart Banner
//
//## Smart Banner support for iOS 4/5 and Android.
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.smartBanner = function () {

    $(document).ready(function () {
      if (typeof $.smartbanner == "undefined") {
        return;
      }

      $.smartbanner({
        title: null, // What the title of the app should be in the banner
                     // (defaults to <title>)
        author: null, // What the author of the app should be in the banner
                      // (defaults to <meta name="author"> or hostname)
        price: Drupal.t('FREE'), // Price of the app
        appStoreLanguage: 'us', // Language code for App Store
        inAppStore: Drupal.t('On the App Store'), // Text of price for iOS
        inGooglePlay: Drupal.t('In Google Play'), // Text of price for Android
        inAmazonAppStore: Drupal.t('In the Amazon Appstore'),
        inWindowsStore: Drupal.t('In the Windows Store'), // Text of price for
                                                          // Windows
        GooglePlayParams: null, // Aditional parameters for the market
        icon: null, // The URL of the icon (defaults to <meta
                    // name="apple-touch-icon">)
        iconGloss: null, // Force gloss effect for iOS even for precomposed
        url: null, // The URL for the button. Keep null if you want the button
                   // to link to the app store.
        button: Drupal.t('VIEW'), // Text for the install button
        scale: 'auto', // Scale based on viewport size (set to 1 to disable)
        speedIn: 300, // Show animation speed of the banner
        speedOut: 400, // Close animation speed of the banner
        daysHidden: 15, // Duration to hide the banner after being closed (0 =
                        // always show banner)
        daysReminder: 90, // Duration to hide the banner after "VIEW" is
                          // clicked *separate from when the close button is
                          // clicked* (0 = always show banner)
        force: null, // Choose 'ios', 'android' or 'windows'. Don't do a
                     // browser check, just always show this banner
        hideOnInstall: true, // Hide the banner after "VIEW" is clicked.
        layer: false, // Display as overlay layer or slide down the page
        iOSUniversalApp: true, // If the iOS App is a universal app for both
                               // iPad and iPhone, display Smart Banner to iPad
                               // users, too.
        appendToSelector: 'body', //Append the banner to a specific selector
        onInstall: function () {
          // alert('Click install');
        },
        onClose: function () {
          // alert('Click close');
        }
      });
    });
  };

})(jQuery, Drupal);
;//== Tabs
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.bootstrap_tabs = function () {
    $(document).ready(function () {
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
    });
  };

})(jQuery, Drupal);
;//== Views Date Filter
//
//## Apply datepicker > Months view mode.
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.viewsDateFilter = function () {
    $(document).ready(function () {
      $('input.js-vactory-datepicker').each(function () {
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

      // Config datepicker for date filter by years.
      $('input.js-date-year-filter').each(function () {
        $(this).datepicker('destroy');
        $(this).datepicker({
          language: Drupal.vars.vactory.lang,
          disableTouchKeyboard: true,
          format: 'yyyy',
          startView: 'years',
          minViewMode: 'years',
          autoclose: true
        });

      });
    });
  };

})(jQuery, Drupal);
;//== WOW
//
//## WOW CSS animation as you scroll down a page.
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.wow = function () {
    $(document).ready(function () {

      var $wow = $('.wow');

      if (Drupal.vars.vactory.is_rtl) {
        $wow.each(function() {
          var _this = $(this);
          if (_this.hasClass('fadeInLeft')) {
            _this.removeClass('fadeInLeft').addClass('fadeInRight');
          } else if (_this.hasClass('fadeInRight')) {
            _this.removeClass('fadeInRight').addClass('fadeInLeft');
          }
        });
      }

      var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 100,
        mobile: true,
        live: true,
        callback: function (box) {
          if ($(box).find('.js-number-animate').length) {
            goToNumber($(box).find('.js-number-animate'));
          }
        }
      });
      wow.init();
    });
  };

})(jQuery, Drupal);
;//== Youtube Video
//
//## Apply jquery.mb.YTPlayer
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.ytplayer = function () {
    $(document).ready(function () {
      var $element = $(".ytplayer");
      if (!$element.hasClass('mb_YTPlayer')) {
        var _timer = setTimeout(function() {
          $element.YTPlayer();
          clearTimeout(_timer);
        }, 3000)
      }
      $('.play-video').fancybox();
    });
  };

})(jQuery, Drupal);
;//== Zoom
/**
 * url: the url of the large photo to be displayed. If no url is provided, zoom
 *  uses the src of the first child IMG element inside the element it is
 * assigned to.
 *
 * on: (default: mouseover) the type of event that rrigger
 * zooming, choose from mouseover, grab, click or toggle.
 *
 * duration: (default: 120) the fadeIn/fadeOut speed of the large image.
 *
 * target: (default: false) a selector or DOM element that sould be used as
 * the parent container for the zoomed image.
 *
 * touch: (default: true) Enables interaction via touche events.
 *
 * magnify: (default: 1) This value is multiplied against the full size of the
 * zoomed image. the default value is 1, meaning the zoomed image should be at
 * 100% natural with and height.
 *
 * callback: (default: false) A function to be
 * called when the image has loaded. Inside the function, 'this' refrences the
 * image element.
 *
 * onZoomIn: (default: false) A function to be called when the
 * image has zoomed in. Inside the function, 'this' references the image
 * element.
 *
 * onZoomOut: (default: false) A function to be called when the image
 * has zoomed out, Inside the function, 'this' refrences the image elemtn.
 */
//## Zoom image
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.zoomimage = function () {
    $(document).ready(function () {

      $('.js-zoom').each(function (index, value) {
        $(value).zoom();
      });

    });
  };

})(jQuery, Drupal);
;//== reskin select picker after ajax callback
//
//##
(function ($, Drupal) {
    "use strict";

    Drupal.behaviors.ajaxCallback = {
      attach: function(context, settings) {

        $(context).find('select').once('reSkinSelect').each(function(){
          Drupal.vactory.utility.selectpicker();
        });

      }
    };

})(jQuery, Drupal);
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
            if (_array[index] !== '' && (_array[index].indexOf("suffix-icon-") != -1 || _array[index].indexOf("prefix-icon-") != -1)) {
              _iconName = _array[index].split('-icon-');
            }
          });
          if ($_el.is('li')) {
            $_el = $_el.find('>a');
            $_el = ($_el.length) ? $_el : $_el.find('>.nolink');
          }

          if (_iconName[0] == "prefix") {
            $_el.addClass('js-has-icon');
            $_el.prepend('<i class="icon-' + _iconName[1] + '"></<i>');
          }
          else {
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
            if (_array[index] !== '' && (_array[index].indexOf("suffix-icon-") != -1 || _array[index].indexOf("prefix-icon-") != -1)) {
              _iconName = _array[index].split('-icon-');
            }
          });

          $_el.parent().addClass('form-item--icon-' + _iconName[0]);

          if (_iconName[0] == "prefix") {
            $_el.parent().addClass('js-has-icon has-icon').prepend('<i class="icon-' + _iconName[1] + '"></<i>');
          }
          else {
            $_el.parent().addClass('js-has-icon has-icon').append('<i class="icon-' + _iconName[1] + '"></<i>');
          }
          $self.addClass('js-has-icon');
        }
      });
    }
  };

})(jQuery, Drupal);
;// page load event

(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.page_load = {
    attach: function (context, setting) {

      document.addEventListener('readystatechange', function (event) {
        if (event.target.readyState === 'loading') {
          // The document is still loading.
        } else if (event.target.readyState === 'interactive') {
          // The document has finished loading. We can now access the DOM elements.
          // But sub-resources such as images, stylesheets and frames are still loading.
        } else if (event.target.readyState === 'complete') {
          // The page is fully loaded.
          document.querySelector('body').classList.add('domLoaded');
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
;(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.sticky_bar = {
    attach: function () {

      $(document).ready(function () {

        // Variables 
        var _tab = $('.bar-tabs');
        var lastScroll2 = 0;
        var tabOffset = (_tab.length) ? _tab.offset().top + _tab.outerHeight(true) : null;
        var isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        /*
        var myTime = setTimeout(function(){
          tabOffset = $('.bar-tabs').offset().top + $('.bar-tabs').outerHeight(true);
          clearTimeout(myTime);
        }, 500);*/


        // Fixed the block of sticky_bar when scroll to bottom 
        $(window).on('scroll', function () {
          if (_tab.length) {
            var windowScrollTop = $(window).scrollTop();
            if (windowScrollTop > tabOffset) {
              _tab.addClass('sticky-bar-tabs');
              if (windowScrollTop < lastScroll2) {
                var _timer = setTimeout(function () {
                  _tab.removeClass('sticky-bar-bottom').addClass('sticky-bar-top');
                  clearTimeout(_timer);
                }, 300);

              }
              else {
                var _timer = setTimeout(function () {
                  _tab.removeClass('sticky-bar-top').addClass('sticky-bar-bottom');
                  clearTimeout(_timer);
                }, 300);

              }
            }
            else {
              _tab.removeClass('sticky-bar-bottom').removeClass('sticky-bar-top').removeClass('sticky-bar-tabs');
            }
            lastScroll2 = windowScrollTop;
          }
        });

        // The click of simulation tabs
        _tab.find('.bar-tab-head li').on('click', function () {
          if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');
            var target = $(this).find('> a').attr('data-id');
            $(target).addClass('show').siblings().removeClass('show');
            if (isDevice || matchMedia('(max-width: 768px)').matches) {
              $(target).addClass('active is-active').siblings().removeClass('active is-active');
              $('body').addClass('overflow-y');
              $('.vh-sticky-tab-bar-close').addClass('is-open');
            }
          }
          else {
            if (isDevice || matchMedia('(max-width: 768px)').matches) {
              //
              $(this).removeClass('active');
              var target = $(this).find('> a').attr('data-id');
              $(target).removeClass('show active is-active');
              //
              $(target).removeClass('active is-active');
              $('body').removeClass('overflow-y');
              $('.vh-sticky-tab-bar-close').removeClass('is-open');
            }
          }
        });

        $('.vh-sticky-tab-bar-close > a').on('click', function (event) {
          event.preventDefault();
          _tab.find('.bar-tab-head li ').removeClass('active');
          _tab.find('.bar-tab-content > div').removeClass('show active is-active');
          $('.vh-sticky-tab-bar-close').removeClass('is-open');
        })
      });

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
;/**
 * Provides an HTML markup for a button.
 *
 * @param {object} button
 *   Configuration object for function.
 * @param {string} button.icon
 *   Button icon using Vactory Font (example: icon-chevron-right,
 *     icon-chevron-left).
 * @param {object} button.text
 *   Button body text.
 * @param {object} button.cssClass
 *   Button css class name.
 *
 * Usage: Drupal.theme('vButtonMarkup', {'css': 'slick-next','icon':
 *     'icon-chevron-right'})
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
    var buttonMarkup = '<button type="button" class="' + button.css + '" aria-label="' + button.ariaLabel + '">';

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
    Drupal.vactory.utility.sliders();
    Drupal.vactory.utility.animateNumbers();
    //Drupal.vactory.utility.outdatedBrowser();
    Drupal.vactory.utility.gotoStickyButton();
    Drupal.vactory.utility.viewsDateFilter();
    Drupal.vactory.utility.detectInterstitiel();
    Drupal.vactory.utility.linkscroll();
    Drupal.vactory.utility.disableLink();
    Drupal.vactory.utility.zoomimage();
    // Drupal.vactory.utility.filesUpload();
    //Drupal.vactory.utility.smartBanner();
    Drupal.vactory.utility.bootstrap_tabs();
    Drupal.vactory.utility.datepicker();
    Drupal.vactory.utility.selectpicker();
    Drupal.vactory.utility.selectMultiple();
    Drupal.vactory.utility.ytplayer();
    Drupal.vactory.utility.accordionScroll();
    Drupal.vactory.utility.accordionSlider();
    Drupal.vactory.utility.labelAnimation();
    Drupal.vactory.utility.formValidation();
    Drupal.vactory.utility.addToAnyButton();
    Drupal.vactory.utility.satisfactionForm();
  });

})(domready, Drupal, window.drupalSettings);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl92YXJpYWJsZXMuanMiLCJhY2NvcmRpb25VdGlsaXR5LmpzIiwiYWRkVG9BbnlCdXR0b25zLmpzIiwiYW5pbWF0ZU51bWJlcnMuanMiLCJkYXRlcGlja2VyLmpzIiwiZGlzYWJsZS1saW5rLmpzIiwiZmlsZXMtdXBsb2FkLmpzIiwiZm9ybS12YWxpZGF0aW9uLmpzIiwiZ28tdG9wLmpzIiwiaW50ZXJzdGl0aWVsLmpzIiwibGFiZWxBbmltYXRpb24uanMiLCJsaW5rU2Nyb2xsLmpzIiwib3V0ZGF0ZWRicm93c2VyLmpzIiwic2F0aXNmYWN0aW9uRm9ybS5qcyIsInNlbGVjdC1tdWx0aXBsZS5qcyIsInNlbGVjdHBpY2tlci5qcyIsInNsaWRlcnMuanMiLCJzbWFydGJhbm5lci5qcyIsInRhYnMuanMiLCJ2aWV3cy1kYXRlLWZpbHRlci5qcyIsIndvdy5qcyIsInl0LXZpZGVvLmpzIiwiem9vbS1pbWFnZS5qcyIsImFqYXhDYWxsYmFjay5qcyIsImljb25zLmpzIiwicGFnZUxvYWQuanMiLCJwb3BvdmVyLmpzIiwic3RpY2t5X2Jhci5qcyIsInRvb2x0aXAuanMiLCJidXR0b24uanMiLCJfaW5pdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0M3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDNVZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3JOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0MzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidmFjdG9yeS5zY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLz09IFNjYWZmb2xkaW5nXG4vL1xuLy8jIyBTZXR0aW5ncyBmb3Igc29tZSBvZiB0aGUgbW9zdCBnbG9iYWwgb2JqZWN0cy5cbi8vIEB0b2RvOiBBZGQgdmlld3BvcnQgZXhhbXBsZVxuLy8gQHRvZG86IEFkZCBWYXJpYWJsZXMgZXhhbXBsZS5cbi8vIEB0b2RvOiB1cGRhdGUgbm9tY2xvdHVyZS5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIERydXBhbC52YWN0b3J5ID0gRHJ1cGFsLnZhY3RvcnkgfHwge307XG4gIERydXBhbC52YWN0b3J5LnV0aWxpdHkgPSBEcnVwYWwudmFjdG9yeS51dGlsaXR5IHx8IHt9O1xuICBEcnVwYWwudmFycyA9IERydXBhbC52YXJzIHx8IHt9O1xuICBEcnVwYWwudmFycy52YWN0b3J5ID0gRHJ1cGFsLnZhcnMudmFjdG9yeSB8fCB7fTtcblxuICAvLz09IFZhcmlhYmxlc1xuICAvL1xuICAvLyMjIEdsb2JhbCB2YXJpYWJsZXNcbiAgRHJ1cGFsLnZhcnMudmFjdG9yeSA9IHtcbiAgICBsYW5nOiAoJChcImh0bWxcIikuYXR0cihcImxhbmdcIikgJiYgJChcImh0bWxcIikuYXR0cihcImxhbmdcIikubGVuZ3RoKSA/ICQoXCJodG1sXCIpLmF0dHIoXCJsYW5nXCIpLnJlcGxhY2UoXCJlbmdcIiwgXCJlblwiKSA6ICdlbicsXG4gICAgaXNfcnRsOiAoJCgnaHRtbFtkaXI9XFwncnRsXFwnXScpLmxlbmd0aCkgPyB0cnVlIDogZmFsc2VcbiAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy8gYWNjb3JkaW9uIHV0aWxpdGllc1xuLy89PVxuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyBhY2NvcmRpb24gc2Nyb2xsXG4gIERydXBhbC52YWN0b3J5LnV0aWxpdHkuYWNjb3JkaW9uU2Nyb2xsID0gZnVuY3Rpb24gKCkge1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgICAgJCgnLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyICRoZWFkZXJIZWlnaHQgPSAkKCcudmgtaGVhZGVyJykub3V0ZXJIZWlnaHQoKSxcbiAgICAgICAgICAkcGFuZWwgPSAkKHRoaXMpLmNsb3Nlc3QoJy5jYXJkJyksXG4gICAgICAgICAgJHNjcm9sbE9mZnNldCA9ICRoZWFkZXJIZWlnaHQ7XG4gICAgICAgIGlmIChtYXRjaE1lZGlhKFwiKG1heC13aWR0aDogOTkxcHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgICAkc2Nyb2xsT2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6ICRwYW5lbC5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH07XG5cbiAgLy8gaW5pdGlhbGl6ZSBzbGljayBzbGlkZXIgaW5zaWRlIGFjY29yZGlvblxuICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmFjY29yZGlvblNsaWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBpbml0aWFsaXphdGlvblxuICAgICAgJCgnLmNvbGxhcHNlJykub24oJ3Nob3cuYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfc2xpZGVyID0gJCh0aGlzKS5maW5kKCcuc2xpY2std3JhcHBlcicpO1xuICAgICAgICBpZiAoX3NsaWRlci5sZW5ndGgpIHtcbiAgICAgICAgICBfc2xpZGVyLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCh0aGlzKS5zbGljaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy9kZXN0cnVjdGlvblxuICAgICAgLy8gY29tbWVudCB0aGlzIGV2ZW50IHRvIHN0b3AgZGVzdHJ1Y3Rpb24gb2Ygc2xpY2tcbiAgICAgICQoJy5jb2xsYXBzZScpLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfc2xpY2tTbGlkZXIgPSAkKHRoaXMpLmZpbmQoJy5zbGljay1zbGlkZXInKTtcbiAgICAgICAgaWYgKF9zbGlja1NsaWRlci5sZW5ndGgpIHtcbiAgICAgICAgICBfc2xpY2tTbGlkZXIuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnNsaWNrKCd1bnNsaWNrJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH07XG5cblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIERydXBhbC52YWN0b3J5LnV0aWxpdHkuYWRkVG9BbnlCdXR0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudCkuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBidXR0b25zICAgICAgICAgPSAkKCcudmYtYWRkdG9hbnktZml4ZWQnKTtcbiAgICAgIHZhciBoZWlnaHRCYW5uZXIgICAgPSAkKFwiLnZmLWJhbm5lclwiKS5oZWlnaHQoKTtcbiAgICAgIHZhciBoZWlnaHRTbGlkZXIgICAgPSAkKFwiLnZmLXNsaWRlclwiKS5oZWlnaHQoKTtcbiAgICAgIHZhciBvZmZzZXRGb290ZXIgICAgPSAkKFwiLnZmLWZvb3RlclwiKS5vZmZzZXQoKS50b3AtKCQoXCIudmYtZm9vdGVyXCIpLmhlaWdodCgpK2J1dHRvbnMuaGVpZ2h0KCkqMik7XG4gICAgICBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSAhPSAtMSApIHx8ICghIWRvY3VtZW50LmRvY3VtZW50TW9kZSA9PSB0cnVlICkpXG4gICAgICB7XG4gICAgICAgIHZhciAgdG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgIH1cbiAgICAgIGVsc2VcbiAgICAgIHtcbiAgICAgICAgdmFyICB0b3AgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgIH0gXG4gICAgICBpZigodG9wPj1oZWlnaHRCYW5uZXIgfHwgdG9wPj1oZWlnaHRTbGlkZXIpICYmIHRvcDw9b2Zmc2V0Rm9vdGVyKXtcbiAgICAgICAgYnV0dG9ucy5hZGRDbGFzcygnYnV0dG9ucy1maXhlZCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IGJ1dHRvbnMuYWRkQ2xhc3MoJ2ZhZGUtbGVmdCcpOyB9LCAzMDApO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGJ1dHRvbnMucmVtb3ZlQ2xhc3MoJ2J1dHRvbnMtZml4ZWQgZmFkZS1sZWZ0Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pKGpRdWVyeSwgRHJ1cGFsKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgdm9pZCBvbiAxMC8wOS8yMDE4LlxuICovXG4vLz09IEFuaW1hdGUgTnVtYmVyc1xuLy9cbi8vIyMgQW5pbWF0ZSBudW1iZXJzIG9mIGNoaWZmcmVzIGNsw6lcbnZhciBnb1RvTnVtYmVyO1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5hbmltYXRlTnVtYmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHZhciBpbnRlcnZhbEFuaW1hdGlvbiA9IDAuNTtcblxuICAgICAgZ29Ub051bWJlciA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0LmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XG4gICAgICAgICAgdmFyIGdldE1heCA9IHBhcnNlRmxvYXQoJChpdGVtKS5hdHRyKCdkYXRhLW51bWJlcicpKSxcbiAgICAgICAgICAgIGludGVydmFsTnVtYmVyID0gMCxcbiAgICAgICAgICAgIGluY3JlbWVudCA9IGdldE1heCAvIDEwMCxcbiAgICAgICAgICAgIGFuaW1hdGVkID0gdHJ1ZSxcbiAgICAgICAgICAgIGlzSW50ID0gKE51bWJlcihnZXRNYXgpID09PSBnZXRNYXggJiYgZ2V0TWF4ICUgMSA9PT0gMCk7XG4gICAgICAgICAgaWYgKCEkKGl0ZW0pLmhhc0NsYXNzKCdhbmltYXRlZCcpKSB7XG4gICAgICAgICAgICBhbmltYXRlZCA9ICghKCQoaXRlbSkucGFyZW50cygnLnNsaWNrLWluaXRpYWxpemVkJykubGVuZ3RoICYmICEkKGl0ZW0pLnBhcmVudHMoJy5zbGljay1jdXJyZW50JykubGVuZ3RoKSk7XG4gICAgICAgICAgICB2YXIgbXlJbnRlcnZhbCA9IChhbmltYXRlZCkgPyBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmIChpbnRlcnZhbE51bWJlciA8IGdldE1heCkge1xuICAgICAgICAgICAgICAgIGludGVydmFsTnVtYmVyID0gaW50ZXJ2YWxOdW1iZXIgKyBpbmNyZW1lbnQ7XG4gICAgICAgICAgICAgICAgISQoaXRlbSkuaGFzQ2xhc3MoJ2FuaW1hdGVkJykgPyAkKGl0ZW0pLmFkZENsYXNzKCdhbmltYXRlZCcpIDogbnVsbDtcbiAgICAgICAgICAgICAgICBpZihpc0ludCkgeyAvLyBDb25kaXRpb24gdG8ga25vdyBpZiBpdCBpcyBhbiBpbnRlZ2VyIG9yIGZsb2F0XG4gICAgICAgICAgICAgICAgICAoaW50ZXJ2YWxOdW1iZXIgPj0gZ2V0TWF4KSA/ICQoaXRlbSkudGV4dChnZXRNYXgpIDogJChpdGVtKS50ZXh0KE1hdGguY2VpbChNYXRoLmNlaWwoaW50ZXJ2YWxOdW1iZXIpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgKGludGVydmFsTnVtYmVyID49IGdldE1heCkgPyAkKGl0ZW0pLnRleHQoZ2V0TWF4KSA6ICQoaXRlbSkudGV4dChpbnRlcnZhbE51bWJlci50b0ZpeGVkKDEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKGludGVydmFsTnVtYmVyID49IGdldE1heCkgPyBjbGVhckludGVydmFsKG15SW50ZXJ2YWwpIDogbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgaW50ZXJ2YWxBbmltYXRpb24pIDogbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuXG4iLCIvLz09IERhdGVwaWNrZXJcbi8vXG4vLyMjIEFwcGx5IGRhdGVwaWNrZXJcblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5kYXRlcGlja2VyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgICAkKCcuZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xuICAgICAgICBsYW5ndWFnZTogRHJ1cGFsLnZhcnMudmFjdG9yeS5sYW5nLFxuICAgICAgICBhdXRvSGlkZTogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIC8vIERhdGVwaWNrZXIgZXhhbXBsZSAxLlxuICAgICAgJCgnI2RhdGVwaWNrZXItZXhhbXBsZS0xJykuZGF0ZXBpY2tlcih7fSk7XG5cbiAgICAgIC8vIERhdGVwaWNrZXIgZXhhbXBsZSAyLlxuICAgICAgJCgnI2RhdGVwaWNrZXItZXhhbXBsZS0yJykuZGF0ZXBpY2tlcih7fSk7XG5cbiAgICB9KTtcbiAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy89PSBEaXNhYmxlIGxpbmtzXG4vL1xuLy8jIyBUYXJnZXQgZWxlbWVudHMgd2l0aCBDU1MgY2xhc3MgLmRpc2FibGVsaW5rIGFuZCBwcmV2ZW50IGRlZmF1bHQuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmRpc2FibGVMaW5rID0gZnVuY3Rpb24gKCkge1xuXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnLmRpc2FibGVsaW5rJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vIC8vPT0gRmlsZXNcbi8vIC8vXG4vLyAvLyMjIEFwcGx5IGN1c3RvbSBza2luIHRvIHVwbG9hZCBmaWVsZHMuXG4vLyAoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuLy8gICBcInVzZSBzdHJpY3RcIjtcbi8vXG4vLyAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkuZmlsZXNVcGxvYWQgPSBmdW5jdGlvbiAoKSB7XG4vL1xuLy8gICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIHZhciBtYW5hZ2VkRmlsZSA9IGpRdWVyeSgnLmZvcm0tbWFuYWdlZC1maWxlLFxuLy8gLmZvcm0taXRlbS5mb3JtLXR5cGUtZmlsZScpOyB2YXIgZmlsZVdyYXBwZXIgPSBqUXVlcnkoJy5za2lubmVkLWZpbGUnKTsgaWZcbi8vIChtYW5hZ2VkRmlsZS5sZW5ndGgpIHsgbWFuYWdlZEZpbGUuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsKSB7ICAvLyBNb3ZlXG4vLyBkZXNjcmlwdGlvbnMgYmVsb3cgaW5wdXQgZmllbGQuIHZhciBkZXNjcmlwdGlvbkZpZWxkID1cbi8vICQoZWwpLm5leHQoJy5kZXNjcmlwdGlvbicpOyBpZiAoZGVzY3JpcHRpb25GaWVsZC5sZW5ndGgpIHtcbi8vIGRlc2NyaXB0aW9uRmllbGQuYXBwZW5kVG8oJChlbCkucGFyZW50KCkucGFyZW50KCkpO1xuLy8gZGVzY3JpcHRpb25GaWVsZC5hZGRDbGFzcygnZmlsZS1kZXNjcmlwdGlvbicpOyB9ICAvLyBBZGQgbGFiZWwgdGV4dCB0byBpbnB1dFxuLy8gZmllbGQuICQoZWwpLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCI+JyArIERydXBhbC50KFwiVXBsb2FkIHlvdXJcbi8vIGZpbGVcIikgKyAnPC9zcGFuPicpOyAgJChlbCkuZmluZCgnaW5wdXRbdHlwZT1cImZpbGVcIl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb25cbi8vIChldmVudCkgeyB2YXIgJHRoaXMgPSAkKHRoaXMpOyAgaWYgKCR0aGlzWzBdLmZpbGVzLmxlbmd0aCkge1xuLy8gJHRoaXMuY2xvc2VzdCgnLmZvcm0taXRlbScpLmZpbmQoJ2xhYmVsJykudGV4dCgkdGhpc1swXS5maWxlc1swXS5uYW1lKTsgJHRoaXMuY2xvc2VzdCgnLmZvcm0taXRlbScpLmZpbmQoJy5lcnJvcicpLnJlbW92ZSgpOyB9IGVsc2UgeyAkdGhpcy5jbG9zZXN0KCcuZm9ybS1pdGVtJykuZmluZCgnbGFiZWwnKS50ZXh0KCR0aGlzLmNsb3Nlc3QoJy5mb3JtLWl0ZW0nKS5hdHRyKCdkYXRhLWxhYmVsJykpOyAkdGhpcy5jbG9zZXN0KCcuZm9ybS1pdGVtJykuZmluZCgnLmVycm9yJykuZGV0YWNoKCkuaW5zZXJ0QWZ0ZXIoJHRoaXMuY2xvc2VzdCgnLmZvcm0taXRlbSAuZm9ybS1tYW5hZ2VkLWZpbGUnKSk7IH0gfSk7ICQoZWwpLmNsb3Nlc3QoJy5mb3JtLWl0ZW0nKS5hdHRyKCdkYXRhLWxhYmVsJywgJChlbCkuY2xvc2VzdCgnLmZvcm0taXRlbScpLmZpbmQoJ2xhYmVsJykudGV4dCgpKTsgfSk7IH0gZWxzZSBpZiAoZmlsZVdyYXBwZXIubGVuZ3RoKSB7IGZpbGVXcmFwcGVyLmZpbmQoJ2lucHV0W3R5cGU9XCJmaWxlXCJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChldmVudCkgeyB2YXIgJHRoYXQgPSAkKHRoaXMpOyBpZiAoJHRoYXRbMF0uZmlsZXMubGVuZ3RoKSB7IGZpbGVXcmFwcGVyLmZpbmQoJy5oZWxwLWJsb2NrJykudGV4dCgkdGhhdFswXS5maWxlc1swXS5uYW1lKTsgfSBlbHNlIHsgZmlsZVdyYXBwZXIuZmluZCgnLmhlbHAtYmxvY2snKS50ZXh0KERydXBhbC50KCdObyBmaWxlIGNob3NlbicpKTsgfSB9KTsgfSB9KTsgIH07ICB9KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IEZvcm0gdmFsaWRhdGlvblxuLy9cbi8vIyMgYWRkIHZhbGlkYXRpb24gdG8gZm9ybXMuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9faXNUb3AgPSBmYWxzZTtcbiAgalF1ZXJ5LnZhbGlkYXRvci5zZXREZWZhdWx0cyh7XG4gICAgZGVidWc6IGZhbHNlLFxuXG4gICAgLy8gY2hhbmdlIGVycm9yIGNsYXNzXG4gICAgZXJyb3JDbGFzczogXCJpcy1pbnZhbGlkXCIsXG5cbiAgICAvLyBjaGFuZ2UgdmFsaWQgY2xhc3NcbiAgICB2YWxpZENsYXNzOiBcImlzLXZhbGlkXCIsXG5cbiAgICAvLyBlcnJvciBlbGVtZW50IHRhZ1xuICAgIGVycm9yRWxlbWVudDogXCJkaXZcIixcblxuICAgIC8vIGNvbW1lbnQgdGhpcyB0d28gZmllbGRzIHRvIHVzZSBib290c3RyYXAgZGVmYXVsdCBtYXJrdXAgZm9yIGVycm9yXG4gICAgd3JhcHBlcjogXCJsaVwiLFxuXG4gICAgLy8gdmFsaWRhdGlvbiBldmVudFxuICAgIG9ua2V5dXA6IGZhbHNlLFxuICAgIG9uY2xpY2s6IGZhbHNlLFxuXG4gICAgLy8gaWdub3JlZCBlbGVtZW50cyB3aGVuIHZhbGlkYXRpbmdcbiAgICBpZ25vcmU6IFwiXCIsXG5cbiAgICAvLyBwZXJzb25hbGlzZWQgcnVsZXNcbiAgICAvLyBhZGQgcnVsZXMgd2l0aCB0aGUgbmFtZSBvZiB0aGUgaW5wdXQgZmllbGRzXG4gICAgcnVsZXM6IHtcbiAgICAgIC8vIHNpbXBsZSBydWxlLCBjb252ZXJ0ZWQgdG8ge3JlcXVpcmVkOnRydWV9XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW5sZW5ndGg6IDQsXG4gICAgICB9LFxuICAgICAgLy8gY29tcG91bmQgcnVsZVxuICAgICAgZW1haWw6IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGVtYWlsOiB0cnVlXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbmxlbmd0aDogNFxuICAgICAgfSxcbiAgICAgIHBob25lOiB7XG4gICAgICAgIHRlbGU6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gcGVyc29uYWxpc2VkIG1lc3NhZ2VzXG4gICAgbWVzc2FnZXM6IHtcbiAgICAgIC8vIHJlcXVpcmVkOkRydXBhbC50KFwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIiksXG4gICAgICByZW1vdGU6IERydXBhbC50KFwiUGxlYXNlIGZpeCB0aGlzIGZpZWxkLlwiKSxcbiAgICAgIGVtYWlsOiBEcnVwYWwudChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuXCIpLFxuICAgICAgdXJsOiBEcnVwYWwudChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIFVSTC5cIiksXG4gICAgICBkYXRlOiBEcnVwYWwudChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGRhdGUuXCIpLFxuICAgICAgZGF0ZUlTTzogRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlIChJU08pLlwiKSxcbiAgICAgIG51bWJlcjogRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBudW1iZXIuXCIpLFxuICAgICAgZGlnaXRzOiBEcnVwYWwudChcIlBsZWFzZSBlbnRlciBvbmx5IGRpZ2l0cy5cIiksXG4gICAgICBjcmVkaXRjYXJkOiBEcnVwYWwudChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGNyZWRpdCBjYXJkIG51bWJlci5cIiksXG4gICAgICBlcXVhbFRvOiBEcnVwYWwudChcIlBsZWFzZSBlbnRlciB0aGUgc2FtZSB2YWx1ZSBhZ2Fpbi5cIiksXG4gICAgICBhY2NlcHQ6IERydXBhbC50KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgd2l0aCBhIHZhbGlkIGV4dGVuc2lvbi5cIiksXG4gICAgICBtYXhsZW5ndGg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KERydXBhbC50KFwiUGxlYXNlIGVudGVyIG5vIG1vcmUgdGhhbiB7MH0gY2hhcmFjdGVycy5cIikpLFxuICAgICAgbWlubGVuZ3RoOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChEcnVwYWwudChcIlBsZWFzZSBlbnRlciBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy5cIikpLFxuICAgICAgcmFuZ2VsZW5ndGg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KERydXBhbC50KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgYmV0d2VlbiB7MH0gYW5kIHsxfSBjaGFyYWN0ZXJzIGxvbmcuXCIpKSxcbiAgICAgIHJhbmdlOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChEcnVwYWwudChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGJldHdlZW4gezB9IGFuZCB7MX0uXCIpKSxcbiAgICAgIG1heDogalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQoRHJ1cGFsLnQoXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gezB9LlwiKSksXG4gICAgICBtaW46IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KERydXBhbC50KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHswfS5cIikpXG4gICAgfSxcbiAgICBoaWdobGlnaHQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAvLyBfdGhpcy5hZGRDbGFzcygnd2FzLXZhbGlkYXRlZCcpO1xuXG4gICAgICB2YXIgcGhvbmVMYWJlbEluZGV4ID0gXCJcIjtcblxuICAgICAgJC5lYWNoKHRoaXMuZXJyb3JMaXN0LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUuZWxlbWVudC5uYW1lID09ICdwaG9uZScgJiYgdmFsdWUubWV0aG9kID09ICdlbWFpbE9yUGhvbmUnKSB7XG4gICAgICAgICAgcGhvbmVMYWJlbEluZGV4ID0ga2V5O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChwaG9uZUxhYmVsSW5kZXggIT09IFwiXCIpIHtcbiAgICAgICAgdGhpcy5lcnJvckxpc3Quc3BsaWNlKHBob25lTGFiZWxJbmRleCwgMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbW1lbnQgdGhpcyBzdGF0bWVudCBpZiBub3QgdXNpbmcgZXJyb3IgbWVzc2FnZXMgd3JhcHBlclxuICAgICAgaWYgKF9faXNUb3AgPT09IGZhbHNlKSB7XG4gICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogJCgnLnZhbGlkYXRpb24tbWVzc2FnZXMtYm94LmFsZXJ0Jykub2Zmc2V0KCkudG9wIC0gMjAwXG4gICAgICAgIH0sIDcwMCk7XG4gICAgICAgIF9faXNUb3AgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgX2VsID0gJChlbGVtZW50KTtcbiAgICAgIGlmIChfZWwuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgIC8vIF9lbC5wYXJlbnQoJy5zZWxlY3Qtd3JhcHBlcicpLmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XG4gICAgICAgIC8vX2VsLnNpYmxpbmdzKCcuc2VsZWN0ZWQtb3B0aW9uJykuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgICAgLy8gX2VsLnNpYmxpbmdzKCcuYnRuLWdyb3VwJykuZmluZCgnYnV0dG9uJykuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgICAgX2VsLnNpYmxpbmdzKCcuc2VsZWN0ZWQtb3B0aW9uJykucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF9lbC5pcygnaW5wdXRbdHlwZT1cInJhZGlvXCJdJykpIHtcbiAgICAgICAgX2VsLnBhcmVudHMoJy5mb3JtLXR5cGUtcmFkaW9zJykuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF9lbC5pcygnZmlsZScpKSB7XG4gICAgICAgIF9lbC5wYXJlbnQoKS5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xuICAgICAgICBfZWwucGFyZW50cygnLmZvcm0tbWFuYWdlZC1maWxlJykuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF9lbC5pcygnaW5wdXRbdHlwZT1cImhpZGRlblwiXScpKSB7XG4gICAgICAgIF9lbC5wYXJlbnRzKCcuZm9ybS1tYW5hZ2VkLWZpbGUnKS5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIF9lbC5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdW5oaWdobGlnaHQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICB2YXIgX2VsID0gJChlbGVtZW50KTtcbiAgICAgIGlmIChfZWwuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgIC8vIF9lbC5wYXJlbnQoJy5zZWxlY3Qtd3JhcHBlcicpLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XG4gICAgICAgIC8vX2VsLnNpYmxpbmdzKCcuc2VsZWN0ZWQtb3B0aW9uJykucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgICAgLy8gX2VsLnNpYmxpbmdzKCcuYnRuLWdyb3VwJykuZmluZCgnYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgICAgX2VsLnNpYmxpbmdzKCcuc2VsZWN0ZWQtb3B0aW9uJykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF9lbC5pcygnaW5wdXRbdHlwZT1cInJhZGlvXCJdJykpIHtcbiAgICAgICAgX2VsLnBhcmVudHMoJy5mb3JtLXR5cGUtcmFkaW9zJykucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF9lbC5pcygnaW5wdXRbdHlwZT1cImZpbGVcIl0nKSkge1xuICAgICAgICBfZWwucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgICAgX2VsLnBhcmVudHMoJy5mb3JtLW1hbmFnZWQtZmlsZScpLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfZWwuaXMoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl0nKSkge1xuICAgICAgICBfZWwucGFyZW50cygnLmZvcm0tbWFuYWdlZC1maWxlJykucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBfZWwucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIGhhbmRsZXIgZm9yIGludmFsaWQgZm9ybVxuICAgIGludmFsaWRIYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQsIHZhbGlkYXRvcikge1xuICAgICAgLy8gJ3RoaXMnIHJlZmVycyB0byB0aGUgZm9ybVxuICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRvci5udW1iZXJPZkludmFsaWRzKCk7XG4gICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgIC8vIGNvbW1lbnQgaWYgbm90IHVzaW5nIGVycm9ycyBtZXNzYWdlcyB3cmFwcGVyXG4gICAgICAgICQoXCIudmFsaWRhdGlvbi1tZXNzYWdlcy1ib3hcIikuc2hvdygpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGNvbW1lbnQgaWYgbm90IHVzaW5nIGVycm9ycyBtZXNzYWdlcyB3cmFwcGVyXG4gICAgICAgICQoXCIudmFsaWRhdGlvbi1tZXNzYWdlcy1ib3hcIikuaGlkZSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBoYW5kbGVyIGZvciB2YWxpZCBmb3JtXG4gICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24gKGZvcm0pIHtcbiAgICAgIC8vIGRvIG90aGVyIHRoaW5ncyBmb3IgYSB2YWxpZCBmb3JtXG4gICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gYWRkIHNwZWNpZmljIG1ldGhvZFxuXG4gIGpRdWVyeS52YWxpZGF0b3IuYWRkTWV0aG9kKCdmdWxsRW1haWwnLCBmdW5jdGlvbiAodmFsdWUsIGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25hbChlbGVtZW50KSB8fCAvXFxTK0BcXFMrXFwuXFxTKy8udGVzdCh2YWx1ZSk7XG4gIH0sIERydXBhbC50KFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWxcIikpO1xuXG4gIGpRdWVyeS52YWxpZGF0b3IuYWRkTWV0aG9kKCdlbWFpbE9yUGhvbmUnLCBmdW5jdGlvbiAodmFsdWUsIGVsZW1lbnQpIHtcbiAgICByZXR1cm4gJChcIiNlZGl0LWVtYWlsXCIpLnZhbCgpICE9PSBcIlwiIHx8ICQoXCIjZWRpdC1waG9uZVwiKS52YWwoKSAhPT0gXCJcIjtcbiAgfSwgRHJ1cGFsLnQoXCJZb3UgbXVzdCBwcm92aWRlIGF0IGxlYXN0IG9uZSBjb250YWN0IGZpZWxkXCIpKTtcblxuICBqUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZCgnY2FwdGNoYV92YWxpZGF0aW9uJywgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50KSB7XG4gICAgdmFyIGdvb2dsZVJlc3BvbnNlID0galF1ZXJ5KCcjZy1yZWNhcHRjaGEtcmVzcG9uc2UnKS52YWwoKTtcbiAgICByZXR1cm4gZ29vZ2xlUmVzcG9uc2UubGVuZ3RoID4gMDtcbiAgfSwgRHJ1cGFsLnQoXCJWZXVpbGxleiB2YWxpZGVyIGxlIGNhcHRjaGFcIikpO1xuXG4gIGpRdWVyeS52YWxpZGF0b3IuYWRkTWV0aG9kKCdwYXNzd29yZCcsIGZ1bmN0aW9uICh2YWx1ZSwgZWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIHx8IHZhbHVlLmxlbmd0aCA+PSA1O1xuICB9KTtcblxuICBqUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZCgnc2VhcmNoX2tleV92YWxpZGF0aW9uJywgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50KSB7XG4gICAgcmV0dXJuIC9eLipbXFx1MDA0MS1cXHUwMDVBXFx1MDA2MS1cXHUwMDdBXFx1MDBDMC1cXHUwMEY2XFx1MDYwMC1cXHUwNkZGMC05XXszfS4qJC8udGVzdCh2YWx1ZSk7XG4gIH0sIERydXBhbC50KFwiVm91cyBkZXZleiBpbmNsdXJlIGF1IG1vaW5zIHVuIG1vdC1jbMOpIHBvdXIgY29ycmVzcG9uZHJlIGF1IGNvbnRlbnUuIExlcyBtb3RzLWNsw6lzIGRvaXZlbnQgY29udGVuaXIgYXUgbW9pbnMgMyBjYXJhY3TDqHJlcywgZXQgbGEgcG9uY3R1YXRpb24gZXN0IGlnbm9yw6llLlwiKSk7XG5cbiAgalF1ZXJ5LnZhbGlkYXRvci5hZGRNZXRob2QoXCJyZXF1aXJlX2Zyb21fZ3JvdXBcIiwgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIHZhbGlkYXRvciA9IHRoaXM7XG4gICAgdmFyIHNlbGVjdG9yID0gb3B0aW9uc1sxXTtcbiAgICB2YXIgdmFsaWRPck5vdCA9ICQoc2VsZWN0b3IsIGVsZW1lbnQuZm9ybSkuZmlsdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB2YWxpZGF0b3IuZWxlbWVudFZhbHVlKHRoaXMpO1xuICAgIH0pLmxlbmd0aCA+PSBvcHRpb25zWzBdO1xuXG4gICAgaWYgKCEkKGVsZW1lbnQpLmRhdGEoJ2JlaW5nX3ZhbGlkYXRlZCcpKSB7XG4gICAgICB2YXIgZmllbGRzID0gJChzZWxlY3RvciwgZWxlbWVudC5mb3JtKTtcbiAgICAgIGZpZWxkcy5kYXRhKCdiZWluZ192YWxpZGF0ZWQnLCB0cnVlKTtcbiAgICAgIGZpZWxkcy52YWxpZCgpO1xuICAgICAgZmllbGRzLmRhdGEoJ2JlaW5nX3ZhbGlkYXRlZCcsIGZhbHNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkT3JOb3Q7XG4gIH0sIERydXBhbC50KFwiVmV1aWxsZXogcmVuc2VpZ25lciBhdSBtb2luIHswfSBjaGFtcHMuXCIpKTtcblxuICAvLyBhZGQgc3BlY2lmaWMgbWV0aG9kIC0gTGV0dGVyICYgbGV0dGVyIGFjZW50ZWQgJiBBcmFiaWMgY2FyYWN0ZXJzXG4gIGpRdWVyeS52YWxpZGF0b3IuYWRkTWV0aG9kKCdhbHBoYWInLCBmdW5jdGlvbiAodmFsdWUsIGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25hbChlbGVtZW50KSB8fCAvXltcXHUwMDQxLVxcdTAwNUFcXHUwMDYxLVxcdTAwN0FcXHUwMEMwLVxcdTAwRjZcXHUwNjAwLVxcdTA2RkYgXFwtXFxzXSskLy50ZXN0KHZhbHVlKVxuICAgIC8vcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHwgL15bXFx1MDAwMC1cXHUwMDdGXFx1MDYwMC1cXHUwNkZGXG4gICAgLy8gXFwtX1xcc10rJC8udGVzdCh2YWx1ZSkgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHxcbiAgICAvLyAvXltcXHB7TH1dK1tcXHB7TH1cXHMtXSokLy50ZXN0KHZhbHVlKVxuICB9KTtcblxuICBqUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZCgnbm9fYXJhYmljJywgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHwgL15bXlxcdTA2MDAtXFx1MDZGRl0rJC8udGVzdCh2YWx1ZSlcbiAgfSk7XG5cbiAgalF1ZXJ5LnZhbGlkYXRvci5hZGRNZXRob2QoJ3RlbGUnLCBmdW5jdGlvbiAodmFsdWUsIGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25hbChlbGVtZW50KSB8fCAvWytdezAsMX1bMC05XXsxLDR9W1xcc117MCwxfVswLTldezksMTR9JC8udGVzdCh2YWx1ZSk7XG4gIH0sIERydXBhbC50KFwiVmV1aWxsZXogc2Fpc2lyIHVuIG51bcOpcm8gZGUgdMOpbMOpcGhvbmUgdmFsaWRlXCIpKTtcblxuICBqUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZCgnZW1haWxPclBob25lJywgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50KSB7XG4gICAgcmV0dXJuICQoXCIjZWRpdC1lbWFpbFwiKS52YWwoKSAhPT0gXCJcIiB8fCAkKFwiI2VkaXQtbW9iaWxlLXBob25lXCIpLnZhbCgpICE9PSBcIlwiO1xuICB9LCBEcnVwYWwudChcIlZvdXMgZGV2ZXogcmVuc2VpZ25lciBhdSBtb2luIHVuIGNoYW1wIGRlIGNvbnRhY3RcIikpO1xuXG4gIGpRdWVyeS52YWxpZGF0b3IuYWRkTWV0aG9kKFwiZXh0ZW5zaW9uXCIsIGZ1bmN0aW9uICh2YWx1ZSwgZWxlbWVudCwgcGFyYW0pIHtcbiAgICBwYXJhbSA9IHR5cGVvZiBwYXJhbSA9PT0gXCJzdHJpbmdcIiA/IHBhcmFtLnJlcGxhY2UoLywvZywgJ3wnKSA6IFwicG5nfGpwZT9nfGdpZlwiO1xuICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIHx8IHZhbHVlLm1hdGNoKG5ldyBSZWdFeHAoXCIuKFwiICsgcGFyYW0gKyBcIikkXCIsIFwiaVwiKSk7XG4gIH0sIERydXBhbC50KFwiVmV1aWxsZXogc2Fpc2lyIHVuZSB2YWxldXIgYXZlYyB1bmUgZXh0ZW5zaW9uIHZhbGlkZS5cIikpO1xuXG4gIGpRdWVyeS52YWxpZGF0b3IuYWRkTWV0aG9kKCd0ZWxlX21hcm9jJywgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHwgL14wWzZ8N11cXGR7OH0kLy50ZXN0KHZhbHVlKTtcbiAgfSwgRHJ1cGFsLnQoXCJWZXVpbGxleiBzYWlzaXIgdW4gbnVtw6lybyBkZSB0w6lsw6lwaG9uZSBtb2JpbGUgdmFsaWRlXCIpKTtcblxuICBqUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZCgndGVsZV9maXhlX21hcm9jJywgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHwgL14wNVxcZHs4fSQvLnRlc3QodmFsdWUpO1xuICB9LCBEcnVwYWwudChcIlZldWlsbGV6IHNhaXNpciB1biBudW3DqXJvIGRlIHTDqWzDqXBob25lIGZpeGUgdmFsaWRlXCIpKTtcblxuICBqUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZCgnY2luJywgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHxcbiAgICAgIC8vIENJTiBtYXJvYyBzYW5zIHRpcmV0LlxuICAgICAgL14oKFthLXpBLVpdezEsMn0pKFswLTldezMsNn0pKSQvLnRlc3QodmFsdWUpIHx8XG4gICAgICAvLyBDSU4gbWFyb2MgYXZlYyB0aXJldCBzYW5zIGVzcGFjZS5cbiAgICAgIC9eKChbYS16QS1aXXsyfSlbLV0oWzAtOV17Myw2fSkpJC8udGVzdCh2YWx1ZSkgfHxcbiAgICAgIC8vIENJTiBtYXJvYyBhdmVjIHRpcmV0IGV0IGVzcGFjZS5cbiAgICAgIC9eKChbYS16QS1aXXsxfSlbIF1bLV0oWzAtOV17Myw2fSkpJC8udGVzdCh2YWx1ZSkgfHxcbiAgICAgIC8vIENJTiBFdHJhbmdlciBhdmVjIHRpcmV0IGF2ZWMgZXNwYWNlLlxuICAgICAgL14oKFthLXpBLVpdezF9KVsgXVstXShbMC05XXsxLDZ9KShbYS16QS1aXXsxfSkpJC8udGVzdCh2YWx1ZSkgfHxcbiAgICAgIC8vIENJTiBFdHJhbmdlciBhdmVjIHRpcmV0IHNhbnMgZXNwYWNlLlxuICAgICAgL14oKFthLXpBLVpdezJ9KVstXShbMC05XXsxLDZ9KShbYS16QS1aXXsxfSkpJC8udGVzdCh2YWx1ZSkgfHxcbiAgICAgIC8vIENJTiBFdHJhbmdlciBzYW5zIHRpcmV0LlxuICAgICAgL14oKFthLXpBLVpdezEsMn0pKFswLTldezEsNn0pKFthLXpBLVpdezF9KSkkLy50ZXN0KHZhbHVlKVxuICB9LCBEcnVwYWwudChcIkZvcm1hdCBkZSBsYSBDSU4gaW5jb3JyZWN0ZVwiKSk7XG5cbiAgalF1ZXJ5LnZhbGlkYXRvci5hZGRNZXRob2QoJ2NhcHRjaGFfdmFsaWRhdGlvbicsIGZ1bmN0aW9uICh2YWx1ZSwgZWxlbWVudCkge1xuICAgIHZhciBnb29nbGVSZXNwb25zZSA9IGpRdWVyeSgnI2ctcmVjYXB0Y2hhLXJlc3BvbnNlJykudmFsKCk7XG4gICAgcmV0dXJuIGdvb2dsZVJlc3BvbnNlLmxlbmd0aCA+IDA7XG4gIH0sIERydXBhbC50KFwiVmV1aWxsZXogdmFsaWRlciBsZSBjYXB0Y2hhXCIpKTtcblxuICBqUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZCgnc2VjdXJlZF9wYXNzd29yZCcsIGZ1bmN0aW9uICh2YWx1ZSwgZWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIHx8ICh2YWx1ZS5sZW5ndGggPj0gOCAmJiAvXig/PS4qXFxkKSg/PS4qKFthLXpBLVpdKSkuezgsMjB9JC8udGVzdCh2YWx1ZSkpO1xuICB9KTtcblxuICBqUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZCgncGFzc3dvcmQnLCBmdW5jdGlvbiAodmFsdWUsIGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25hbChlbGVtZW50KSB8fCAodmFsdWUubGVuZ3RoID49IDUpO1xuICB9KTtcblxuICAvLyBvdmVycmlkZSBkZWZhdWx0IG1lc3NhZ2VzIGZvciBzcGVjaWZpYyBmb3JtIGZpZWxkXG4gICQudmFsaWRhdG9yLm1lc3NhZ2VzLnJlcXVpcmVkID0gZnVuY3Rpb24gKHBhcmFtLCBpbnB1dCkge1xuICAgIHZhciBfaW5wdXQgPSAkKGlucHV0KSxcbiAgICAgIF9uYW1lID0gXCJcIjtcblxuICAgIGlmICh0eXBlb2YgX2lucHV0LmRhdGEoJ3dlYmZvcm0tcmVxdWlyZWQtZXJyb3InKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBfaW5wdXQuZGF0YSgnd2ViZm9ybS1yZXF1aXJlZC1lcnJvcicpO1xuICAgIH1cbiAgICBlbHNlIGlmIChfaW5wdXQuaXMoXCJmaWxlXCIpID09PSB0cnVlKSB7XG4gICAgICBfbmFtZSA9IF9pbnB1dC5wYXJlbnRzKCcuZm9ybS1tYW5hZ2VkLWZpbGVkJykuZmluZCgnLm1hbmFnZWQtZmlsZS1wbGFjZWhvbGRlcicpLnRleHQoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoX2lucHV0LmlzKFwidGV4dGFyZWFcIikgPT09IHRydWUpIHtcbiAgICAgIF9uYW1lID0gX2lucHV0LnBhcmVudHMoJy5mb3JtLXR5cGUtdGV4dGFyZWEnKS5maW5kKCdsYWJlbCcpLnRleHQoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoX2lucHV0LmF0dHIoJ3R5cGUnKSA9PSAncmFkaW8nKSB7XG4gICAgICBfbmFtZSA9IF9pbnB1dC5wYXJlbnRzKCcuZm9ybS10eXBlLXJhZGlvcycpLmZpbmQoJz4gbGFiZWwnKS50ZXh0KCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKF9pbnB1dC5pcyhcInNlbGVjdFwiKSA9PT0gdHJ1ZSkge1xuICAgICAgX25hbWUgPSAkKGlucHV0KS5wYXJlbnRzKCcuZm9ybS10eXBlLXNlbGVjdCcpLmZpbmQoJyA+IGxhYmVsJykudGV4dCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIF9uYW1lID0gX2lucHV0LnBhcmVudCgnLmZvcm0tZ3JvdXAnKS5maW5kKCdsYWJlbCcpLnRleHQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gRHJ1cGFsLnQoJ0ZpZWxkJykgKyAnICcgKyBfbmFtZS5yZXBsYWNlKCcqJywgJycpICsgJyAnICsgRHJ1cGFsLnQoJyBpcyByZXF1aXJlZCcpO1xuICB9O1xuXG4gIC8vIG92ZXJyaWRlIGRlZmF1bHQgbWVzc2FnZXMgZm9yIGlucHV0IHR5cGUgbWlubGVuZ3RoXG4gICQudmFsaWRhdG9yLm1lc3NhZ2VzLm1pbmxlbmd0aCA9IGZ1bmN0aW9uIChwYXJhbSwgaW5wdXQpIHtcbiAgICB2YXIgX25hbWUgPSAkKGlucHV0KS5wYXJlbnRzKCcuZm9ybS1ncm91cCcpLmZpbmQoJ2xhYmVsJykudGV4dCgpO1xuICAgIHJldHVybiBEcnVwYWwudChcIkxlIGNoYW1wIEBuYW1lIGRvaXQgw6p0cmUgY29tcG9zw6kgZGUgQHBhcmFtIGxldHRyZXMgYXUgbW9pbnNcIiwge1xuICAgICAgJ0BuYW1lJzogX25hbWUucmVwbGFjZSgnKicsICcnKSxcbiAgICAgICdAcGFyYW0nOiBwYXJhbVxuICAgIH0pO1xuICB9O1xuXG4gIERydXBhbC52YWN0b3J5LnV0aWxpdHkuZm9ybVZhbGlkYXRpb24gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAvLyB0aGUgZm9ybSBjb250YWluZXIvcGFyZW50c1xuICAgICAgLy8gYWRkIHNlbGVjdG9yIG9mIGZvcm1zXG4gICAgICB2YXIgJF9mb3JtcyA9ICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSwgLmpzLWZvcm0tY29udHJvbCcpO1xuXG4gICAgICAvLyBhZGQgdmFsaWRhdGlvbiBmb3IgZm9ybXNcbiAgICAgIGlmICgkX2Zvcm1zLmxlbmd0aCkge1xuICAgICAgICAvLyBmb3JlYWNoIGZvcm1cbiAgICAgICAgJF9mb3Jtcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBjcmVhdGUgZXJyb3IgbWVzc2FnZXMgY29udGFpbmVyXG4gICAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgIF9mb3JtaWQgPSBfdGhpcy5hdHRyKCdpZCcpLFxuICAgICAgICAgICAgX2Vycm9yc0hUTUwgPSAkKCc8dWw+PC91bD4nKS5hdHRyKHtcbiAgICAgICAgICAgICAgJ2lkJzogX2Zvcm1pZCxcbiAgICAgICAgICAgICAgJ2NsYXNzJzogJ3ZhbGlkYXRpb24tbWVzc2FnZXMtYm94IGFsZXJ0IGFsZXJ0LWRhbmdlcidcbiAgICAgICAgICAgIH0pLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnByZXBlbmQoX2Vycm9yc0hUTUwpO1xuXG5cbiAgICAgICAgICAvLyB1bmhpZ2hsaWdodCByYWRpb3MgYnV0dG9ucyBncm91cFxuICAgICAgICAgIF90aGlzLmZpbmQoJ2lucHV0W3R5cGU9cmFkaW9dJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudHMoJy5mb3JtLXR5cGUtcmFkaW9zJykuaGFzQ2xhc3MoJ2lzLWludmFsaWQnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLmZvcm0tdHlwZS1yYWRpb3MnKS5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIF90aGlzLnZhbGlkYXRlKHtcbiAgICAgICAgICAgIGVycm9yTGFiZWxDb250YWluZXI6ICQoJyMnICsgX2Zvcm1pZCksXG4gICAgICAgICAgfSk7XG5cblxuICAgICAgICAgIGpRdWVyeS5leHRlbmQoalF1ZXJ5LnZhbGlkYXRvci5tZXNzYWdlcywge1xuICAgICAgICAgICAgZW1haWw6IERydXBhbC50KFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5cIiksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBqUXVlcnkoJ2lucHV0W3R5cGU9XCJmaWxlXCJdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciAkc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICBpZigkc2VsZi5maW5kKCcud2ViZm9ybS1kb2N1bWVudC1maWxlJykuaGFzQ2xhc3MoJ3JlcXVpcmVkJykpIHtcbiAgICAgICAgICAgICAgJHNlbGYucnVsZXMoJ2FkZCcsIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuXG4gICAgICAgIH0pOyAvLyBlbmQgZm9yZWFjaFxuICAgICAgfSAvL2VuZCBpZlxuICAgIH0pO1xuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IEdvIFRPUCBTdGlja3kgQnV0dG9uLlxuLy9cbi8vIyMgU2hvdyBvciBoaWRlIHRoZSBzdGlja3kgZm9vdGVyIGJ1dHRvblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5nb3RvU3RpY2t5QnV0dG9uID0gZnVuY3Rpb24gKCkge1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkZWxlbWVudCA9ICQoJy52Zi1nby1iYWNrLXRvcCcpLFxuICAgICAgICAkZG9jdW1lbnQgPSAkKCdodG1sLCBib2R5Jyk7XG5cbiAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICAgICRlbGVtZW50LmZhZGVJbigyMDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICRlbGVtZW50LmZhZGVPdXQoMjAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEFuaW1hdGUgdGhlIHNjcm9sbCB0byB0b3AuXG4gICAgICAkZWxlbWVudC5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGRvY3VtZW50LmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDMwMCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy89PSBQb3J0cmFpdCAvIExhbmRzY2FwZSBkZXRlY3Rpb25cbi8vXG4vLyMjIERpc2FibGUgUG9ydHJhaXQgZm9yIFRhYmxldCAmIExhbmRzY2FwZSBmb3IgTW9iaWxlLlxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5kZXRlY3RJbnRlcnN0aXRpZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRfYm9keSA9ICQoJ2JvZHknKSxcbiAgICAgICAgJF93aW5kb3cgPSAkKHdpbmRvdyk7XG5cbiAgICAgIC8vIEluaXQgZGVmYXVsdHNcbiAgICAgIC8vIFdoYXRldmVyIHdlIGhhdmUgcGFzc2VkIHRoaXMgYmVmb3JlIG9yIG5vdC5cbiAgICAgICRfYm9keS5kYXRhKCdpbnRlcnN0aXRpZWxEaXNhYmxlZCcsIGZhbHNlKTtcblxuICAgICAgLy8gQXBwbHkgaW50ZXJzdGl0aWVsXG4gICAgICBpZiAobWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogMTAyNHB4KSBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdClcIikubWF0Y2hlcyB8fCBtYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNzY4cHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIikubWF0Y2hlcykge1xuICAgICAgICAkX2JvZHkuYWRkQ2xhc3MoXCJpbnRlcnN0aXRpZWwtbW9kZVwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gV2FpdCB1bnRpbCBpbm5lcmhlaWdodCBjaGFuZ2VzLCBmb3IgbWF4IDQ1IGZyYW1lc1xuICAgICAgZnVuY3Rpb24gb3JpZW50YXRpb25DaGFuZ2VkKCkge1xuICAgICAgICB2YXIgdGltZW91dCA9IDQ1O1xuICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgdmFyIGdvID0gZnVuY3Rpb24gKGksIGhlaWdodDApIHtcbiAgICAgICAgICAgIHdpbmRvdy5pbm5lckhlaWdodCAhPSBoZWlnaHQwIHx8IGkgPj0gdGltZW91dCA/XG4gICAgICAgICAgICAgIHJlc29sdmUoKSA6XG4gICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGdvKGkgKyAxLCBoZWlnaHQwKTtcbiAgICAgICAgICAgICAgfSk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgICAgICAgIH07XG4gICAgICAgICAgZ28oMCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgICRfd2luZG93Lm9uKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBvcmllbnRhdGlvbkNoYW5nZWQoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBBcHBseSBpbnRlcnN0aXRpZWxcbiAgICAgICAgICBpZiAoJF9ib2R5LmRhdGEoJ2ludGVyc3RpdGllbERpc2FibGVkJykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogMTAyNHB4KSBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdClcIikubWF0Y2hlcyB8fCBtYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNzY4cHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgICAkX2JvZHkuYWRkQ2xhc3MoXCJpbnRlcnN0aXRpZWwtbW9kZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENsb3NlIEludGVyc3RpdGllbFxuICAgICAgJCgnI2ludGVyc3RpdGllbC1idXR0b24tLWNsb3NlJykub24oXCJjbGljayB0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJF9ib2R5LnJlbW92ZUNsYXNzKFwiaW50ZXJzdGl0aWVsLW1vZGVcIik7XG4gICAgICAgICRfYm9keS5kYXRhKCdpbnRlcnN0aXRpZWxEaXNhYmxlZCcsIHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vPT0gZm9ybSBsYWJlbCBhbmltYXRpb25zXG4vL1xuLy8jIyBBcHBseSBjdXN0b20gY2xhc3MgdG8gYWRkIGFuaW1hdGlvbnMgdG8gZm9ybXMgbGFiZWwuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmxhYmVsQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgICAkKCdmb3JtIC5hbmltYXRlZC1sYWJlbCBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAoJCh2YWx1ZSkudmFsKCkubGVuZ3RoID4gMCkgPyAkKHZhbHVlKS5wYXJlbnQoKS5maW5kKCdsYWJlbCcpLmFkZENsYXNzKCdhbmltYXRlZCcpIDogJCh2YWx1ZSkucGFyZW50KCkuZmluZCgnbGFiZWwnKS5yZW1vdmVDbGFzcygnYW5pbWF0ZWQnKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCdmb3JtIC5hbmltYXRlZC1sYWJlbCB0ZXh0YXJlYScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAoJCh2YWx1ZSkudmFsKCkubGVuZ3RoID4gMCkgPyAkKHZhbHVlKS5wYXJlbnQoKS5maW5kKCdsYWJlbCcpLmFkZENsYXNzKCdhbmltYXRlZCcpIDogJCh2YWx1ZSkucGFyZW50KCkuZmluZCgnbGFiZWwnKS5yZW1vdmVDbGFzcygnYW5pbWF0ZWQnKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCdmb3JtIC5hbmltYXRlZC1sYWJlbCBpbnB1dCcpLm9uKCdmb2N1c2luJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2xhYmVsJykuYWRkQ2xhc3MoJ2FuaW1hdGVkJyk7XG4gICAgICB9KTtcblxuICAgICAgJCgnZm9ybSAuYW5pbWF0ZWQtbGFiZWwgaW5wdXQnKS5vbignZm9jdXNvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSkge1xuICAgICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnbGFiZWwnKS5yZW1vdmVDbGFzcygnYW5pbWF0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJ2Zvcm0gLmFuaW1hdGVkLWxhYmVsIHRleHRhcmVhJykub24oJ2ZvY3VzaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnbGFiZWwnKS5hZGRDbGFzcygnYW5pbWF0ZWQnKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCdmb3JtIC5hbmltYXRlZC1sYWJlbCB0ZXh0YXJlYScpLm9uKCdmb2N1c291dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdsYWJlbCcpLnJlbW92ZUNsYXNzKCdhbmltYXRlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSB2b2lkIG9uIDEwLzA5LzIwMTguXG4gKi9cbi8qKlxuICogQGZpbGVcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5saW5rc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gc2Nyb2xsIHRvIHRoZSBib3R0b20gb2YgdGFicyBzbGlkZXJcbiAgICAgICQoJy5saW5rLXNjcm9sbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogJCh0aGlzKS5wYXJlbnRzKCcucGFyYWdyYXBoJykub2Zmc2V0KCkudG9wICsgJCh0aGlzKS5wYXJlbnRzKCcucGFyYWdyYXBoJykub3V0ZXJIZWlnaHQodHJ1ZSlcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcblxuIiwiLy89PSBPdXRkYXRlZCBCcm93c2VyXG4vL1xuLy8jIyBJZGVudGlmeSBhbmQgdXBncmFkZSBvbGQgYnJvd3NlcnMuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBEcnVwYWwudmFjdG9yeS51dGlsaXR5Lm91dGRhdGVkQnJvd3NlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodHlwZW9mIG91dGRhdGVkQnJvd3NlciA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IGJhc2UgcGF0aC5cbiAgICAgIHZhciB0aGVtZUJhc2VQYXRoID0gRHJ1cGFsLnNldHRpbmdzLmJhc2VQYXRoICsgRHJ1cGFsLnNldHRpbmdzLnZhY3RvcnlfdGhlbWUucGF0aDtcbiAgICAgIHZhciBsYW5ndWFnZVBhdGggPSB0aGVtZUJhc2VQYXRoICsgJy9ib3dlcl9jb21wb25lbnRzL291dGRhdGVkLWJyb3dzZXIvb3V0ZGF0ZWRicm93c2VyL2xhbmcvJztcbiAgICAgIGxhbmd1YWdlUGF0aCArPSBEcnVwYWwudmFycy52YWN0b3J5LmxhbmcgKyAnLmh0bWwnO1xuXG4gICAgICAvLyBJbnN0YW5jZSBwbHVnaW4uXG4gICAgICBvdXRkYXRlZEJyb3dzZXIoe1xuICAgICAgICBiZ0NvbG9yOiAnI2YyNTY0OCcsXG4gICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgIGxvd2VyVGhhbjogJ3RyYW5zZm9ybScsXG4gICAgICAgIGxhbmd1YWdlUGF0aDogbGFuZ3VhZ2VQYXRoXG4gICAgICB9KTtcbiAgICB9KTtcblxuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICBcbiAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LnNhdGlzZmFjdGlvbkZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vc2F0aXNmYWN0aW9uIHJhbmdlIGJ5IGlucHV0IHJhZGlvICBcbiAgICAgICAgICAgICQoJy5zYXRpc2ZhY3Rpb24tcmFuZ2UgLmZvcm0tcmFkaW8nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLnJhZGlvJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKCcuc2F0aXNmYWN0aW9uLXJhbmdlIC5mb3JtLXJhZGlvJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLnNhdGlzZmFjdGlvbi1yYW5nZScpLmZpbmQoJy5yYWRpbycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5yYWRpbycpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59KShqUXVlcnksIERydXBhbCk7IiwiLy89PSBtdWx0aSBzZWxlY3Rcbi8vXG4vLyMjIEFwcGx5IG11bHRpc2VsZWN0XG5cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5zZWxlY3RNdWx0aXBsZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICQuZWFjaCgkKCdzZWxlY3RbbXVsdGlwbGU9XCJtdWx0aXBsZVwiXScpLCBmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgJChlbCkubXVsdGlzZWxlY3Qoe1xuICAgICAgICAgIG5vblNlbGVjdGVkVGV4dDogRHJ1cGFsLnQoJ1NlbGVjdGlvbm5lci4uLicpXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgICQoJy5idG4ubXVsdGlzZWxlY3QnKS5yZW1vdmVDbGFzcygnYnRuLWRlZmF1bHQnKTtcblxuICAgIH0pO1xuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IHNlbGVjdCBwaWNrZXJcbi8vXG4vLyMjIEFwcGx5IHNlbGVjdHBpY2tlclxuXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIERydXBhbC52YWN0b3J5LnV0aWxpdHkuc2VsZWN0cGlja2VyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgICB2YXIgaXNEZXZpY2UgPSAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgb3B0aW9ucyA9IHtzdHlsZTogbnVsbCx9O1xuXG4gICAgICAkLmVhY2goJCgnc2VsZWN0LnNlbGVjdHBpY2tlcjpub3QoW211bHRpcGxlPVwibXVsdGlwbGVcIl0pLCBzZWxlY3Quc2tpbm5lZC1zZWxlY3QsIHNlbGVjdC5sYW5nLWRyb3Bkb3duLXNlbGVjdC1lbGVtZW50JyksIGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICBpZiAoJChlbCkuaGFzQ2xhc3MoJ2xhbmctZHJvcGRvd24tc2VsZWN0LWVsZW1lbnQnKSkge1xuICAgICAgICAgICQoZWwpLnNlbGVjdHBpY2tlcih7XG4gICAgICAgICAgICBzdHlsZTogbnVsbCxcbiAgICAgICAgICAgIGRyb3B1cEF1dG8gOiB0cnVlLC8vIHRvIGZvcmNlIHRoZSBkcm9wZG93biB0byBhbHdheXMgb3BlbiBkb3duXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJChlbCkuc2VsZWN0cGlja2VyKHtcbiAgICAgICAgICAgIHN0eWxlOiAnY3VzdG9tJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJCgnc2VsZWN0LnNlbGVjdHBpY2tlcjpub3QoW211bHRpcGxlPVwibXVsdGlwbGVcIl0pLCBzZWxlY3Quc2tpbm5lZC1zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgKCQodmFsdWUpLmlzKCc6dmlzaWJsZScpICYmICQodmFsdWUpLmhhc0NsYXNzKCdqcy1hdXRvY29tcGxldGUnKSkgPyAkKHZhbHVlKS5hdHRyKCdkYXRhLWxpdmUtc2VhcmNoJywgdHJ1ZSkuYXR0cignZGF0YS1ub25lLXJlc3VsdHMtdGV4dCcsIERydXBhbC50KCdBdWN1biByw6lzdWx0YXQnKSkgOiBudWxsO1xuICAgICAgICAoJCh2YWx1ZSkuaXMoJzp2aXNpYmxlJykpID8gJCh2YWx1ZSkuc2VsZWN0cGlja2VyKCkgOiBudWxsO1xuICAgICAgfSk7XG5cbiAgICAgICQoJ3NlbGVjdDpub3QoLnNraW5uZWQtc2VsZWN0KTpub3QoLnNlbGVjdHBpY2tlcik6bm90KC5sYW5nLWRyb3Bkb3duLXNlbGVjdC1lbGVtZW50KScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdkYXRhLXBsYWNlaG9sZGVyLXZhbHVlJykpIHtcbiAgICAgICAgICAkKHRoaXMpLmZpbmQoJ29wdGlvblt2YWx1ZT1cIm5vbmVcIl0nKS50ZXh0KCQodGhpcykuYXR0cignZGF0YS1wbGFjZWhvbGRlci12YWx1ZScpKTtcbiAgICAgICAgfVxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdncm91cC1zZWxlY3QnKTtcbiAgICAgICAgaWYgKCEoJCh0aGlzKS5zaWJsaW5ncygpLmlzKFwic3BhblwiKSkpIHtcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFwcGVuZChcIjxzcGFuIGNsYXNzPSdzZWxlY3RlZC1vcHRpb24nPiBcIiArICQodGhpcykuZmluZChcIm9wdGlvbjpzZWxlY3RlZFwiKS50ZXh0KCkgKyBcIjwvc3Bhbj5cIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgJCgnc2VsZWN0Om5vdCguc2tpbm5lZC1zZWxlY3QpOm5vdCguc2VsZWN0cGlja2VyKTpub3QoLmxhbmctZHJvcGRvd24tc2VsZWN0LWVsZW1lbnQpJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0ciA9ICQodGhpcykuZmluZChcIm9wdGlvbjpzZWxlY3RlZFwiKS50ZXh0KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5zZWxlY3RlZC1vcHRpb25cIikudGV4dChzdHIpO1xuICAgICAgfSk7XG5cblxuICAgIH0pO1xuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IFNsaWNrIFNsaWRlclxuLyoqXG4gKiBhcnJvd3MgKGJvb2xlYW4pIDogRW5hYmxlIE5leHQvUHJldiBhcnJvd3NcbiAqIGRvdHMgKGJvb2xlYW4pIDogQ3VycmVudCBzbGlkZSBpbmRpY2F0b3IgZG90c1xuICogc2xpZGVzVG9TaG93IChpbnQpIDogIyBvZiBzbGlkZXMgdG8gc2hvdyBhdCBhIHRpbWVcbiAqIHNsaWRlc1RvU2Nyb2xsIChpbnQpIDogIyBvZiBzbGlkZXMgdG8gc2Nyb2xsIGF0IGEgdGltZVxuICogYXV0b3BsYXkgKGJvb2xlYW4pIDogRW5hYmxlcyBhdXRvIHBsYXkgb2Ygc2xpZGVzXG4gKiBhdXRvcGxheVNwZWVkIChpbnQgOiAzMDAwKSA6IEF1dG8gcGxheSBjaGFuZ2UgaW50ZXJ2YWxcbiAqIGNlbnRlck1vZGUgKGJvb2xlYW4pIDogRW5hYmxlcyBjZW50ZXJlZCB2aWV3IHdpdGggcGFydGlhbCBwcmV2L25leHQgc2xpZGVzLlxuICogVXNlIHdpdGggb2RkIG51bWJlcmVkIHNsaWRlc1RvU2hvdyBjb3VudHMuIGNlbnRlclBhZGRpbmcgKHN0cmluZzogNTBweCkgOlxuICogU2lkZSBwYWRkaW5nIHdoZW4gaW4gY2VudGVyIG1vZGUuIChweCBvciAlKSBkb3RzQ2xhc3MgKHN0cmluZzogc2xpY2stZG90cykgOlxuICogQ2xhc3MgZm9yIHNsaWRlIGluZGljYXRvciBkb3RzIGNvbnRhaW5lciBkcmFnZ2FibGUgKGJvb2xlYW4pIDogRW5hYmxlc1xuICogZGVza3RvcCBkcmFnZ2luZyBpbmZpbml0ZSAoYm9vbGVhbikgOiBJbmZpbml0ZSBsb29waW5nIGluaXRpYWxTbGlkZSAoaW50KSA6XG4gKiBTbGlkZSB0byBzdGFydCBvbiBydGwgKGJvb2xlYW4pIDogQ2hhbmdlIHRoZSBzbGlkZXIncyBkaXJlY3Rpb24gdG8gYmVjb21lXG4gKiByaWdodC10by1sZWZ0IHNwZWVkIChpbnQpIDogVHJhbnNpdGlvbiBzcGVlZCB2YXJpYWJsZVdpZHRoIChib29sZWFuKSA6XG4gKiBEaXNhYmxlcyBhdXRvbWF0aWMgc2xpZGUgd2lkdGggY2FsY3VsYXRpb24gYWRhcHRpdmVIZWlnaHQgKGJvb2xlYW4pIDogQWRhcHRzXG4gKiBzbGlkZXIgaGVpZ2h0IHRvIHRoZSBjdXJyZW50IHNsaWRlIHByZXZBcnJvdyAoc3RyaW5nIChodG1sIHwgalF1ZXJ5XG4gKiBzZWxlY3RvcikgfCBvYmplY3QgKERPTSBub2RlIHwgalF1ZXJ5IG9iamVjdCkpIDogQWxsb3dzIHlvdSB0byBzZWxlY3QgYSBub2RlXG4gKiBvciBjdXN0b21pemUgdGhlIEhUTUwgZm9yIHRoZSBcIlByZXZpb3VzXCIgYXJyb3cuIG5leHRBcnJvdyAoc3RyaW5nIChodG1sIHxcbiAqIGpRdWVyeSBzZWxlY3RvcikgfCBvYmplY3QgKERPTSBub2RlIHwgalF1ZXJ5IG9iamVjdCkpIDogQWxsb3dzIHlvdSB0byBzZWxlY3RcbiAqIGEgbm9kZSBvciBjdXN0b21pemUgdGhlIEhUTUwgZm9yIHRoZSBcIk5leHRcIiBhcnJvdy4gYWNjZXNzaWJpbGl0eSAoYm9vbGVhbikgOlxuICogRW5hYmxlcyB0YWJiaW5nIGFuZCBhcnJvdyBrZXkgbmF2aWdhdGlvbi4gVW5sZXNzIGF1dG9wbGF5OiB0cnVlLCBzZXRzXG4gKiBicm93c2VyIGZvY3VzIHRvIGN1cnJlbnQgc2xpZGUgKG9yIGZpcnN0IG9mIGN1cnJlbnQgc2xpZGUgc2V0LCBpZiBtdWx0aXBsZVxuICogc2xpZGVzVG9TaG93KSBhZnRlciBzbGlkZSBjaGFuZ2UuIEZvciBmdWxsIGExMXkgY29tcGxpYW5jZSBlbmFibGVcbiAqIGZvY3VzT25DaGFuZ2UgaW4gYWRkaXRpb24gdG8gdGhpcy4gdXNlVHJhbnNmb3JtIHVzZVRyYW5zZm9ybSA6XG4gKiBFbmFibGUvRGlzYWJsZSBDU1MgVHJhbnNmb3JtcyBjc3NFYXNlIChzdHJpbmcgOiBlYXNlKSA6IENTUzMgZWFzaW5nIGVhc2luZ1xuICogKHN0cmluZzogbGluZWFyKSA6IGFuaW1hdGUoKSBmYWxsYmFjayBlYXNpbmcgZm9jdXNPblNlbGVjdCAoYm9vbGVhbik6IEVuYWJsZVxuICogZm9jdXMgb24gc2VsZWN0ZWQgZWxlbWVudCAoY2xpY2spIGZvY3VzT25DaGFuZ2UgKGJvb2xlYW4pIDogUHV0cyBmb2N1cyBvblxuICogc2xpZGUgYWZ0ZXIgY2hhbmdlIGxhenlMb2FkIChzdHJpbmcgOiBvbmRlbWFuZHxwcm9ncmVzc2l2ZSkgOiBBY2NlcHRzXG4gKiAnb25kZW1hbmQnIG9yICdwcm9ncmVzc2l2ZScgZm9yIGxhenkgbG9hZCB0ZWNobmlxdWUuICdvbmRlbWFuZCcgd2lsbCBsb2FkXG4gKiB0aGUgaW1hZ2UgYXMgc29vbiBhcyB5b3Ugc2xpZGUgdG8gaXQsICdwcm9ncmVzc2l2ZScgbG9hZHMgb25lIGltYWdlIGFmdGVyXG4gKiB0aGUgb3RoZXIgd2hlbiB0aGUgcGFnZSBsb2Fkcy4gcGF1c2VPbkRvdHNIb3ZlciAoYm9vbGVhbikgOiBQYXVzZXMgYXV0b3BsYXlcbiAqIHdoZW4gYSBkb3QgaXMgaG92ZXJlZCBwYXVzZU9uRm9jdXMgKGJvb2xlYW4pIDsgUGF1c2VzIGF1dG9wbGF5IHdoZW4gc2xpZGVyXG4gKiBpcyBmb2N1c3NlZCBwYXVzZU9uSG92ZXIgKGJvb2xlYW4pIDogUGF1c2VzIGF1dG9wbGF5IG9uIGhvdmVyIHN3aXBlXG4gKiAoYm9vbGVhbikgOiAgRW5hYmxlcyB0b3VjaCBzd2lwZVxuICpcbiAqXG4gKlxuICogV2UgbWFuYWdlIHNsaWRlciBvbiBvdXIgdHdpZyB3aXRoIGRhdGEuIGV4ZW1wbGU6XG4gKiA8ZGl2IGNsYXNzPVwidmYtc2xpY2stc2xpZGVyXCIgZGF0YS1kb3RzPVwidHJ1ZVwiIGRhdGEtYXJyb3dzPVwidHJ1ZVwiXG4gKiBkYXRhLXRvc2hvdz1cIjNcIiBkYXRhLW1vYmlsZS1hcnJvd3M9XCJmYWxzZVwiPjwvZGl2PlxuICpcbiAqL1xuXG4vLyMjIEluaXRpYWxpemUgc2xpZGVyXG5cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5zbGlkZXJzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBWYXJpYWJsZXNcbiAgICAgIHZhciAkc2xpY2tTbGlkZXIgPSAkKCcudmYtc2xpY2stc2xpZGVyJyksXG4gICAgICAgIHJ0bE1vZGUgPSBEcnVwYWwudmFycy52YWN0b3J5LmlzX3J0bCxcbiAgICAgICAgcmVzaXplVGltZXIsXG4gICAgICAgIHByZXZBcnJvdyA9IERydXBhbC50aGVtZSgndkJ1dHRvbk1hcmt1cCcsIHtcbiAgICAgICAgICAnY3NzJzogcnRsTW9kZSA/ICdzbGljay1uZXh0JyA6ICdzbGljay1wcmV2JyxcbiAgICAgICAgICAnaWNvbic6IHJ0bE1vZGUgPyAnaWNvbi1jaGV2cm9uLXJpZ2h0JyA6ICdpY29uLWNoZXZyb24tbGVmdCcsXG4gICAgICAgICAgJ2FyaWFMYWJlbCc6IHJ0bE1vZGUgPyAnbmV4dC1zbGlkZScgOiAncHJldmlvdXMtc2xpZGUnXG4gICAgICAgIH0pLFxuICAgICAgICBuZXh0QXJyb3cgPSBEcnVwYWwudGhlbWUoJ3ZCdXR0b25NYXJrdXAnLCB7XG4gICAgICAgICAgJ2Nzcyc6IHJ0bE1vZGUgPyAnc2xpY2stcHJldicgOiAnc2xpY2stbmV4dCcsXG4gICAgICAgICAgJ2ljb24nOiBydGxNb2RlID8gJ2ljb24tY2hldnJvbi1sZWZ0JyA6ICdpY29uLWNoZXZyb24tcmlnaHQnLFxuICAgICAgICAgICdhcmlhTGFiZWwnOiBydGxNb2RlID8gJ3ByZXZpb3VzLXNsaWRlJyA6ICduZXh0LXNsaWRlJ1xuICAgICAgICB9KTtcblxuICAgICAgLy8gZnVuY3Rpb24gdG8gc2xpY2sgc2xpZGVyIG9uIGRlc2t0b3AgfCBtb2JpbGVcbiAgICAgIGZ1bmN0aW9uIGluaXRTbGlkZXIoKSB7XG4gICAgICAgICRzbGlja1NsaWRlci5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICB2YXIgX0lTX01PQklMRV9WSUVXID0gKG1hdGNoTWVkaWEoXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTkycHgpXCIpLm1hdGNoZXMpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgJHNsaWRlciA9ICQodmFsdWUpLFxuICAgICAgICAgICAgX3NsaWRlc1RvU2hvdyA9ICgkKHZhbHVlKS5kYXRhKCd0b3Nob3cnKSAhPT0gdW5kZWZpbmVkKSA/ICQodmFsdWUpLmRhdGEoJ3Rvc2hvdycpIDogMSwgLy8gbnVtYmVyIHNsaWRlcyB0byBzaG93IG9uIGRlc2t0b3BcbiAgICAgICAgICAgICRzZXR0aW5nc19zbGlkZXIgPSB7XG4gICAgICAgICAgICAgIHJ0bDogcnRsTW9kZSxcbiAgICAgICAgICAgICAgZG90czogKCRzbGlkZXIuZGF0YSgnZG90cycpICE9PSB1bmRlZmluZWQpID8gJHNsaWRlci5kYXRhKCdkb3RzJykgOiB0cnVlLFxuICAgICAgICAgICAgICBhcnJvd3M6ICgkc2xpZGVyLmRhdGEoJ2Fycm93cycpICE9PSB1bmRlZmluZWQpID8gJHNsaWRlci5kYXRhKCdhcnJvd3MnKSA6IHRydWUsXG4gICAgICAgICAgICAgIGluZmluaXRlOiAoJHNsaWRlci5kYXRhKCdpbmZpbml0ZScpICE9PSB1bmRlZmluZWQpID8gJHNsaWRlci5kYXRhKCdpbmZpbml0ZScpIDogdHJ1ZSxcbiAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAoJHNsaWRlci5kYXRhKCd0b3Nob3cnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgndG9zaG93JykgOiAxLFxuICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogKCRzbGlkZXIuZGF0YSgndG9zY3JvbGwnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgndG9zY3JvbGwnKSA6IDEsXG4gICAgICAgICAgICAgIGF1dG9wbGF5OiAoJHNsaWRlci5kYXRhKCdhdXRvcGxheScpICE9PSB1bmRlZmluZWQpID8gJHNsaWRlci5kYXRhKCdhdXRvcGxheScpIDogZmFsc2UsXG4gICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6ICgkc2xpZGVyLmRhdGEoJ2F1dG9wbGF5c3BlZWQnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnYXV0b3BsYXlzcGVlZCcpIDozMDAwLFxuICAgICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogKCRzbGlkZXIuZGF0YSgnYWRhcHRpdmVoZWlnaHQnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnYWRhcHRpdmVoZWlnaHQnKSA6IGZhbHNlLFxuICAgICAgICAgICAgICBjZW50ZXJNb2RlOiAkKCRzbGlkZXIuZGF0YSgnY2VudGVybW9kZScpICE9PSB1bmRlZmluZWQpID8gJHNsaWRlci5kYXRhKCdjZW50ZXJtb2RlJykgOiBmYWxzZSxcbiAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJCgkc2xpZGVyLmRhdGEoJ2NlbnRlcnBhZGRpbmcnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnY2VudGVycGFkZGluZycpIDogXCI1MHB4XCIsXG4gICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6ICQoJHNsaWRlci5kYXRhKCd2YXJpYWJsZXdpZHRoJykgIT09IHVuZGVmaW5lZCkgPyAkc2xpZGVyLmRhdGEoJ3ZhcmlhYmxld2lkdGgnKSA6IGZhbHNlLFxuICAgICAgICAgICAgICBjc3NFYXNlOiAnY3ViaWMtYmV6aWVyKDAuNTg1LCAtMC4wMDUsIDAuNjM1LCAwLjkyMCknLFxuICAgICAgICAgICAgICB1c2VUcmFuc2Zvcm06ICgkc2xpZGVyLmRhdGEoJ3VzZXRyYW5zZm9ybScpICE9PSB1bmRlZmluZWQpID8gJHNsaWRlci5kYXRhKCd1c2V0cmFuc2Zvcm0nKTogdHJ1ZSxcbiAgICAgICAgICAgICAgYWNjZXNzaWJpbGl0eTogKCRzbGlkZXIuZGF0YSgnYWNjZXNpYmlsaXR5JykgIT09IHVuZGVmaW5lZCkgPyAkc2xpZGVyLmRhdGEoJ2FjY2VzaWJpbGl0eScpIDpmYWxzZSxcbiAgICAgICAgICAgICAgc3BlZWQ6ICgkc2xpZGVyLmRhdGEoJ3NwZWVkJykgIT09IHVuZGVmaW5lZCkgPyAkc2xpZGVyLmRhdGEoJ3NwZWVkJykgOiA4MDAsXG4gICAgICAgICAgICAgIHByZXZBcnJvdzogcHJldkFycm93LFxuICAgICAgICAgICAgICBuZXh0QXJyb3c6IG5leHRBcnJvdyxcbiAgICAgICAgICAgICAgbGF6eUxvYWQ6ICgkc2xpZGVyLmRhdGEoJ2xhenlsb2FkJykgIT09IHVuZGVmaW5lZCkgPyAkc2xpZGVyLmRhdGEoJ2xhenlsb2FkJykgOiAnb25kZW1hbmQnLFxuICAgICAgICAgICAgICBkcmFnZ2FibGU6ICgkc2xpZGVyLmRhdGEoJ2RyYWdnYWJsZScpICE9PSB1bmRlZmluZWQpID8gJHNsaWRlci5kYXRhKCdkcmFnZ2FibGUnKSA6IHRydWUsXG4gICAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIGZvY3VzT25DaGFuZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICBmb2N1c09uU2VsZWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgcGF1c2VPbkRvdHNIb3ZlcjogZmFsc2UsXG4gICAgICAgICAgICAgIHBhdXNlT25Gb2N1czogdHJ1ZSxcbiAgICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgICAgICAgICAgICBzd2lwZTogKCRzbGlkZXIuZGF0YSgnc3dpcGUnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnc3dpcGUnKSA6IHRydWUsXG4gICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA5OTIsXG4gICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6ICgkc2xpZGVyLmRhdGEoJ21vYmlsZS1hcnJvd3MnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnbW9iaWxlLWFycm93cycpIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6ICgkc2xpZGVyLmRhdGEoJ21vYmlsZS1kb3RzJykpID8gJHNsaWRlci5kYXRhKCdtb2JpbGUtZG90cycpIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAoJHNsaWRlci5kYXRhKCd0b3Nob3cnKSAhPT0gdW5kZWZpbmVkKSA/IE1hdGguZmxvb3IoJHNsaWRlci5kYXRhKCd0b3Nob3cnKSkgOiAxLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogKCRzbGlkZXIuZGF0YSgndG9zY3JvbGwnKSAhPT0gdW5kZWZpbmVkKSA/IE1hdGguZmxvb3IoJHNsaWRlci5kYXRhKCd0b3Njcm9sbCcpKSA6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAoJHNsaWRlci5kYXRhKCdzcGVlZCcpICE9PSB1bmRlZmluZWQpID8gJHNsaWRlci5kYXRhKCdzcGVlZCcpIDogODAwLFxuICAgICAgICAgICAgICAgICAgICBjc3NFYXNlOiAnZWFzZSdcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGFycm93czogKCRzbGlkZXIuZGF0YSgnbW9iaWxlLWFycm93cycpICE9PSB1bmRlZmluZWQpID8gJHNsaWRlci5kYXRhKCdtb2JpbGUtYXJyb3dzJykgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZG90czogKCRzbGlkZXIuZGF0YSgnbW9iaWxlLWRvdHMnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnbW9iaWxlLWRvdHMnKSA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiAoJHNsaWRlci5kYXRhKCdtb2JpbGUtaW5maW5pdGUnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnbW9iaWxlLWluZmluaXRlJykgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6ICgkc2xpZGVyLmRhdGEoJ21vYmlsZS10b3Nob3cnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnbW9iaWxlLXRvc2hvdycpIDogMSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6ICgkc2xpZGVyLmRhdGEoJ21vYmlsZS10b3Njcm9sbCcpICE9PSB1bmRlZmluZWQpID8gJHNsaWRlci5kYXRhKCdtb2JpbGUtdG9zY3JvbGwnKSA6IDEsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiAoJHNsaWRlci5kYXRhKCdtb2JpbGUtYXV0b3BsYXknKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnbW9iaWxlLWF1dG9wbGF5JykgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6ICgkc2xpZGVyLmRhdGEoJ21vYmlsZS1hZGFwdGl2ZWhlaWdodCcpICE9PSB1bmRlZmluZWQpID8gJHNsaWRlci5kYXRhKCdtb2JpbGUtYWRhcHRpdmVoZWlnaHQnKSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiAkKCRzbGlkZXIuZGF0YSgnbW9iaWxlLWNlbnRlcm1vZGUnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnbW9iaWxlLWNlbnRlcm1vZGUnKSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAkKCRzbGlkZXIuZGF0YSgnbW9iaWxlLWNlbnRlcnBhZGRpbmcnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnbW9iaWxlLWNlbnRlcnBhZGRpbmcnKSA6IFwiMzVweFwiLFxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiAkKCRzbGlkZXIuZGF0YSgnbW9iaWxlLXZhcmlhYmxld2lkdGgnKSAhPT0gdW5kZWZpbmVkKSA/ICRzbGlkZXIuZGF0YSgnbW9iaWxlLXZhcmlhYmxld2lkdGgnKSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBhcHBlbmRBcnJvd3M6ICgkc2xpZGVyLnBhcmVudCgpLmZpbmQoJy5zbGljay1jb250cm9scycpLmxlbmd0aCA+IDApID8gJHNsaWRlci5wYXJlbnQoKS5maW5kKCcuc2xpY2stY29udHJvbHMnKSA6ICRzbGlkZXIsXG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZERvdHM6ICgkc2xpZGVyLnBhcmVudCgpLmZpbmQoJy5zbGljay1jb250cm9scycpLmxlbmd0aCA+IDApID8gJHNsaWRlci5wYXJlbnQoKS5maW5kKCcuc2xpY2stY29udHJvbHMnKSA6ICRzbGlkZXIsXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfTsgLy8gSnNvbiBvZiBzbGljayBzbGlkZXJcblxuICAgICAgICAgIC8vICBMYXp5IGxvYWQgaW1hZ2VzXG4gICAgICAgICAgJHNsaWRlci5maW5kKCdpbWcuc2xpY2stbGF6eWxvYWQnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaE1lZGlhKCcobWF4LXdpZHRoOiA3NjhweCknKS5tYXRjaGVzICYmICQodmFsdWUpLmRhdGEoJ21vYmlsZScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgJCh2YWx1ZSkuZGF0YSgnbGF6eScsICQodmFsdWUpLmRhdGEoJ21vYmlsZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAkKHZhbHVlKS5kYXRhKCdsYXp5JywgJCh2YWx1ZSkuZGF0YSgnZGVza3RvcCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFJlbW92ZSBsb2FkaW5nIGFmdGVyIGxvYWQgaW1hZ2VzXG4gICAgICAgICAgJHNsaWRlci5vbignbGF6eUxvYWRlZCcsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGltYWdlLCBpbWFnZVNvdXJjZSkge1xuICAgICAgICAgICAgaWYoJChpbWFnZSkucGFyZW50cygnLmxvYWRpbmcnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICQoaW1hZ2UpLnBhcmVudHMoJy5sb2FkaW5nJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgaWYgKCRzbGlkZXIuZGF0YSgnZXF1YWxoZWlnaHQnKSAhPT0gdW5kZWZpbmVkICYmICRzbGlkZXIuZGF0YSgnZXF1YWxoZWlnaHQnKSAhPT0gdW5kZWZpbmVkICYmICEkc2xpZGVyLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XG4gICAgICAgICAgICAkc2xpZGVyLmFkZENsYXNzKCdzbGljay11c2UtZXF1YWwtaGVpZ2h0JylcbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIGlmICgoJHNsaWRlci5maW5kKCc+IConKS5sZW5ndGggPiBfc2xpZGVzVG9TaG93IHx8ICRzbGlkZXIuZmluZCgnLnNsaWNrLXNsaWRlOm5vdCguc2xpY2stY2xvbmVkKScpLmxlbmd0aCA+IF9zbGlkZXNUb1Nob3cpICYmICFfSVNfTU9CSUxFX1ZJRVcpIHtcbiAgICAgICAgICAgIGlmICgkc2xpZGVyLmhhc0NsYXNzKCd2Zi1zbGljay1tb2JpbGUnKSAmJiAkc2xpZGVyLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XG4gICAgICAgICAgICAgICRzbGlkZXIuc2xpY2soJ2Rlc3Ryb3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCEkc2xpZGVyLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpICYmICEkc2xpZGVyLmhhc0NsYXNzKCd2Zi1zbGljay1tb2JpbGUnKSkge1xuICAgICAgICAgICAgICAkc2xpZGVyLnNsaWNrKCRzZXR0aW5nc19zbGlkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoISRzbGlkZXIuaGFzQ2xhc3MoJ3ZmLXNsaWNrLW1vYmlsZScpICYmICRzbGlkZXIuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcbiAgICAgICAgICAgICAgJHNsaWRlci5zbGljaygncmVmcmVzaCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChfSVNfTU9CSUxFX1ZJRVcgJiYgJHNsaWRlci5maW5kKFwiID4gKlwiKS5sZW5ndGggPiAxICYmICEkc2xpZGVyLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XG4gICAgICAgICAgICAkc2xpZGVyLnNsaWNrKCRzZXR0aW5nc19zbGlkZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChfSVNfTU9CSUxFX1ZJRVcgJiYgJHNsaWRlci5oYXNDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKSkge1xuICAgICAgICAgICAgJHNsaWRlci5zbGljaygncmVmcmVzaCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICgkc2xpZGVyLmZpbmQoJy5zbGljay1zbGlkZTpub3QoLnNsaWNrLWNsb25lZCknKS5sZW5ndGggPD0gX3NsaWRlc1RvU2hvdyAmJiAhX0lTX01PQklMRV9WSUVXICYmICRzbGlkZXIuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcbiAgICAgICAgICAgICRzbGlkZXIuc2xpY2soJ2Rlc3Ryb3knKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBmdW5jdGlvbiB0byBjYWxsIGFsbCBmdW5jdGlvbiB0byBydW4gYWZ0ZXIgYSBzbGljayBjaGFuZ2UgKHN3aXBlIHNsaWNrXG4gICAgICAvLyBzbGlkZXIgb3IgY2xpY2sgYXJyb3cgb3IgYXV0b3BsYXkpXG4gICAgICBmdW5jdGlvbiBhZnRlclNsaWNrQ2hhbmdlKHRhcmdldCkge1xuICAgICAgICB2YXIgX0lTX01PQklMRV9WSUVXID0gKG1hdGNoTWVkaWEoXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTkycHgpXCIpLm1hdGNoZXMpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBpZiAoX0lTX01PQklMRV9WSUVXKSB7XG4gICAgICAgICAgaWYgKHRhcmdldC5maW5kKCcuc2xpY2stY3VycmVudCAuanMtbnVtYmVyLWFuaW1hdGUnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGdvVG9OdW1iZXIodGFyZ2V0LmZpbmQoJy5zbGljay1jdXJyZW50IC5qcy1udW1iZXItYW5pbWF0ZScpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ2FsbCBpbml0IHNsaWRlciBvbiB0aGUgbG9hZCBvZiBwYWdlXG4gICAgICBpbml0U2xpZGVyKCk7XG5cbiAgICAgIC8vIENhbGwgaW5pdFNsaWRlciBvbiByZXNpemUgb2Ygd2luZG93IHRvIHRyaWdnZXIgc2xpZGVyIG9uIG1vYmlsZSBvclxuICAgICAgLy8gZGVzdHJveSBzbGlkZXIgb24gZGVza3RvcFxuICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChyZXNpemVUaW1lcik7IC8vIEFmdGVyIGZpbmlzaCByZXNpemluZ1xuICAgICAgICByZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGluaXRTbGlkZXIoKTtcbiAgICAgICAgfSwgMjUwKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTbGljayBzbGlkZXIgY2FsbGJhY2tcbiAgICAgICRzbGlja1NsaWRlci5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUpIHtcbiAgICAgICAgYWZ0ZXJTbGlja0NoYW5nZSgkKHRoaXMpKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vPT0gU21hcnQgQmFubmVyXG4vL1xuLy8jIyBTbWFydCBCYW5uZXIgc3VwcG9ydCBmb3IgaU9TIDQvNSBhbmQgQW5kcm9pZC5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIERydXBhbC52YWN0b3J5LnV0aWxpdHkuc21hcnRCYW5uZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodHlwZW9mICQuc21hcnRiYW5uZXIgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICQuc21hcnRiYW5uZXIoe1xuICAgICAgICB0aXRsZTogbnVsbCwgLy8gV2hhdCB0aGUgdGl0bGUgb2YgdGhlIGFwcCBzaG91bGQgYmUgaW4gdGhlIGJhbm5lclxuICAgICAgICAgICAgICAgICAgICAgLy8gKGRlZmF1bHRzIHRvIDx0aXRsZT4pXG4gICAgICAgIGF1dGhvcjogbnVsbCwgLy8gV2hhdCB0aGUgYXV0aG9yIG9mIHRoZSBhcHAgc2hvdWxkIGJlIGluIHRoZSBiYW5uZXJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAoZGVmYXVsdHMgdG8gPG1ldGEgbmFtZT1cImF1dGhvclwiPiBvciBob3N0bmFtZSlcbiAgICAgICAgcHJpY2U6IERydXBhbC50KCdGUkVFJyksIC8vIFByaWNlIG9mIHRoZSBhcHBcbiAgICAgICAgYXBwU3RvcmVMYW5ndWFnZTogJ3VzJywgLy8gTGFuZ3VhZ2UgY29kZSBmb3IgQXBwIFN0b3JlXG4gICAgICAgIGluQXBwU3RvcmU6IERydXBhbC50KCdPbiB0aGUgQXBwIFN0b3JlJyksIC8vIFRleHQgb2YgcHJpY2UgZm9yIGlPU1xuICAgICAgICBpbkdvb2dsZVBsYXk6IERydXBhbC50KCdJbiBHb29nbGUgUGxheScpLCAvLyBUZXh0IG9mIHByaWNlIGZvciBBbmRyb2lkXG4gICAgICAgIGluQW1hem9uQXBwU3RvcmU6IERydXBhbC50KCdJbiB0aGUgQW1hem9uIEFwcHN0b3JlJyksXG4gICAgICAgIGluV2luZG93c1N0b3JlOiBEcnVwYWwudCgnSW4gdGhlIFdpbmRvd3MgU3RvcmUnKSwgLy8gVGV4dCBvZiBwcmljZSBmb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXaW5kb3dzXG4gICAgICAgIEdvb2dsZVBsYXlQYXJhbXM6IG51bGwsIC8vIEFkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgbWFya2V0XG4gICAgICAgIGljb246IG51bGwsIC8vIFRoZSBVUkwgb2YgdGhlIGljb24gKGRlZmF1bHRzIHRvIDxtZXRhXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hbWU9XCJhcHBsZS10b3VjaC1pY29uXCI+KVxuICAgICAgICBpY29uR2xvc3M6IG51bGwsIC8vIEZvcmNlIGdsb3NzIGVmZmVjdCBmb3IgaU9TIGV2ZW4gZm9yIHByZWNvbXBvc2VkXG4gICAgICAgIHVybDogbnVsbCwgLy8gVGhlIFVSTCBmb3IgdGhlIGJ1dHRvbi4gS2VlcCBudWxsIGlmIHlvdSB3YW50IHRoZSBidXR0b25cbiAgICAgICAgICAgICAgICAgICAvLyB0byBsaW5rIHRvIHRoZSBhcHAgc3RvcmUuXG4gICAgICAgIGJ1dHRvbjogRHJ1cGFsLnQoJ1ZJRVcnKSwgLy8gVGV4dCBmb3IgdGhlIGluc3RhbGwgYnV0dG9uXG4gICAgICAgIHNjYWxlOiAnYXV0bycsIC8vIFNjYWxlIGJhc2VkIG9uIHZpZXdwb3J0IHNpemUgKHNldCB0byAxIHRvIGRpc2FibGUpXG4gICAgICAgIHNwZWVkSW46IDMwMCwgLy8gU2hvdyBhbmltYXRpb24gc3BlZWQgb2YgdGhlIGJhbm5lclxuICAgICAgICBzcGVlZE91dDogNDAwLCAvLyBDbG9zZSBhbmltYXRpb24gc3BlZWQgb2YgdGhlIGJhbm5lclxuICAgICAgICBkYXlzSGlkZGVuOiAxNSwgLy8gRHVyYXRpb24gdG8gaGlkZSB0aGUgYmFubmVyIGFmdGVyIGJlaW5nIGNsb3NlZCAoMCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbHdheXMgc2hvdyBiYW5uZXIpXG4gICAgICAgIGRheXNSZW1pbmRlcjogOTAsIC8vIER1cmF0aW9uIHRvIGhpZGUgdGhlIGJhbm5lciBhZnRlciBcIlZJRVdcIiBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjbGlja2VkICpzZXBhcmF0ZSBmcm9tIHdoZW4gdGhlIGNsb3NlIGJ1dHRvbiBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjbGlja2VkKiAoMCA9IGFsd2F5cyBzaG93IGJhbm5lcilcbiAgICAgICAgZm9yY2U6IG51bGwsIC8vIENob29zZSAnaW9zJywgJ2FuZHJvaWQnIG9yICd3aW5kb3dzJy4gRG9uJ3QgZG8gYVxuICAgICAgICAgICAgICAgICAgICAgLy8gYnJvd3NlciBjaGVjaywganVzdCBhbHdheXMgc2hvdyB0aGlzIGJhbm5lclxuICAgICAgICBoaWRlT25JbnN0YWxsOiB0cnVlLCAvLyBIaWRlIHRoZSBiYW5uZXIgYWZ0ZXIgXCJWSUVXXCIgaXMgY2xpY2tlZC5cbiAgICAgICAgbGF5ZXI6IGZhbHNlLCAvLyBEaXNwbGF5IGFzIG92ZXJsYXkgbGF5ZXIgb3Igc2xpZGUgZG93biB0aGUgcGFnZVxuICAgICAgICBpT1NVbml2ZXJzYWxBcHA6IHRydWUsIC8vIElmIHRoZSBpT1MgQXBwIGlzIGEgdW5pdmVyc2FsIGFwcCBmb3IgYm90aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlQYWQgYW5kIGlQaG9uZSwgZGlzcGxheSBTbWFydCBCYW5uZXIgdG8gaVBhZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZXJzLCB0b28uXG4gICAgICAgIGFwcGVuZFRvU2VsZWN0b3I6ICdib2R5JywgLy9BcHBlbmQgdGhlIGJhbm5lciB0byBhIHNwZWNpZmljIHNlbGVjdG9yXG4gICAgICAgIG9uSW5zdGFsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGFsZXJ0KCdDbGljayBpbnN0YWxsJyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBhbGVydCgnQ2xpY2sgY2xvc2UnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vPT0gVGFic1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5ib290c3RyYXBfdGFicyA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBTaG93IGZpcnN0IHRhYiBieSBkZWZhdWx0LlxuICAgICAgLy8gSWdub3JlIHRoZSBcInByaW1hcnlcIiB0YWJzIG9uIHRoZSBub2RlIGVkaXQgcGFnZS5cbiAgICAgIGlmICgkLmZuLnRhYikge1xuICAgICAgICB2YXIgdGFicyA9ICQoJy5uYXYtdGFicycpLm5vdCgnLnByaW1hcnknKSxcbiAgICAgICAgICBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgIHRhYnMuY2hpbGRyZW4oJ2xpJykuZmlyc3QoKS5maW5kKCdhJykudGFiKCdzaG93Jyk7XG5cbiAgICAgICAgaWYgKGhhc2gpIHtcbiAgICAgICAgICAkKCcubmF2LXRhYnMgPiBsaSA+IGFbaHJlZiQ9XCInICsgaGFzaCArICdcIl0nKS50YWIoJ3Nob3cnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IFZpZXdzIERhdGUgRmlsdGVyXG4vL1xuLy8jIyBBcHBseSBkYXRlcGlja2VyID4gTW9udGhzIHZpZXcgbW9kZS5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIERydXBhbC52YWN0b3J5LnV0aWxpdHkudmlld3NEYXRlRmlsdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJ2lucHV0LmpzLXZhY3RvcnktZGF0ZXBpY2tlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmRhdGVwaWNrZXIoJ2Rlc3Ryb3knKTtcbiAgICAgICAgJCh0aGlzKS5kYXRlcGlja2VyKHtcbiAgICAgICAgICBsYW5ndWFnZTogRHJ1cGFsLnZhcnMudmFjdG9yeS5sYW5nLFxuICAgICAgICAgIGRpc2FibGVUb3VjaEtleWJvYXJkOiB0cnVlLFxuICAgICAgICAgIGZvcm1hdDogXCJtbS95eXl5XCIsXG4gICAgICAgICAgc3RhcnRWaWV3OiAxLFxuICAgICAgICAgIG1pblZpZXdNb2RlOiAxLFxuICAgICAgICAgIGF1dG9jbG9zZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDb25maWcgZGF0ZXBpY2tlciBmb3IgZGF0ZSBmaWx0ZXIgYnkgeWVhcnMuXG4gICAgICAkKCdpbnB1dC5qcy1kYXRlLXllYXItZmlsdGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuZGF0ZXBpY2tlcignZGVzdHJveScpO1xuICAgICAgICAkKHRoaXMpLmRhdGVwaWNrZXIoe1xuICAgICAgICAgIGxhbmd1YWdlOiBEcnVwYWwudmFycy52YWN0b3J5LmxhbmcsXG4gICAgICAgICAgZGlzYWJsZVRvdWNoS2V5Ym9hcmQ6IHRydWUsXG4gICAgICAgICAgZm9ybWF0OiAneXl5eScsXG4gICAgICAgICAgc3RhcnRWaWV3OiAneWVhcnMnLFxuICAgICAgICAgIG1pblZpZXdNb2RlOiAneWVhcnMnLFxuICAgICAgICAgIGF1dG9jbG9zZTogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8vPT0gV09XXG4vL1xuLy8jIyBXT1cgQ1NTIGFuaW1hdGlvbiBhcyB5b3Ugc2Nyb2xsIGRvd24gYSBwYWdlLlxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS53b3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgICB2YXIgJHdvdyA9ICQoJy53b3cnKTtcblxuICAgICAgaWYgKERydXBhbC52YXJzLnZhY3RvcnkuaXNfcnRsKSB7XG4gICAgICAgICR3b3cuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgIGlmIChfdGhpcy5oYXNDbGFzcygnZmFkZUluTGVmdCcpKSB7XG4gICAgICAgICAgICBfdGhpcy5yZW1vdmVDbGFzcygnZmFkZUluTGVmdCcpLmFkZENsYXNzKCdmYWRlSW5SaWdodCcpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoX3RoaXMuaGFzQ2xhc3MoJ2ZhZGVJblJpZ2h0JykpIHtcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUNsYXNzKCdmYWRlSW5SaWdodCcpLmFkZENsYXNzKCdmYWRlSW5MZWZ0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdmFyIHdvdyA9IG5ldyBXT1coe1xuICAgICAgICBib3hDbGFzczogJ3dvdycsXG4gICAgICAgIGFuaW1hdGVDbGFzczogJ2FuaW1hdGVkJyxcbiAgICAgICAgb2Zmc2V0OiAxMDAsXG4gICAgICAgIG1vYmlsZTogdHJ1ZSxcbiAgICAgICAgbGl2ZTogdHJ1ZSxcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uIChib3gpIHtcbiAgICAgICAgICBpZiAoJChib3gpLmZpbmQoJy5qcy1udW1iZXItYW5pbWF0ZScpLmxlbmd0aCkge1xuICAgICAgICAgICAgZ29Ub051bWJlcigkKGJveCkuZmluZCgnLmpzLW51bWJlci1hbmltYXRlJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB3b3cuaW5pdCgpO1xuICAgIH0pO1xuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IFlvdXR1YmUgVmlkZW9cbi8vXG4vLyMjIEFwcGx5IGpxdWVyeS5tYi5ZVFBsYXllclxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS55dHBsYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJGVsZW1lbnQgPSAkKFwiLnl0cGxheWVyXCIpO1xuICAgICAgaWYgKCEkZWxlbWVudC5oYXNDbGFzcygnbWJfWVRQbGF5ZXInKSkge1xuICAgICAgICB2YXIgX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkZWxlbWVudC5ZVFBsYXllcigpO1xuICAgICAgICAgIGNsZWFyVGltZW91dChfdGltZXIpO1xuICAgICAgICB9LCAzMDAwKVxuICAgICAgfVxuICAgICAgJCgnLnBsYXktdmlkZW8nKS5mYW5jeWJveCgpO1xuICAgIH0pO1xuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IFpvb21cbi8qKlxuICogdXJsOiB0aGUgdXJsIG9mIHRoZSBsYXJnZSBwaG90byB0byBiZSBkaXNwbGF5ZWQuIElmIG5vIHVybCBpcyBwcm92aWRlZCwgem9vbVxuICogIHVzZXMgdGhlIHNyYyBvZiB0aGUgZmlyc3QgY2hpbGQgSU1HIGVsZW1lbnQgaW5zaWRlIHRoZSBlbGVtZW50IGl0IGlzXG4gKiBhc3NpZ25lZCB0by5cbiAqXG4gKiBvbjogKGRlZmF1bHQ6IG1vdXNlb3ZlcikgdGhlIHR5cGUgb2YgZXZlbnQgdGhhdCBycmlnZ2VyXG4gKiB6b29taW5nLCBjaG9vc2UgZnJvbSBtb3VzZW92ZXIsIGdyYWIsIGNsaWNrIG9yIHRvZ2dsZS5cbiAqXG4gKiBkdXJhdGlvbjogKGRlZmF1bHQ6IDEyMCkgdGhlIGZhZGVJbi9mYWRlT3V0IHNwZWVkIG9mIHRoZSBsYXJnZSBpbWFnZS5cbiAqXG4gKiB0YXJnZXQ6IChkZWZhdWx0OiBmYWxzZSkgYSBzZWxlY3RvciBvciBET00gZWxlbWVudCB0aGF0IHNvdWxkIGJlIHVzZWQgYXNcbiAqIHRoZSBwYXJlbnQgY29udGFpbmVyIGZvciB0aGUgem9vbWVkIGltYWdlLlxuICpcbiAqIHRvdWNoOiAoZGVmYXVsdDogdHJ1ZSkgRW5hYmxlcyBpbnRlcmFjdGlvbiB2aWEgdG91Y2hlIGV2ZW50cy5cbiAqXG4gKiBtYWduaWZ5OiAoZGVmYXVsdDogMSkgVGhpcyB2YWx1ZSBpcyBtdWx0aXBsaWVkIGFnYWluc3QgdGhlIGZ1bGwgc2l6ZSBvZiB0aGVcbiAqIHpvb21lZCBpbWFnZS4gdGhlIGRlZmF1bHQgdmFsdWUgaXMgMSwgbWVhbmluZyB0aGUgem9vbWVkIGltYWdlIHNob3VsZCBiZSBhdFxuICogMTAwJSBuYXR1cmFsIHdpdGggYW5kIGhlaWdodC5cbiAqXG4gKiBjYWxsYmFjazogKGRlZmF1bHQ6IGZhbHNlKSBBIGZ1bmN0aW9uIHRvIGJlXG4gKiBjYWxsZWQgd2hlbiB0aGUgaW1hZ2UgaGFzIGxvYWRlZC4gSW5zaWRlIHRoZSBmdW5jdGlvbiwgJ3RoaXMnIHJlZnJlbmNlcyB0aGVcbiAqIGltYWdlIGVsZW1lbnQuXG4gKlxuICogb25ab29tSW46IChkZWZhdWx0OiBmYWxzZSkgQSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGVcbiAqIGltYWdlIGhhcyB6b29tZWQgaW4uIEluc2lkZSB0aGUgZnVuY3Rpb24sICd0aGlzJyByZWZlcmVuY2VzIHRoZSBpbWFnZVxuICogZWxlbWVudC5cbiAqXG4gKiBvblpvb21PdXQ6IChkZWZhdWx0OiBmYWxzZSkgQSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgaW1hZ2VcbiAqIGhhcyB6b29tZWQgb3V0LCBJbnNpZGUgdGhlIGZ1bmN0aW9uLCAndGhpcycgcmVmcmVuY2VzIHRoZSBpbWFnZSBlbGVtdG4uXG4gKi9cbi8vIyMgWm9vbSBpbWFnZVxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS56b29taW1hZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgICAkKCcuanMtem9vbScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAkKHZhbHVlKS56b29tKCk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IHJlc2tpbiBzZWxlY3QgcGlja2VyIGFmdGVyIGFqYXggY2FsbGJhY2tcbi8vXG4vLyMjXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5hamF4Q2FsbGJhY2sgPSB7XG4gICAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgICAgJChjb250ZXh0KS5maW5kKCdzZWxlY3QnKS5vbmNlKCdyZVNraW5TZWxlY3QnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5zZWxlY3RwaWNrZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IFZhY3RvcnkgSWNvbnNcbi8vXG4vLyMjIEljb25zIGFzIHByZWZpeCAmIHN1ZmZpeFxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5zZXRJY29uID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gSWNvbnMgZm9yIG5vbiBpbnB1dCBlbGVtZW50cy5cbiAgICAgICQoJ1tjbGFzcyo9XCJzdWZmaXgtaWNvbi1cIl06bm90KGlucHV0KSwgW2NsYXNzKj1cInByZWZpeC1pY29uLVwiXTpub3QoaW5wdXQpJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XG4gICAgICAgIHZhciAkX2VsID0gJChlbCk7XG4gICAgICAgIHZhciAkc2VsZiA9ICRfZWw7XG4gICAgICAgIHZhciBfaWNvbk5hbWUgPSAnJztcblxuICAgICAgICBpZiAoJF9lbC5oYXNDbGFzcygnanMtaGFzLWljb24nKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKCEkX2VsLmhhc0NsYXNzKCdqcy1oYXMtaWNvbicpKSAmJiAoISRfZWwuZmluZCgnPltjbGFzcyo9XCJpY29uLVwiXScpLmxlbmd0aCA+IDApKSB7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgICAgICAgIHZhciBfYXJyYXkgPSAkX2VsLmF0dHIoJ2NsYXNzJykuc3BsaXQoJyAnKTtcbiAgICAgICAgICAkLmVhY2goX2FycmF5LCBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChfYXJyYXlbaW5kZXhdICE9PSAnJyAmJiAoX2FycmF5W2luZGV4XS5pbmRleE9mKFwic3VmZml4LWljb24tXCIpICE9IC0xIHx8IF9hcnJheVtpbmRleF0uaW5kZXhPZihcInByZWZpeC1pY29uLVwiKSAhPSAtMSkpIHtcbiAgICAgICAgICAgICAgX2ljb25OYW1lID0gX2FycmF5W2luZGV4XS5zcGxpdCgnLWljb24tJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKCRfZWwuaXMoJ2xpJykpIHtcbiAgICAgICAgICAgICRfZWwgPSAkX2VsLmZpbmQoJz5hJyk7XG4gICAgICAgICAgICAkX2VsID0gKCRfZWwubGVuZ3RoKSA/ICRfZWwgOiAkX2VsLmZpbmQoJz4ubm9saW5rJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF9pY29uTmFtZVswXSA9PSBcInByZWZpeFwiKSB7XG4gICAgICAgICAgICAkX2VsLmFkZENsYXNzKCdqcy1oYXMtaWNvbicpO1xuICAgICAgICAgICAgJF9lbC5wcmVwZW5kKCc8aSBjbGFzcz1cImljb24tJyArIF9pY29uTmFtZVsxXSArICdcIj48LzxpPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRfZWwuYWRkQ2xhc3MoJ2pzLWhhcy1pY29uJyk7XG4gICAgICAgICAgICAkX2VsLmFwcGVuZCgnPGkgY2xhc3M9XCJpY29uLScgKyBfaWNvbk5hbWVbMV0gKyAnXCI+PC88aT4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJHNlbGYuYWRkQ2xhc3MoJ2pzLWhhcy1pY29uJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBJY29ucyBmb3IgaW5wdXQgZWxlbWVudHMuXG4gICAgICAkKCdpbnB1dFtjbGFzcyo9XCJzdWZmaXgtaWNvbi1cIl0sIGlucHV0W2NsYXNzKj1cInByZWZpeC1pY29uLVwiXScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuICAgICAgICB2YXIgJF9lbCA9ICQoZWwpO1xuICAgICAgICB2YXIgJHNlbGYgPSAkX2VsO1xuICAgICAgICB2YXIgX2ljb25OYW1lID0gJyc7XG5cbiAgICAgICAgaWYgKCRfZWwuaGFzQ2xhc3MoJ2pzLWhhcy1pY29uJykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKCEkX2VsLmhhc0NsYXNzKCdqcy1oYXMtaWNvbicpKSAmJiAoISRfZWwubmV4dCgnW2NsYXNzKj1cImljb24tXCJdJykubGVuZ3RoID4gMCkpIHsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgICAgICAgJF9lbC5hZGRDbGFzcygnanMtaGFzLWljb24nKTtcbiAgICAgICAgICAkX2VsLnBhcmVudCgpLmFkZENsYXNzKCdmb3JtLWl0ZW0tLWljb24nKTtcblxuICAgICAgICAgIHZhciBfYXJyYXkgPSAkX2VsLmF0dHIoJ2NsYXNzJykuc3BsaXQoJyAnKTtcbiAgICAgICAgICAkLmVhY2goX2FycmF5LCBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChfYXJyYXlbaW5kZXhdICE9PSAnJyAmJiAoX2FycmF5W2luZGV4XS5pbmRleE9mKFwic3VmZml4LWljb24tXCIpICE9IC0xIHx8IF9hcnJheVtpbmRleF0uaW5kZXhPZihcInByZWZpeC1pY29uLVwiKSAhPSAtMSkpIHtcbiAgICAgICAgICAgICAgX2ljb25OYW1lID0gX2FycmF5W2luZGV4XS5zcGxpdCgnLWljb24tJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkX2VsLnBhcmVudCgpLmFkZENsYXNzKCdmb3JtLWl0ZW0tLWljb24tJyArIF9pY29uTmFtZVswXSk7XG5cbiAgICAgICAgICBpZiAoX2ljb25OYW1lWzBdID09IFwicHJlZml4XCIpIHtcbiAgICAgICAgICAgICRfZWwucGFyZW50KCkuYWRkQ2xhc3MoJ2pzLWhhcy1pY29uIGhhcy1pY29uJykucHJlcGVuZCgnPGkgY2xhc3M9XCJpY29uLScgKyBfaWNvbk5hbWVbMV0gKyAnXCI+PC88aT4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkX2VsLnBhcmVudCgpLmFkZENsYXNzKCdqcy1oYXMtaWNvbiBoYXMtaWNvbicpLmFwcGVuZCgnPGkgY2xhc3M9XCJpY29uLScgKyBfaWNvbk5hbWVbMV0gKyAnXCI+PC88aT4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJHNlbGYuYWRkQ2xhc3MoJ2pzLWhhcy1pY29uJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLy8gcGFnZSBsb2FkIGV2ZW50XG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIERydXBhbC5iZWhhdmlvcnMucGFnZV9sb2FkID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmcpIHtcblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgICAgIC8vIFRoZSBkb2N1bWVudCBpcyBzdGlsbCBsb2FkaW5nLlxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnKSB7XG4gICAgICAgICAgLy8gVGhlIGRvY3VtZW50IGhhcyBmaW5pc2hlZCBsb2FkaW5nLiBXZSBjYW4gbm93IGFjY2VzcyB0aGUgRE9NIGVsZW1lbnRzLlxuICAgICAgICAgIC8vIEJ1dCBzdWItcmVzb3VyY2VzIHN1Y2ggYXMgaW1hZ2VzLCBzdHlsZXNoZWV0cyBhbmQgZnJhbWVzIGFyZSBzdGlsbCBsb2FkaW5nLlxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgLy8gVGhlIHBhZ2UgaXMgZnVsbHkgbG9hZGVkLlxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCdkb21Mb2FkZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLyBCb290c3RyYXAgcG9wb3Zlci5cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5ib290c3RyYXBfcG9wb3ZlciA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5nKSB7XG4gICAgICBpZiAoJC5mbi5wb3BvdmVyKSB7XG4gICAgICAgICQoXCJbZGF0YS10b2dnbGU9J3BvcG92ZXInXVwiKS5wb3BvdmVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBEcnVwYWwuYmVoYXZpb3JzLnN0aWNreV9iYXIgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAvLyBWYXJpYWJsZXMgXG4gICAgICAgIHZhciBfdGFiID0gJCgnLmJhci10YWJzJyk7XG4gICAgICAgIHZhciBsYXN0U2Nyb2xsMiA9IDA7XG4gICAgICAgIHZhciB0YWJPZmZzZXQgPSAoX3RhYi5sZW5ndGgpID8gX3RhYi5vZmZzZXQoKS50b3AgKyBfdGFiLm91dGVySGVpZ2h0KHRydWUpIDogbnVsbDtcbiAgICAgICAgdmFyIGlzRGV2aWNlID0gL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gICAgICAgIC8qXG4gICAgICAgIHZhciBteVRpbWUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdGFiT2Zmc2V0ID0gJCgnLmJhci10YWJzJykub2Zmc2V0KCkudG9wICsgJCgnLmJhci10YWJzJykub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KG15VGltZSk7XG4gICAgICAgIH0sIDUwMCk7Ki9cblxuXG4gICAgICAgIC8vIEZpeGVkIHRoZSBibG9jayBvZiBzdGlja3lfYmFyIHdoZW4gc2Nyb2xsIHRvIGJvdHRvbSBcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKF90YWIubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgd2luZG93U2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA+IHRhYk9mZnNldCkge1xuICAgICAgICAgICAgICBfdGFiLmFkZENsYXNzKCdzdGlja3ktYmFyLXRhYnMnKTtcbiAgICAgICAgICAgICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA8IGxhc3RTY3JvbGwyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgX3RhYi5yZW1vdmVDbGFzcygnc3RpY2t5LWJhci1ib3R0b20nKS5hZGRDbGFzcygnc3RpY2t5LWJhci10b3AnKTtcbiAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGltZXIpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBfdGFiLnJlbW92ZUNsYXNzKCdzdGlja3ktYmFyLXRvcCcpLmFkZENsYXNzKCdzdGlja3ktYmFyLWJvdHRvbScpO1xuICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aW1lcik7XG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgX3RhYi5yZW1vdmVDbGFzcygnc3RpY2t5LWJhci1ib3R0b20nKS5yZW1vdmVDbGFzcygnc3RpY2t5LWJhci10b3AnKS5yZW1vdmVDbGFzcygnc3RpY2t5LWJhci10YWJzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0U2Nyb2xsMiA9IHdpbmRvd1Njcm9sbFRvcDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRoZSBjbGljayBvZiBzaW11bGF0aW9uIHRhYnNcbiAgICAgICAgX3RhYi5maW5kKCcuYmFyLXRhYi1oZWFkIGxpJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcykuZmluZCgnPiBhJykuYXR0cignZGF0YS1pZCcpO1xuICAgICAgICAgICAgJCh0YXJnZXQpLmFkZENsYXNzKCdzaG93Jykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgaWYgKGlzRGV2aWNlIHx8IG1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6IDc2OHB4KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgJCh0YXJnZXQpLmFkZENsYXNzKCdhY3RpdmUgaXMtYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlIGlzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ292ZXJmbG93LXknKTtcbiAgICAgICAgICAgICAgJCgnLnZoLXN0aWNreS10YWItYmFyLWNsb3NlJykuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNEZXZpY2UgfHwgbWF0Y2hNZWRpYSgnKG1heC13aWR0aDogNzY4cHgpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcykuZmluZCgnPiBhJykuYXR0cignZGF0YS1pZCcpO1xuICAgICAgICAgICAgICAkKHRhcmdldCkucmVtb3ZlQ2xhc3MoJ3Nob3cgYWN0aXZlIGlzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAkKHRhcmdldCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZSBpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdvdmVyZmxvdy15Jyk7XG4gICAgICAgICAgICAgICQoJy52aC1zdGlja3ktdGFiLWJhci1jbG9zZScpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcudmgtc3RpY2t5LXRhYi1iYXItY2xvc2UgPiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBfdGFiLmZpbmQoJy5iYXItdGFiLWhlYWQgbGkgJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgIF90YWIuZmluZCgnLmJhci10YWItY29udGVudCA+IGRpdicpLnJlbW92ZUNsYXNzKCdzaG93IGFjdGl2ZSBpcy1hY3RpdmUnKTtcbiAgICAgICAgICAkKCcudmgtc3RpY2t5LXRhYi1iYXItY2xvc2UnKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICB9KVxuICAgICAgfSk7XG5cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IFRvb2x0aXBcbi8vXG4vLyMjIEFwcGx5IGN1c3RvbSB0b29sdGlwIGZvciBsaW5rcy5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIEJvb3RzdHJhcCB0b29sdGlwLlxuICBEcnVwYWwuYmVoYXZpb3JzLmJvb3RzdHJhcF90b29sdGlwID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmcpIHtcbiAgICAgIGlmICgkLmZuLnRvb2x0aXApIHtcbiAgICAgICAgJChcIltkYXRhLXRvZ2dsZT0ndG9vbHRpcCddXCIpLnRvb2x0aXAoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gRmFjdG9yeSB0b29sdGlwLlxuICBEcnVwYWwuYmVoYXZpb3JzLnZ0b29sdGlwID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKCkge1xuICAgICAgJCgnW2NsYXNzKj1cImhhcy10b29sdGlwXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkc2VsZiA9ICQodGhpcyk7XG5cbiAgICAgICAgaWYgKCRzZWxmLmhhc0NsYXNzKCdqcy10b29sdGlwZWQnKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1vZGVybiB0b29sdGlwLlxuICAgICAgICBpZiAoJHNlbGYuaGFzQ2xhc3MoJ3Rvb2x0aXAtbW9kZXJuJykpIHtcbiAgICAgICAgICB2YXIgX2NvbnRlbnQgPSAkc2VsZi5hdHRyKCd0aXRsZScpLFxuICAgICAgICAgICAgX2hhc0ltYWdlID0gZmFsc2UsXG4gICAgICAgICAgICBfaW1hZ2VTcmMgPSAnJztcblxuICAgICAgICAgIGlmICgkc2VsZi5hdHRyKCdkYXRhLWltYWdlJykpIHtcbiAgICAgICAgICAgIF9oYXNJbWFnZSA9IHRydWU7XG4gICAgICAgICAgICBfaW1hZ2VTcmMgPSAkc2VsZi5hdHRyKCdkYXRhLWltYWdlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJHNlbGYuYWRkQ2xhc3MoJ3YtdG9vbHRpcCB2LXRvb2x0aXAtZWZmZWN0LTEnKTtcbiAgICAgICAgICAkc2VsZi53cmFwSW5uZXIoJzxzcGFuIGNsYXNzPVwidi10b29sdGlwLWl0ZW1cIj48L3NwYW4+Jyk7XG4gICAgICAgICAgaWYgKCFfaGFzSW1hZ2UpIHtcbiAgICAgICAgICAgICRzZWxmLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJ2LXRvb2x0aXAtY29udGVudCBjbGVhcmZpeFwiPjxzcGFuIGNsYXNzPVwidi10b29sdGlwLXRleHQgbm8taW1hZ2VcIj4gJyArIF9jb250ZW50ICsgJyA8L3NwYW4+PC9zcGFuPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRzZWxmLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJ2LXRvb2x0aXAtY29udGVudCBjbGVhcmZpeFwiPjxpbWcgc3JjPVwiJyArIF9pbWFnZVNyYyArICdcIiAvPjxzcGFuIGNsYXNzPVwidi10b29sdGlwLXRleHRcIj4gJyArIF9jb250ZW50ICsgJyA8L3NwYW4+PC9zcGFuPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkc2VsZi5maW5kKCcudi10b29sdGlwLWNvbnRlbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyBCb290c3RyYXAgdG9vbHRpcC5cbiAgICAgICAgICB2YXIgX2FycmF5ID0gJHNlbGYuYXR0cignY2xhc3MnKS5zcGxpdCgnICcpLFxuICAgICAgICAgICAgX3BsYWNlbWVudCA9ICdhdXRvJztcblxuICAgICAgICAgICQuZWFjaChfYXJyYXksIGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgaWYgKF9hcnJheVtpbmRleF0gIT09ICcnICYmIF9hcnJheVtpbmRleF0uaW5kZXhPZihcImhhcy10b29sdGlwLS1cIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgX3BsYWNlbWVudCA9IF9hcnJheVtpbmRleF0uc3BsaXQoJ2hhcy10b29sdGlwLS0nKVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRzZWxmLnRvb2x0aXAoe1xuICAgICAgICAgICAgcGxhY2VtZW50OiBfcGxhY2VtZW50XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgJHNlbGYuYWRkQ2xhc3MoJ2pzLXRvb2x0aXBlZCcpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIFByb3ZpZGVzIGFuIEhUTUwgbWFya3VwIGZvciBhIGJ1dHRvbi5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYnV0dG9uXG4gKiAgIENvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b24uaWNvblxuICogICBCdXR0b24gaWNvbiB1c2luZyBWYWN0b3J5IEZvbnQgKGV4YW1wbGU6IGljb24tY2hldnJvbi1yaWdodCxcbiAqICAgICBpY29uLWNoZXZyb24tbGVmdCkuXG4gKiBAcGFyYW0ge29iamVjdH0gYnV0dG9uLnRleHRcbiAqICAgQnV0dG9uIGJvZHkgdGV4dC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBidXR0b24uY3NzQ2xhc3NcbiAqICAgQnV0dG9uIGNzcyBjbGFzcyBuYW1lLlxuICpcbiAqIFVzYWdlOiBEcnVwYWwudGhlbWUoJ3ZCdXR0b25NYXJrdXAnLCB7J2Nzcyc6ICdzbGljay1uZXh0JywnaWNvbic6XG4gKiAgICAgJ2ljb24tY2hldnJvbi1yaWdodCd9KVxuICpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqICAgQSBzdHJpbmcgb2YgSFRNTCB3aXRoIGEgYnV0dG9uIGFuZCBhbiBpY29uIGVuY2xvc2VkIGJ5IGEgaS5cbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBEcnVwYWwudGhlbWUudkJ1dHRvbk1hcmt1cCA9IGZ1bmN0aW9uIChidXR0b24pIHtcblxuICAgIHZhciBidXR0b25JY29uID0gYnV0dG9uLmljb247XG4gICAgdmFyIGJ1dHRvblRleHQgPSBidXR0b24udGV4dDtcblxuICAgIC8vIEFzc2VtYmxlIHRoZSBtYXJrdXAtLXN0cmluZyBtYW5pcHVsYXRpb24gaXMgZmFzdCwgYnV0IGlmIHRoaXMgbmVlZHNcbiAgICAvLyB0byBiZWNvbWUgbW9yZSBjb21wbGV4LCB3ZSBjYW4gc3dpdGNoIHRvIGNyZWF0aW5nIGRvbSBlbGVtZW50cy5cbiAgICB2YXIgYnV0dG9uTWFya3VwID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJyArIGJ1dHRvbi5jc3MgKyAnXCIgYXJpYS1sYWJlbD1cIicgKyBidXR0b24uYXJpYUxhYmVsICsgJ1wiPic7XG5cbiAgICBpZiAoYnV0dG9uSWNvbikge1xuICAgICAgYnV0dG9uTWFya3VwICs9ICc8aSBjbGFzcz1cIicgKyBidXR0b25JY29uICsgJ1wiPjwvaT4nO1xuICAgIH1cblxuICAgIGlmIChidXR0b25UZXh0KSB7XG4gICAgICBidXR0b25NYXJrdXAgKz0gYnV0dG9uVGV4dDtcbiAgICB9XG5cbiAgICBidXR0b25NYXJrdXAgKz0gJzwvYnV0dG9uPic7XG5cbiAgICByZXR1cm4gYnV0dG9uTWFya3VwO1xuICB9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvLz09IEluaXRcbi8vXG4vLyMjIExvYWQgY3VzdG9tIHV0aWxpdGllcy5cbihmdW5jdGlvbiAoZG9tcmVhZHksIERydXBhbCwgZHJ1cGFsU2V0dGluZ3MpIHtcblxuICBcInVzZSBzdHJpY3RcIjtcblxuICBkb21yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS53b3coKTtcbiAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LnNsaWRlcnMoKTtcbiAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmFuaW1hdGVOdW1iZXJzKCk7XG4gICAgLy9EcnVwYWwudmFjdG9yeS51dGlsaXR5Lm91dGRhdGVkQnJvd3NlcigpO1xuICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkuZ290b1N0aWNreUJ1dHRvbigpO1xuICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkudmlld3NEYXRlRmlsdGVyKCk7XG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5kZXRlY3RJbnRlcnN0aXRpZWwoKTtcbiAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmxpbmtzY3JvbGwoKTtcbiAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmRpc2FibGVMaW5rKCk7XG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS56b29taW1hZ2UoKTtcbiAgICAvLyBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmZpbGVzVXBsb2FkKCk7XG4gICAgLy9EcnVwYWwudmFjdG9yeS51dGlsaXR5LnNtYXJ0QmFubmVyKCk7XG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5ib290c3RyYXBfdGFicygpO1xuICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkuZGF0ZXBpY2tlcigpO1xuICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkuc2VsZWN0cGlja2VyKCk7XG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5zZWxlY3RNdWx0aXBsZSgpO1xuICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkueXRwbGF5ZXIoKTtcbiAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmFjY29yZGlvblNjcm9sbCgpO1xuICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkuYWNjb3JkaW9uU2xpZGVyKCk7XG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5sYWJlbEFuaW1hdGlvbigpO1xuICAgIERydXBhbC52YWN0b3J5LnV0aWxpdHkuZm9ybVZhbGlkYXRpb24oKTtcbiAgICBEcnVwYWwudmFjdG9yeS51dGlsaXR5LmFkZFRvQW55QnV0dG9uKCk7XG4gICAgRHJ1cGFsLnZhY3RvcnkudXRpbGl0eS5zYXRpc2ZhY3Rpb25Gb3JtKCk7XG4gIH0pO1xuXG59KShkb21yZWFkeSwgRHJ1cGFsLCB3aW5kb3cuZHJ1cGFsU2V0dGluZ3MpO1xuIl19
