//== Zoom
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
