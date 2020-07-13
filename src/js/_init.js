//== Init
//
//## Load custom utilities.
(function (domready, Drupal, drupalSettings) {

  "use strict";

  domready(function () {
    Drupal.vactory.utility.wow();
    Drupal.vactory.utility.sliders();
    Drupal.vactory.utility.animateNumbers();
    //Drupal.vactory.utility.outdatedBrowser();
    Drupal.vactory.utility.gotoStickyButton();
    Drupal.vactory.utility.viewsDateFilter();
    Drupal.vactory.utility.detectInterstitiel();
    Drupal.vactory.utility.linkscroll();
    Drupal.vactory.utility.disableLink();
    Drupal.vactory.utility.zoomimage();
    // Drupal.vactory.utility.filesUpload();
    //Drupal.vactory.utility.smartBanner();
    Drupal.vactory.utility.bootstrap_tabs();
    Drupal.vactory.utility.datepicker();
    Drupal.vactory.utility.selectpicker();
    Drupal.vactory.utility.selectMultiple();
    Drupal.vactory.utility.ytplayer();
    Drupal.vactory.utility.accordionScroll();
    Drupal.vactory.utility.accordionSlider();
    Drupal.vactory.utility.labelAnimation();
    Drupal.vactory.utility.formValidation();
    Drupal.vactory.utility.addToAnyButton();
    Drupal.vactory.utility.satisfactionForm();
  });

})(domready, Drupal, window.drupalSettings);
