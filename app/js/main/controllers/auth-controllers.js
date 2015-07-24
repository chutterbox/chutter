(function() {
  'use strict';
  var app;

  app = angular.module("MainApp");

  app.controller("authCtrl", [
    "$rootScope", "$scope", "$state", "$stateParams", "$auth", "$mdDialog", function($rootScope, $scope, $state, $stateParams, $auth, $mdDialog) {
      $scope.submitLogin = function(user) {
        user.remember_me = true;
        return $auth.submitLogin(user);
      };
      $scope.submitRegistration = function(user) {
        return $auth.submitRegistration(user);
      };
      $rootScope.$on("auth:login-success", function() {
        return $mdDialog.hide();
      });
      $scope.hideDialog = function() {
        return $mdDialog.hide();
      };
      $scope.$on('auth:registration-email-error', function(ev, reason) {
        $scope.errors = _.uniq(reason.errors.full_messages);
        return setTimeout(function() {
          return $scope.errors = [];
        }, 5000);
      });
      $scope.$on('auth:login-error', function(ev, reason) {
        console.log(reason);
        $scope.errors = _.uniq(reason.errors);
        return setTimeout(function() {
          return $scope.errors = [];
        }, 5000);
      });
      return $scope.$on('auth:registration-email-success', function(ev, user) {
        return $auth.validateUser();
      });
    }
  ]);

}).call(this);
