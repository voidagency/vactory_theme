//== Smart Banner
//
//## Smart Banner support for iOS 4/5 and Android.
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.smartBanner = function () {

    $(document).ready(function () {
      if (typeof $.smartbanner == "undefined") {
        return;
      }

      $.smartbanner({
        title: null, // What the title of the app should be in the banner
                     // (defaults to <title>)
        author: null, // What the author of the app should be in the banner
                      // (defaults to <meta name="author"> or hostname)
        price: Drupal.t('FREE'), // Price of the app
        appStoreLanguage: 'us', // Language code for App Store
        inAppStore: Drupal.t('On the App Store'), // Text of price for iOS
        inGooglePlay: Drupal.t('In Google Play'), // Text of price for Android
        inAmazonAppStore: Drupal.t('In the Amazon Appstore'),
        inWindowsStore: Drupal.t('In the Windows Store'), // Text of price for
                                                          // Windows
        GooglePlayParams: null, // Aditional parameters for the market
        icon: null, // The URL of the icon (defaults to <meta
                    // name="apple-touch-icon">)
        iconGloss: null, // Force gloss effect for iOS even for precomposed
        url: null, // The URL for the button. Keep null if you want the button
                   // to link to the app store.
        button: Drupal.t('VIEW'), // Text for the install button
        scale: 'auto', // Scale based on viewport size (set to 1 to disable)
        speedIn: 300, // Show animation speed of the banner
        speedOut: 400, // Close animation speed of the banner
        daysHidden: 15, // Duration to hide the banner after being closed (0 =
                        // always show banner)
        daysReminder: 90, // Duration to hide the banner after "VIEW" is
                          // clicked *separate from when the close button is
                          // clicked* (0 = always show banner)
        force: null, // Choose 'ios', 'android' or 'windows'. Don't do a
                     // browser check, just always show this banner
        hideOnInstall: true, // Hide the banner after "VIEW" is clicked.
        layer: false, // Display as overlay layer or slide down the page
        iOSUniversalApp: true, // If the iOS App is a universal app for both
                               // iPad and iPhone, display Smart Banner to iPad
                               // users, too.
        appendToSelector: 'body', //Append the banner to a specific selector
        onInstall: function () {
          // alert('Click install');
        },
        onClose: function () {
          // alert('Click close');
        }
      });
    });
  };

})(jQuery, Drupal);
