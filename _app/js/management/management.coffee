app = angular.module("ManagementApp", ["Chutter", "chart.js"])

app.config ["$mdThemingProvider", ($mdThemingProvider) ->
  $mdThemingProvider.theme('default').primaryPalette 'red'
]