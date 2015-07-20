(function() {
  var app;

  app = angular.module("MainApp");

  app.directive('menuLink', function() {
    return {
      scope: {
        community: '='
      },
      templateUrl: '/partials/main/menu/link.html',
      link: function($scope, $element) {
        var controller;
        controller = $element.parent().controller();
        $scope.isSelected = function() {
          return controller.isSelected($scope.community);
        };
        $scope.focusSection = function() {
          controller.autoFocusContent = true;
        };
      }
    };
  });

  app.directive('menuToggle', [
    '$timeout', '$state', function($timeout, $state) {
      return {
        scope: {
          networkSubscription: '='
        },
        templateUrl: '/partials/main/menu/toggle.html',
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
                        id: $scope.networkSubscription.network_id
                      });
                    }
                  ]
                },
                parent: angular.element(document.body)
              });
            };
          }
        ],
        link: function($scope, $element) {
          var $ul, controller, originalHeight, parentNode;
          controller = $element.parent().controller();
          $ul = $element.find('ul');
          originalHeight = void 0;
          $scope.isOpen = function() {
            return controller.isOpen($scope.networkSubscription);
          };
          $scope.toggle = function() {
            controller.toggleOpen($scope.networkSubscription);
          };
          $scope.editNetworks = function() {
            return controller.editNetworks;
          };
          if ($element.find("a").hasClass("active")) {
            $timeout((function() {
              return $scope.toggle();
            }), 100);
          }
          $scope.$watch($scope.isOpen, function(open) {
            var getTargetHeight, targetHeight;
            $ul = $element.find('ul');
            getTargetHeight = function() {
              var targetHeight;
              var targetHeight;
              targetHeight = void 0;
              $ul.addClass('no-transition');
              $ul.css('height', '');
              targetHeight = $ul.prop('clientHeight');
              $ul.css('height', 0);
              $ul.removeClass('no-transition');
              return targetHeight;
            };
            targetHeight = open ? getTargetHeight() : 0;
            return $timeout((function() {
              return $ul.css({
                height: targetHeight + 'px'
              });
            }), 0, false);
          });
          parentNode = $element[0].parentNode.parentNode.parentNode;
        }
      };
    }
  ]);

}).call(this);
