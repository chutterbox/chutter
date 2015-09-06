app = angular.module("ModerationApp", ["Chutter", "chart.js", "md.data.table", "templates-moderation"])

app.config ["$mdThemingProvider", ($mdThemingProvider) ->
  $mdThemingProvider.theme('default').primaryPalette 'indigo'
]
