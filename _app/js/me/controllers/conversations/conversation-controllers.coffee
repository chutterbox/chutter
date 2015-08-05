app = angular.module("MeApp")

app.controller "conversationContentCtrl", ["$stateParams", "ConversationResource", "$scope", "ConversationState", "Conversation", ($stateParams, ConversationResource, $scope, ConversationState, Conversation) ->
  $scope.conversationState = ConversationState
  $scope.conversationState.conversation = Conversation

  $scope.reply = () ->
    ConversationResource.reply({id: $stateParams.id, body: $scope.replyText}).$promise.then () ->
      $scope.conversationState.conversation.push({body: $scope.replyText, username: $scope.user.username, other_participant: false})


]

app.controller "conversationListCtrl", ["$scope", "ConversationState", "Conversations", "ConversationResource", ($scope, ConversationState, Conversations, ConversationResource) ->
  $scope.conversationState = ConversationState
  $scope.conversationState.conversations = Conversations

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