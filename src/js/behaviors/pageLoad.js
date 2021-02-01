// page load event

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
