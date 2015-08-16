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
      controller: [
        "$stateParams", "Page", "$scope", function($stateParams, Page, $scope) {
          if ($stateParams.community === $scope.community.slug || $scope.network.slug === $stateParams.network) {
            $scope.network.active = true;
            $scope.network.listElement.className += " active";
            return console.log($scope.network.listElement);
          }
        }
      ]
    };
  });

  app.directive('menuToggle', [
    '$timeout', '$state', function($timeout, $state) {
      return {
        scope: {
          network: '='
        },
        templateUrl: '../app/partials/main/menu/toggle.html',
        controller: [
          "$mdDialog", "$scope", function($mdDialog, $scope) {
            return $scope.editCommunity = function() {
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
                clickOutsideToClose: true
              });
            };
          }
        ],
        link: function($scope, $element) {
          var controller, originalHeight;
          controller = $element.parent().controller();
          $scope.network.listElement = $element[0].parentNode;
          originalHeight = void 0;
        }
      };
    }
  ]);

}).call(this);
