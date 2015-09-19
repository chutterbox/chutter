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
      $scope.privacyItems = {
        "Your information is never for sale": "This means that we will only share your personal data with your consent, and after letting you know what information will be shared and with whom, unless it is otherwise permitted in this policy. We do not sell or otherwise give access to any information collected about our users to any third party.",
        "Chutter will not disclose your information unless required by law": "We may disclose – or preserve for future disclosure – your information if we believe, after due consideration, that doing so is reasonably necessary to comply with a law, regulation, or valid legal process. If we are going to release your information, we will do our best to provide you with notice in advance via chutter's private messaging system unless we are prohibited by court order from doing so (e.g., an order under 18 U.S.C. § 2705(b)). We reserve the right to delay notice to users in cases involving the exploitation of minors and when we believe a delay is necessary to prevent imminent and serious bodily harm to a person.",
        "Third party tools": "Chutter uses Google Analytics. It is an extremely common tool that many of your favorite sites use. Chutter simply uses this for approximating things like: how many users are on the site right now (for capacity planning), or what pages are experiencing issues/high-traffic.  No personally identifyable data is sent to google. For more information about how Google handles analytics data, please consult the [Google Privacy Policy](https://www.google.com/intl/en/policies/privacy/). You should consult the respective privacy policies of these third-party servers for more detailed information on their practices."
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

}).call(this);
