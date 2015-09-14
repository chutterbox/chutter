'use strict'

app = angular.module("Chutter")

app.controller "authCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$auth", "$mdDialog", ($rootScope, $scope, $state, $stateParams, $auth, $mdDialog) ->

  $scope.submitLogin = (user) -> 
    user.remember_me = true
    $auth.submitLogin(user)
  $scope.submitRegistration = (user) -> 
    $auth.submitRegistration(user)
  $rootScope.$on("auth:login-success", () ->
    $mdDialog.hide()
  )

  $scope.hideDialog = () ->
    $mdDialog.hide()

  $scope.$on 'auth:registration-email-error', (ev, reason) ->
    $scope.errors = _.uniq reason.errors.full_messages
    setTimeout () ->
      $scope.errors = []
    , 5000
  
  $scope.$on 'auth:login-error', (ev, reason) ->
    console.log reason
    $scope.errors = _.uniq reason.errors
    setTimeout () ->
      $scope.errors = []
    , 5000

  $scope.$on 'auth:registration-email-success', (ev, user) ->
    $auth.validateUser()

]