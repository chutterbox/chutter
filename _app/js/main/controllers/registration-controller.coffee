app = angular.module("MainApp")

app.controller "registrationCtrl", ["$scope", ($scope) ->

]


app.directive 'uniqueUsername', ["$q", "UserResource", ($q, UserResource) ->
  restrict: 'A'
  require: 'ngModel'
  link: (scope, element, attrs, ngModel) ->
    ngModel.$asyncValidators.unique = () ->
      deferred = $q.defer()
      console.log ngModel
      UserResource.user_exists({username: ngModel.$viewValue}, 
      () ->
        deferred.resolve()
      ,
      () ->
        deferred.reject()
      )
      return deferred.promise

  
  
]


app.controller "welcomeCtrl", ["$scope", "UserResource", "$auth", "$state", ($scope, UserResource, $auth, $state) ->
  $scope.user = 
    username: ""
    email: ""

  $scope.register = () ->
    $auth.submitRegistration($scope.user).then((resp) ->
      $state.transitionTo("register.interests")
    ).catch((resp) -> 
      $scope.serverErrors = _.uniq resp.data.errors.full_messages
      if resp.status is not 403
        $scope.unavailable = true
    )
]

app.controller "interestsCtrl", ["$scope", "UserResource", "$auth", "$state", "NetworkList", ($scope, UserResource, $auth, $state, NetworkList) ->

  $scope.networkList = NetworkList

]