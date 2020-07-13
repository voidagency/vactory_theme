//== Vactory Icons
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
