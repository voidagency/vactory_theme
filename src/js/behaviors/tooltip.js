//== Tooltip
//
//## Apply custom tooltip for links.
(function ($, Drupal) {
  "use strict";

  // Bootstrap tooltip.
  Drupal.behaviors.bootstrap_tooltip = {
    attach: function (context, setting) {
      if ($.fn.tooltip) {
        $("[data-toggle='tooltip']").tooltip();
      }
    }
  };

  // Factory tooltip.
  Drupal.behaviors.vtooltip = {
    attach: function () {
      $('[class*="has-tooltip"]').each(function () {
        var $self = $(this);

        if ($self.hasClass('js-tooltiped')) {
          return;
        }

        // Modern tooltip.
        if ($self.hasClass('tooltip-modern')) {
          var _content = $self.attr('title'),
            _hasImage = false,
            _imageSrc = '';

          if ($self.attr('data-image')) {
            _hasImage = true;
            _imageSrc = $self.attr('data-image');
          }

          $self.addClass('v-tooltip v-tooltip-effect-1');
          $self.wrapInner('<span class="v-tooltip-item"></span>');
          if (!_hasImage) {
            $self.append('<span class="v-tooltip-content clearfix"><span class="v-tooltip-text no-image"> ' + _content + ' </span></span>');
          }
          else {
            $self.append('<span class="v-tooltip-content clearfix"><img src="' + _imageSrc + '" /><span class="v-tooltip-text"> ' + _content + ' </span></span>');
          }
          $self.find('.v-tooltip-content').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
          });
        }
        else {
          // Bootstrap tooltip.
          var _array = $self.attr('class').split(' '),
            _placement = 'auto';

          $.each(_array, function (index) {
            if (_array[index] !== '' && _array[index].indexOf("has-tooltip--") != -1) {
              _placement = _array[index].split('has-tooltip--')[1];
            }
          });

          $self.tooltip({
            placement: _placement
          });
        }
        $self.addClass('js-tooltiped');
      });
    }
  };

})(jQuery, Drupal);
