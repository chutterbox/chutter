(function() {
  'use strict';
  var app;

  app = angular.module('MainApp', ["Chutter", "templates-main"]);

  $(document).ready(function() {
    return setTimeout(function() {
      return $("menu-toggle > a").on("click", function(event) {
        console.log(event);
        if (event.screenX < 53) {
          return event.preventDefault();
        }
      });
    }, 2000);
  });

  app.config([
    "$httpProvider", "$mdThemingProvider", function($httpProvider, $mdThemingProvider) {
      var chutterDarkMap, chutterMap, chutterOrangeMap, chutterPinkMap, chutterTealMap;
      chutterMap = $mdThemingProvider.extendPalette('blue', {});
      chutterDarkMap = $mdThemingProvider.extendPalette('blue-grey', {});
      chutterTealMap = $mdThemingProvider.extendPalette('teal', {});
      chutterOrangeMap = $mdThemingProvider.extendPalette('orange', {
        'contrastDefaultColor': 'light'
      });
      chutterPinkMap = $mdThemingProvider.extendPalette('pink', {});
      $mdThemingProvider.definePalette('chutter', chutterMap);
      $mdThemingProvider.definePalette('chutterDark', chutterDarkMap);
      $mdThemingProvider.definePalette('chutterTeal', chutterTealMap);
      $mdThemingProvider.definePalette('chutterOrange', chutterOrangeMap);
      $mdThemingProvider.definePalette('chutterPink', chutterPinkMap);
      $mdThemingProvider.theme('chutter').primaryPalette('chutter', {
        'hue-1': '700',
        'hue-2': '800',
        'hue-3': '900'
      }).accentPalette('pink');
      $mdThemingProvider.theme('chutterDark').primaryPalette('chutterDark', {
        'hue-1': '600',
        'hue-2': '700',
        'hue-3': '800'
      }).backgroundPalette('blue-grey').accentPalette('blue').dark();
      $mdThemingProvider.theme('chutterTeal').primaryPalette('chutterTeal', {
        'hue-1': '600',
        'hue-2': '700',
        'hue-3': '800'
      }).accentPalette('deep-orange');
      $mdThemingProvider.theme('chutterOrange').primaryPalette('chutterOrange', {
        'hue-1': '600',
        'hue-2': '700',
        'hue-3': '800'
      }).accentPalette('deep-orange');
      $mdThemingProvider.theme('chutterPink').primaryPalette('chutterPink', {
        'hue-1': '600',
        'hue-2': '700',
        'hue-3': '800'
      }).accentPalette('indigo');
      $mdThemingProvider.setDefaultTheme('chutter');
      return $mdThemingProvider.alwaysWatchTheme(true);
    }
  ]);

}).call(this);
