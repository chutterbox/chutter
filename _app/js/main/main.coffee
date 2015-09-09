'use strict'
app = angular.module('MainApp', ["Chutter", "templates-main"])


#global event listener for menu toggle
$(document).ready () ->
  setTimeout () -> 
    $("menu-toggle > a").on "click", (event) ->
      console.log event
      if event.screenX < 53
        event.preventDefault()
  , 2000


app.config ["$httpProvider", "$mdThemingProvider", ($httpProvider, $mdThemingProvider) ->

  # Default Chutter
  chutterMap = $mdThemingProvider.extendPalette('blue', {
  })
  # Chutter Dark
  chutterDarkMap = $mdThemingProvider.extendPalette('blue-grey', {
  })
  # Chutter Teal
  chutterTealMap = $mdThemingProvider.extendPalette('teal', {
  })
  # Chutter Orange
  chutterOrangeMap = $mdThemingProvider.extendPalette('orange', {
    'contrastDefaultColor': 'light'
  })
  # Chutter Pink
  chutterPinkMap = $mdThemingProvider.extendPalette('pink', {
  })

  $mdThemingProvider.definePalette('chutter', chutterMap)
  $mdThemingProvider.definePalette('chutterDark', chutterDarkMap)
  $mdThemingProvider.definePalette('chutterTeal', chutterTealMap)
  $mdThemingProvider.definePalette('chutterOrange', chutterOrangeMap)
  $mdThemingProvider.definePalette('chutterPink', chutterPinkMap)

  # Default Chutter
  $mdThemingProvider.theme('chutter')
    .primaryPalette 'chutter', {
      'hue-1': '700'
      'hue-2': '800'
      'hue-3': '900'
    }
    .accentPalette 'pink'
  # Chutter Dark
  $mdThemingProvider.theme('chutterDark')
    .primaryPalette 'chutterDark', {
      'hue-1': '600'
      'hue-2': '700'
      'hue-3': '800'
    }
    .backgroundPalette 'blue-grey'
    .accentPalette 'blue'
    .dark()
  # Chutter Teal
  $mdThemingProvider.theme('chutterTeal')
  .primaryPalette 'chutterTeal', {
    'hue-1': '600'
    'hue-2': '700'
    'hue-3': '800'
  }
  .accentPalette 'deep-orange'
  # Chutter Orange
  $mdThemingProvider.theme('chutterOrange')
  .primaryPalette 'chutterOrange', {
    'hue-1': '600'
    'hue-2': '700'
    'hue-3': '800'
  }
  .accentPalette 'deep-orange'
  # Chutter Pink
  $mdThemingProvider.theme('chutterPink')
  .primaryPalette 'chutterPink', {
    'hue-1': '600'
    'hue-2': '700'
    'hue-3': '800'
  }
  .accentPalette 'indigo'

  $mdThemingProvider.setDefaultTheme('chutter')
  $mdThemingProvider.alwaysWatchTheme(true)

# $httpProvider.interceptors.push ["$q", '$injector','$rootScope', ($q, $injector, $rootScope) ->
  #   {
  #     responseError: (rejection) ->
  #       if rejection.status == 401
  #         $rootScope.$broadcast "auth:show-signin"
  #   }  
  # ]
]
