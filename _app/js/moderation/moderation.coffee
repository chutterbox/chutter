app = angular.module("ModerationApp", ["Chutter", "chart.js"])

app.config ["$mdThemingProvider", ($mdThemingProvider) ->
  $mdThemingProvider.theme('default').primaryPalette 'indigo'
]
