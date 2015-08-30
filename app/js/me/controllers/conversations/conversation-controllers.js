(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("conversationContentCtrl", [
    "$stateParams", "ConversationResource", "$scope", "Conversation", function($stateParams, ConversationResource, $scope, Conversation) {
      $scope.conversation = Conversation;
      return $scope.reply = function() {
        return ConversationResource.reply({
          id: $stateParams.id,
          body: $scope.replyText
        }).$promise.then(function() {
          return $scope.conversationState.conversation.push({
            body: $scope.replyText,
            username: $scope.user.username,
            other_participant: false
          });
        });
      };
    }
  ]);

  app.controller("conversationListCtrl", [
    "$scope", "Conversations", "ConversationResource", function($scope, Conversations, ConversationResource) {
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
