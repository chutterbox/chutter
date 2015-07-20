(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("conversationContentCtrl", [
    "$stateParams", "ConversationResource", "$scope", "ConversationState", "Conversation", function($stateParams, ConversationResource, $scope, ConversationState, Conversation) {
      $scope.conversationState = ConversationState;
      $scope.conversationState.conversation = Conversation;
      return $scope.reply = function() {
        return ConversationResource.reply({
          id: $stateParams.id,
          body: $scope.replyText
        });
      };
    }
  ]);

  app.controller("conversationsCtrl", [
    "$scope", "ConversationState", "Conversations", "ConversationResource", function($scope, ConversationState, Conversations, ConversationResource) {
      $scope.conversationState = ConversationState;
      return $scope.conversationState.conversations = Conversations;
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
