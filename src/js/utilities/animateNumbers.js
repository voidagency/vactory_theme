/**
 * Created by void on 10/09/2018.
 */
//== Animate Numbers
//
//## Animate numbers of chiffres clé
var goToNumber;
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.animateNumbers = function () {
    $(document).ready(function () {

      var intervalAnimation = 0.5;

      goToNumber = function (target) {
        target.each(function (index, item) {
          var getMax = parseFloat($(item).attr('data-number')),
            intervalNumber = 0,
            increment = getMax / 100,
            animated = true,
            isInt = (Number(getMax) === getMax && getMax % 1 === 0);
          if (!$(item).hasClass('animated')) {
            animated = (!($(item).parents('.slick-initialized').length && !$(item).parents('.slick-current').length));
            var myInterval = (animated) ? setInterval(function () {
              if (intervalNumber < getMax) {
                intervalNumber = intervalNumber + increment;
                !$(item).hasClass('animated') ? $(item).addClass('animated') : null;
                if(isInt) { // Condition to know if it is an integer or float
                  (intervalNumber >= getMax) ? $(item).text(getMax) : $(item).text(Math.ceil(Math.ceil(intervalNumber)));
                }
                else {
                  (intervalNumber >= getMax) ? $(item).text(getMax) : $(item).text(intervalNumber.toFixed(1));
                }
                (intervalNumber >= getMax) ? clearInterval(myInterval) : null;
              }
            }, intervalAnimation) : null;
          }
        });
      };
    });
  };

})(jQuery, Drupal);

