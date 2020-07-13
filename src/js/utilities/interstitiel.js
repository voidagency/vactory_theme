//== Portrait / Landscape detection
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
