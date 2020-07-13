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
