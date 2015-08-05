app = angular.module("MainApp")

app.directive 'menuLink', ->
  {
    scope: community: '='
    templateUrl: '../app/partials/main/menu/link.html'
    link: ($scope, $element) ->
      controller = $element.parent().controller()

      $scope.isSelected = ->
        controller.isSelected $scope.community

      $scope.focusSection = ->
        # set flag to be used later when
        # $locationChangeSuccess calls openPage()
        controller.autoFocusContent = true
        return

      return
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
        $ul = $element.find('ul')
        originalHeight = undefined
        
        $scope.isOpen = ->
          controller.isOpen $scope.network

        $scope.toggle = ->
          controller.toggleOpen $scope.network
          return

        $scope.editNetworks = ->
          controller.editNetworks  

        # if states are activated auto-expand
        # needs fixing up
        if $element.find("a").hasClass("active")
          $timeout (->
            $scope.toggle() 
          ), 100


        $scope.$watch $scope.isOpen, (open) ->
          $ul = $element.find('ul')

          getTargetHeight = ->
            `var targetHeight`
            targetHeight = undefined
            $ul.addClass 'no-transition'
            $ul.css 'height', ''
            targetHeight = $ul.prop('clientHeight')
            $ul.css 'height', 0
            $ul.removeClass 'no-transition'
            targetHeight

          targetHeight = if open then getTargetHeight() else 0

          $timeout (->
            $ul.css height: targetHeight + 'px'
          ), 0, false

        parentNode = $element[0].parentNode.parentNode.parentNode


   
        return

    }
]
