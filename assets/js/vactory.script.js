/*
 * vactory 
 * Responsive base theme for Drupal.
 * 
 *
 * Copyright (c) 2021, 
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
    errorElement: "span",
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
      },
      file: {
        required: true,
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
        //console.log('value', value);
        if(value.method === "pattern") {
          if($(value.element)[0].dataset.webformPatternError !== undefined && $(value.element)[0].dataset.webformPatternError !== '') {
            value.message = Drupal.t($(value.element)[0].dataset.webformPatternError);
          }
          else {
            var _name = $(value.element).parent('.form-group').find('label').text().replace('*', '');
            value.message =  Drupal.t('Field') + ' ' + _name + ' ' + Drupal.t('is not valid');
          }
        }
        if(value.method === "required") {
          if (value.element.className.includes('form-type-hidden')) {
            if (value.element.name.includes('file')) {
              var _name_file = $(value.element).parents('.form-group.form-type-managed-file').find('label').text().replace('*', '');
              console.log('name_file', _name_file);
              value.message = value.message =  Drupal.t('Field') + ' ' + _name_file + ' ' + Drupal.t('is not valid');
            }
          }

        }
        if (value.element.name === 'phone' && value.method === 'emailOrPhone') {
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
      } else if (_el.is('input[type="radio"]')) {
        _el.parents('.form-type-radios').addClass('is-invalid');
      } else if (_el.is('file')) {
        _el.parent().addClass('is-invalid');
        _el.parents('.form-managed-file').addClass('is-invalid');
      } else if (_el.is('input[type="hidden"]')) {
        _el.parents('.form-managed-file').addClass('is-invalid');
      } else {
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
      } else if (_el.is('input[type="radio"]')) {
        _el.parents('.form-type-radios').removeClass('is-invalid');
      } else if (_el.is('input[type="file"]')) {
        _el.removeClass('is-invalid');
        _el.parents('.form-managed-file').removeClass('is-invalid');
      } else if (_el.is('input[type="hidden"]')) {
        _el.parents('.form-managed-file').removeClass('is-invalid');
      } else {
        _el.removeClass('is-invalid');
      }
    },
    // handler for invalid form
    invalidHandler: function (event, validator) {
      //console.log('event : ', event, ' validator : ', validator);
      // 'this' refers to the form
      var errors = validator.numberOfInvalids();
      if (errors) {
        // comment if not using errors messages wrapper
        $(".validation-messages-box").show();
      } else {
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

  jQuery.validator.addMethod('emailOrPhone', function () {
    return $("#edit-email").val() !== "" || $("#edit-phone").val() !== "";
  }, Drupal.t("You must provide at least one contact field"));

  jQuery.validator.addMethod('captcha_validation', function () {
    var googleResponse = jQuery('#g-recaptcha-response').val();
    return googleResponse.length > 0;
  }, Drupal.t("Veuillez valider le captcha"));

  jQuery.validator.addMethod('password', function (value, element) {
    return this.optional(element) || value.length >= 5;
  });

  jQuery.validator.addMethod('search_key_validation', function (value) {
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
    return this.optional(element) || /^[\u0041-\u005A\u0061-\u007A\u00C0-\u00F6\u0600-\u06FF \-\s]+$/.test(value);
    //return this.optional(element) || /^[\u0000-\u007F\u0600-\u06FF
    // \-_\s]+$/.test(value) return this.optional(element) ||
    // /^[\p{L}]+[\p{L}\s-]*$/.test(value)
  });

  jQuery.validator.addMethod('no_arabic', function (value, element) {
    return this.optional(element) || /^[^\u0600-\u06FF]+$/.test(value);
  });

  jQuery.validator.addMethod('tele', function (value, element) {
    return this.optional(element) || /[+]{0,1}[0-9]{1,4}[\s]{0,1}[0-9]{9,14}$/.test(value);
  }, Drupal.t("Veuillez saisir un numéro de téléphone valide"));

  jQuery.validator.addMethod('emailOrPhone', function () {
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
      /^(([a-zA-Z]{1,2})([0-9]{1,6})([a-zA-Z]{1}))$/.test(value);
  }, Drupal.t("Format de la CIN incorrecte"));

  jQuery.validator.addMethod('captcha_validation', function () {
    var googleResponse = jQuery('#g-recaptcha-response').val();
    return googleResponse.length > 0;
  }, Drupal.t("Veuillez valider le captcha"));

  jQuery.validator.addMethod('secured_password', function (value, element) {
    return this.optional(element) || (value.length >= 8 && /^(?=.*\d)(?=.*([a-zA-Z])).{8,20}$/.test(value));
  });

  jQuery.validator.addMethod('password', function (value, element) {
    return this.optional(element) || (value.length >= 5);
  });

  jQuery.validator.addMethod("pattern", function (value, element, param) {
    if (this.optional(element)) {
      return true;
    }
    if (typeof param === "string") {
      param = new RegExp("^(?:" + param + ")$");
    }
    return param.test(value);
  }, jQuery.validator.format("this is not in valid format"));
  //}, Drupal.t('Please enter a valid format'));

  // override default messages for specific form field
  $.validator.messages.required = function (param, input) {
    var _input = $(input),
      _name = "";
    if (typeof _input.data('webform-required-error') !== 'undefined') {
      return _input.data('webform-required-error');
    } else if (_input.is("file") === true) {
      _name = _input.parents('.form-managed-filed').find('.managed-file-placeholder').text();
    } else if (_input.is("textarea") === true) {
      _name = _input.parents('.form-type-textarea').find('label').text();
    } else if (_input.attr('type') === 'radio') {
      _name = _input.parents('.form-type-radios').find('> label').text();
    } else if (_input.is("select") === true) {
      _name = $(input).parents('.form-type-select').find(' > label').text();
    } else {
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

          // add rule for a files inputs
          jQuery('input[name^="file"]').each(function () {
            if ($(this).parents('.form-type-managed-file').find(' > label').hasClass('form-required')) {
              $(this).rules('add', {
                required: true
              });
            }
          });


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
;//== change img to video.
//
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.imgtovideo = function () {
    $(document).ready(function () {
      var $video_player = $('.play-video');
      if($video_player.length) {
        $video_player.each(function(i) {
          $(this).on('click', function (e) {
            e.preventDefault();
            if ($(this).parents('.js-img-video').length) {
              $(this).addClass('loader');
              var $video_link = $(this).attr('href');
              $video_link = ($video_link.includes('watch')) ? $video_link.replace('watch?v=', 'embed/') + '?rel=0&amp;autoplay=1&controls=0&fs=0&iv_load_policy=3' : null;
              var $js_iframe2 = $('<iframe>', {
                src: $video_link,
                id: 'js-iframe-video',
                frameborder: '0',
                scrolling: 'no',
                allow: 'autoplay',
                controls: '0',
                modestbranding: '1',
                width: '100%',
                height: $(this).find('img').height() + 'px'
              });
              $(this).parent().html($js_iframe2);
            } else {
              $('.play-video').fancybox();
            }
          });
        });
      }
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
       /**
       * Filtre multiselect sur le coté sur mobile
       * $('.btn.multiselect').removeClass('btn-default').parent('.btn-group').addClass('filter-slider'); 
       **/
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

      /*$('select.selectpicker:not([multiple="multiple"]), select.skinned-select').each(function (index, value) {
        ($(value).is(':visible') && $(value).hasClass('js-autocomplete')) ? $(value).attr('data-live-search', true).attr('data-none-results-text', Drupal.t('Aucun résultat')) : null;
        ($(value).is(':visible')) ? $(value).selectpicker() : null;
      });*/

      $('select:not(.skinned-select):not(.selectpicker):not(.lang-dropdown-select-element)').each(function () {
        if ($(this).attr('data-placeholder-value')) {
          $(this).find('option[value="none"]').text($(this).attr('data-placeholder-value'));
        }
        /*$(this).parent().addClass('group-select');
        if (!($(this).siblings().is("span"))) {
          $(this).parent().append("<span class='selected-option'> " + $(this).find("option:selected").text() + "</span>");
        }*/
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
;(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.stickyBlock = function () {
    $(document).ready(function () {
      var $stickyBloc = $('.sticky-bloc');
      if ($stickyBloc.length && matchMedia('(min-width: 992px)').matches) {
        $stickyBloc.each(function(e) {
          var _stickyBloc = $(this);
          var _stickyBlocHeight = _stickyBloc.height();
          var _stickyBlocOffset = _stickyBloc.offset().top + _stickyBlocHeight;

          $(window).scroll(function() {
            var _isStickyHeight = _stickyBloc.height();
            if ( $(window).scrollTop() > _stickyBlocOffset + 200 ) {
              _stickyBloc.parent().height(_stickyBlocHeight);
              _stickyBloc.find('iframe').height(_isStickyHeight);
              _stickyBloc.removeClass('sticky').addClass('sticky-back');
              _stickyBloc.addClass('sticky');
            } else {
              _stickyBloc.removeClass('sticky').removeClass('sticky-back');
              _stickyBloc.parent().height("auto");
              _stickyBloc.find('iframe').height(_stickyBlocHeight);
            };
          });

        });
      }
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
      var $element = $(".ytplayer"),
        isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (!isDevice || matchMedia('(min-width: 992px)').matches) {
          if (!$element.hasClass('mb_YTPlayer')) {
            var _timer = setTimeout(function() {
              $element.YTPlayer();
              clearTimeout(_timer);
            }, 4000);
          }
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
          // document.querySelector('body').classList.remove('no-scroll');
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
(function ($, Drupal, drupalSettings) {

  "use strict";

  $(document).ready(function () {
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
    Drupal.vactory.utility.stickyBlock();
    Drupal.vactory.utility.imgtovideo();
  });

})(jQuery, Drupal, window.drupalSettings);
