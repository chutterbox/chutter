app = angular.module("MainApp")

app.directive 'menuLink', ->
  {
    scope: 
      community: '='
      network: "="
    templateUrl: '../app/partials/main/menu/link.html'
    controller: ["$stateParams", "Page", "$scope", ($stateParams, Page, $scope) ->

      if $stateParams.community is $scope.community.slug or $scope.network.slug is $stateParams.network
        $scope.network.active = true
        $scope.network.listElement.className += " active"
        console.log $scope.network.listElement
    ]
  }

app.directive 'menuToggle', ['$timeout', '$state', ($timeout, $state) ->
    {
      scope: 
        network: '='
      templateUrl: '../app/partials/main/menu/toggle.html'
      controller: ["$mdDialog", "$scope", ($mdDialog, $scope) ->
        $scope.editCommunity = () ->
          $mdDialog.show({
            controller: "communityEditCtrl",
            templateUrl: '/partials/main/communityEdit.html',
            resolve: 
              List: ["NetworkResource", (NetworkResource) ->
                NetworkResource.communities({id: $scope.network.id})          
              ]

            parent: angular.element(document.body),
            clickOutsideToClose:true
          })
      ]
      link: ($scope, $element) ->
        controller = $element.parent().controller()
        $scope.network.listElement = $element[0].parentNode
        originalHeight = undefined
        
    

        # $scope.editNetworks = ->
        #   controller.editNetworks  




   
        return

    }
]
