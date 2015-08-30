app = angular.module("MeApp")

app.controller "conversationContentCtrl", ["$stateParams", "ConversationResource", "$scope", "Conversation", ($stateParams, ConversationResource, $scope, Conversation) ->
  $scope.conversation = Conversation
  

  $scope.reply = () ->
    ConversationResource.reply({id: $stateParams.id, body: $scope.replyText}).$promise.then () ->
      $scope.conversationState.conversation.push({body: $scope.replyText, username: $scope.user.username, other_participant: false})


]

app.controller "conversationListCtrl", ["$scope", "Conversations", "ConversationResource", ($scope, Conversations, ConversationResource) ->
  $scope.conversations = Conversations

]

app.controller "conversationComposeCtrl", ["$scope", "ConversationResource", "$state", ($scope, ConversationResource, $state) ->
  $scope.newConversation =
    recipient_username: ""
    messages_attributes: [
      {body: ""}
    ]
  $scope.submit = () ->
    ConversationResource.save({conversation: $scope.newConversation}).$promise.then (data) ->
      $state.transitionTo("home.conversations.conversation", {id: data.id}, {reload: true})
      
]