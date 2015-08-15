(function() {
  var ConversationState, app;

  ConversationState = (function() {
    function ConversationState() {}

    ConversationState.prototype.conversations = [];

    ConversationState.prototype.conversation = [];

    return ConversationState;

  })();

  app = angular.module("MeApp");

  app.factory("ConversationState", [
    function() {
      return new ConversationState;
    }
  ]);

}).call(this);
