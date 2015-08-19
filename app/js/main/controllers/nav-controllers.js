(function() {
  var app;

  app = angular.module('MainApp');

  app.controller('toastCtrl', function() {});

  app.controller('pageCtrl', [
    '$scope', '$state', '$stateParams', '$auth', 'Page', 'Networks', '$mdBottomSheet', '$mdDialog', '$mdSidenav', '$mdToast', 'poller', 'API', function($scope, $state, $stateParams, $auth, Page, Networks, $mdBottomSheet, $mdDialog, $mdSidenav, $mdToast, poller, API) {
      var isOpen, toggleOpen;
      isOpen = void 0;
      toggleOpen = void 0;
      $scope.page = Page;
      if ($scope.user && $scope.user.id) {
        $scope.poller = poller;
        $scope.poller.get(API.makeURL('/users/ephemeral_notifications'), {
          delay: 30000
        }).promise.then(null, null, function(data) {
          return $scope.showNotifications(data.data);
        });
      }
      $scope.$on("auth:logout-success", function() {
        return $scope.poller.stopAll();
      });
      $scope.$on("auth:login-success", function() {
        $scope.poller = poller;
        return $scope.poller.get(API.makeURL('/users/ephemeral_notifications'), {
          delay: 30000
        }).promise.then(null, null, function(data) {
          return $scope.showNotifications(data.data);
        });
      });
      $scope.myPagingFunction = function() {
        return console.log("Here");
      };
      $scope.showNotifications = function(notifications) {
        var cascade, ephemeral_notifications;
        ephemeral_notifications = _.reject(notifications, function(n) {
          return n.ephemeral_count === 0;
        });
        if (ephemeral_notifications.length > 0) {
          if (ephemeral_notifications.length > 1) {
            cascade = true;
          }
          return _.each(ephemeral_notifications, function(notification) {
            console.log(notification);
            if (cascade) {
              return setTimeout(function() {
                return $scope.showNotification(notification);
              }, 5000);
            } else {
              return $scope.showNotification(notification);
            }
          });
        }
      };
      $scope.showNotification = function(notification) {
        var body, title;
        if (notification.entityable === "comment") {
          body = notification.body.substring(0, 50);
          if (body.length > 49) {
            body += "...";
          }
          return $mdToast.show($mdToast.simple().content("Re: " + body).position("bottom right").action(notification.ephemeral_count + " new").hideDelay(5000));
        } else if (notification.entityable === "post") {
          title = notification.title.substring(0, 50);
          if (title.length > 49) {
            title += "...";
          }
          return $mdToast.show($mdToast.simple().content("Re: " + title).position("bottom right").action(notification.ephemeral_count + " new").hideDelay(5000));
        }
      };
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
