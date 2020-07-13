//== Form validation
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
