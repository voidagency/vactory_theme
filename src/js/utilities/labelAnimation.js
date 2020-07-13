//== form label animations
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
