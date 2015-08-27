happ = angular.module("ModerationApp", ["Chutter", "chart.js", "templates-moderation"])

app.config ["$mdThemingProvider", ($mdThemingProvider) ->
  $mdThemingProvider.theme('default').primaryPalette 'indigo'
]
