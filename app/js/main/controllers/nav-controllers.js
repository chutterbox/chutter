(function() {
  var app;

  app = angular.module('MainApp');

  app.controller('toastCtrl', function() {});

  app.controller('navCtrl', [
    '$scope', '$state', '$stateParams', '$auth', 'Page', 'Networks', '$mdBottomSheet', '$mdDialog', '$mdSidenav', '$mdToast', 'poller', 'API', function($scope, $state, $stateParams, $auth, Page, Networks, $mdBottomSheet, $mdDialog, $mdSidenav, $mdToast, poller, API) {
      var isOpen, toggleOpen;
      isOpen = void 0;
      toggleOpen = void 0;
      $scope.page = Page;
      $scope.$on("auth:validation-success", function() {});
      $scope.$on("auth:login-success", function() {});
      $scope.myPagingFunction = function() {
        return console.log("Here");
      };
      $mdToast.show({
        controller: 'toastCtrl',
        templateUrl: '/partials/toasts/comment-toast.html',
        position: 'bottom right'
      });
      $scope.$on("auth:show-signin", function() {
        return $mdDialog.show({
          controller: 'authCtrl',
          templateUrl: '/partials/main/authenticate.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      });
      $scope.logout = function() {
        return $auth.signOut();
      };
      $scope.toggleLeft = function() {
        return $mdSidenav('left').toggle();
      };
      $scope.signIn = function() {
        return $scope.$broadcast("auth:show-signin");
      };
      $scope.editNetworks = function() {
        return $mdDialog.show({
          controller: 'networkEditCtrl',
          templateUrl: '/partials/main/networkEdit.html',
          resolve: {
            List: [
              'NetworkResource', function(NetworkResource) {
                return NetworkResource.list();
              }
            ]
          },
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      };
      return $scope.$on('auth:login-success', function() {
        return $scope.networks = $auth.user.networks;
      });
    }
  ]);

}).call(this);
