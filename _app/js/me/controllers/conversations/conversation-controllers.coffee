app = angular.module("MeApp")

app.controller "conversationContentCtrl", ["$stateParams", "ConversationResource", "$scope", "Conversation", "Messages", ($stateParams, ConversationResource, $scope, Conversation, Messages) ->
  $scope.conversation = Conversation.conversation
  $scope.messages = Messages

  if $scope.conversation.recipient_name == $scope.user.username
    $scope.conversation.otherUser = $scope.conversation.sender_name
  else
    $scope.conversation.otherUser = $scope.conversation.recipient_name

  $scope.reply = () ->
    ConversationResource.reply({id: $stateParams.id, body: $scope.replyText}).$promise.then () ->
      $scope.messages.push({body: $scope.replyText, username: $scope.user.username, other_participant: false})

]

app.controller "conversationListCtrl", ["$scope", "Conversations", ($scope, Conversations) ->
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