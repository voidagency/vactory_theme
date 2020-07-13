//== Outdated Browser
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
