app = angular.module('MainApp')

app.controller 'themeCtrl', ['$scope', ($scope) ->

  # Set default theme
  $scope.theme = "chutter"

  # Change $scope.theme to desired theme name
  $scope.switchTheme = (themeName) ->
    $scope.theme = themeName

]