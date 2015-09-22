(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("createCtrl", [
    "$scope", "CommunityResource", "$state", "$filter", "Page", "$mdDialog", "CommunityRule", "Networks", function($scope, CommunityResource, $state, $filter, Page, $mdDialog, CommunityRule, Networks) {
      $scope.flowState = {
        selectedNetwork: {},
        loading: false
      };
      $scope.networks = Networks;
      $scope.newCommunity = {
        network_id: "",
        name: "",
        rules_attributes: []
      };
      $scope.slug = function() {
        return $scope.newCommunity.name;
      };
      $scope.$watch("newCommunity.name", _.debounce(function(newVal, oldVal) {
        return $scope.flowState.loading = true;
      }, 500));
      $scope.nameValid = function() {
        if ($scope.newCommunity.name && $scope.newCommunity.name.length > 0) {
          return true;
        } else {
          return false;
        }
      };
      $scope.createCommunityRule = function($event) {
        $scope.newRule = new CommunityRule;
        $scope.newCommunity.rules_attributes.push($scope.newRule);
        return $mdDialog.show({
          controller: 'createCommunityRuleCtrl',
          templateUrl: '/partials/shared/createCommunityRule.html',
          parent: angular.element(document.body),
          scope: $scope,
          targetElement: $event,
          preserveScope: true,
          clickOutsideToClose: true
        });
      };
      $scope.$on("cancelSave", function() {
        $scope.newCommunity.rules_attributes.pop();
        return $scope.newRule.$destroy;
      });
      return $scope.submit = function() {
        return CommunityResource.save({
          community: $scope.newCommunity
        }).$promise.then(function(data) {
          return $state.transitionTo("frontpage.community.hot", {
            community: data.community.slug
          });
        });
      };
    }
  ]);

}).call(this);
