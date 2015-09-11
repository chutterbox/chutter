(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("createCtrl", [
    "$scope", "CommunityResource", "$state", "$filter", "Page", "$mdDialog", "CommunityRule", function($scope, CommunityResource, $state, $filter, Page, $mdDialog, CommunityRule) {
      $scope.flowState = {
        selectedNetwork: {},
        loading: false
      };
      $scope.page = Page;
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
      $scope.$watch("flowState.selectedNetwork", function(newVal, oldVal) {
        if (newVal && newVal.id) {
          return $scope.newCommunity.network_id = newVal.id;
        }
      });
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
      $scope.selectedStep = 0;
      $scope.next = function() {
        return $scope.selectedStep += 1;
      };
      $scope.back = function() {
        return $scope.selectedStep -= 1;
      };
      return $scope.submit = function() {
        return CommunityResource.save({
          community: $scope.newCommunity
        }).$promise.then(function(data) {
          return $state.transitionTo("home.community.hot", {
            community: data.community.slug
          });
        });
      };
    }
  ]);

}).call(this);
