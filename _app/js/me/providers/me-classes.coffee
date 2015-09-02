class ConversationState
  conversations: []
  conversation: []
  messages: []

      
app = angular.module("MeApp")
app.factory "ConversationState", [ ->
  new ConversationState
]
