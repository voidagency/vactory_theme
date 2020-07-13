/**
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
