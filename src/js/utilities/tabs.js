//== Tabs
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
