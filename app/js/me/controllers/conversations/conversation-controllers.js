(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("conversationContentCtrl", [
    "$stateParams", "ConversationResource", "$scope", "Conversation", "Messages", function($stateParams, ConversationResource, $scope, Conversation, Messages) {
      $scope.conversation = Conversation.conversation;
      $scope.messages = Messages;
      if ($scope.conversation.recipient_name === $scope.user.username) {
        $scope.conversation.otherUser = $scope.conversation.sender_name;
      } else {
        $scope.conversation.otherUser = $scope.conversation.recipient_name;
      }
      return $scope.reply = function() {
        return ConversationResource.reply({
          id: $stateParams.id,
          body: $scope.replyText
        }).$promise.then(function() {
          return $scope.messages.push({
            body: $scope.replyText,
            username: $scope.user.username,
            other_participant: false
          });
        });
      };
    }
  ]);

  app.controller("conversationListCtrl", [
    "$scope", "Conversations", function($scope, Conversations) {
      return $scope.conversations = Conversations;
    }
  ]);

  app.controller("conversationComposeCtrl", [
    "$scope", "ConversationResource", "$state", function($scope, ConversationResource, $state) {
      $scope.newConversation = {
        recipient_username: "",
        messages_attributes: [
          {
            body: ""
          }
        ]
      };
      return $scope.submit = function() {
        return ConversationResource.save({
          conversation: $scope.newConversation
        }).$promise.then(function(data) {
          return $state.transitionTo("home.conversations.conversation", {
            id: data.id
          }, {
            reload: true
          });
        });
      };
    }
  ]);

}).call(this);
