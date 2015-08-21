app = angular.module("MainApp")

app.directive 'menuLink', ->
  {
    scope: 
      community: '='
      network: "="
    templateUrl: '../app/partials/main/menu/link.html'
    controller: ["$stateParams", "Page", "$scope", ($stateParams, Page, $scope) ->

    ]
  }

app.directive 'menuToggle', ['$timeout', '$state', 'Page', ($timeout, $state, Page) ->
    {
      scope: 
        network: '='
      templateUrl: '../app/partials/main/menu/toggle.html'
      controller: ["$mdDialog", "$scope", ($mdDialog, $scope) ->
        $scope.editCommunity = (ev) ->
          $mdDialog.show({
            controller: "communityEditCtrl",
            templateUrl: '/partials/main/communityEdit.html',
            resolve: 
              List: ["NetworkResource", (NetworkResource) ->
                NetworkResource.communities({id: $scope.network.id})          
              ]

            parent: angular.element(document.body),
            clickOutsideToClose:true
            targetEvent: ev
          })
      ]
      link: ($scope, $element) ->
        $scope.network.menuListItem = $element[0].parentNode
        $scope.network.menuToggle = $element[0]
        originalHeight = undefined
        

        $scope.network.close = () ->
          $scope.network.menuListItem.className = ""
          $scope.network.toggled = false
        
        $scope.network.open = () ->
          $scope.network.menuListItem.className = "active"
          $scope.network.toggled = true

        $scope.network.toggle = () -> 
          if $scope.network.toggled 
            $scope.network.close()
            if Page.selectedNetwork
              Page.selectedNetwork.close()
              Page.selectedNetwork = undefined 
          
          else
            console.log Page.selectedNetwork
            if Page.selectedNetwork
              Page.selectedNetwork.close()
            $scope.network.open()
            Page.selectedNetwork = $scope.network

        # $scope.editNetworks = ->
        #   controller.editNetworks  




   
        return

    }
]
