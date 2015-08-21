(function() {
  var app;

  app = angular.module("MainApp");

  app.directive('menuLink', function() {
    return {
      scope: {
        community: '=',
        network: "="
      },
      templateUrl: '../app/partials/main/menu/link.html',
      controller: ["$stateParams", "Page", "$scope", function($stateParams, Page, $scope) {}]
    };
  });

  app.directive('menuToggle', [
    '$timeout', '$state', 'Page', function($timeout, $state, Page) {
      return {
        scope: {
          network: '='
        },
        templateUrl: '../app/partials/main/menu/toggle.html',
        controller: [
          "$mdDialog", "$scope", function($mdDialog, $scope) {
            return $scope.editCommunity = function(ev) {
              return $mdDialog.show({
                controller: "communityEditCtrl",
                templateUrl: '/partials/main/communityEdit.html',
                resolve: {
                  List: [
                    "NetworkResource", function(NetworkResource) {
                      return NetworkResource.communities({
                        id: $scope.network.id
                      });
                    }
                  ]
                },
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                targetEvent: ev
              });
            };
          }
        ],
        link: function($scope, $element) {
          var originalHeight;
          $scope.network.menuListItem = $element[0].parentNode;
          $scope.network.menuToggle = $element[0];
          originalHeight = void 0;
          $scope.network.close = function() {
            $scope.network.menuListItem.className = "";
            return $scope.network.toggled = false;
          };
          $scope.network.open = function() {
            $scope.network.menuListItem.className = "active";
            return $scope.network.toggled = true;
          };
          $scope.network.toggle = function() {
            if ($scope.network.toggled) {
              $scope.network.close();
              if (Page.selectedNetwork) {
                Page.selectedNetwork.close();
                return Page.selectedNetwork = void 0;
              }
            } else {
              console.log(Page.selectedNetwork);
              if (Page.selectedNetwork) {
                Page.selectedNetwork.close();
              }
              $scope.network.open();
              return Page.selectedNetwork = $scope.network;
            }
          };
        }
      };
    }
  ]);

}).call(this);
