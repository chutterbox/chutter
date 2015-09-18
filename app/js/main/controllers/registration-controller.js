(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("registrationCtrl", ["$scope", function($scope) {}]);

  app.directive('uniqueUsername', [
    "$q", "UserResource", function($q, UserResource) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          return ngModel.$asyncValidators.unique = function() {
            var deferred;
            deferred = $q.defer();
            console.log(ngModel);
            UserResource.user_exists({
              username: ngModel.$viewValue
            }, function() {
              return deferred.resolve();
            }, function() {
              return deferred.reject();
            });
            return deferred.promise;
          };
        }
      };
    }
  ]);

  app.controller("welcomeCtrl", [
    "$scope", "UserResource", "$auth", "$state", function($scope, UserResource, $auth, $state) {
      $scope.user = {
        username: "",
        email: ""
      };
      return $scope.register = function() {
        return $auth.submitRegistration($scope.user).then(function(resp) {
          return $state.transitionTo("register.interests");
        })["catch"](function(resp) {
          $scope.serverErrors = _.uniq(resp.data.errors.full_messages);
          if (resp.status === !403) {
            return $scope.unavailable = true;
          }
        });
      };
    }
  ]);

  app.controller("interestsCtrl", [
    "$scope", "UserResource", "$auth", "$state", "NetworkList", function($scope, UserResource, $auth, $state, NetworkList) {
      return $scope.networkList = NetworkList;
    }
  ]);

}).call(this);
