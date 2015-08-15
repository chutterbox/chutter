class ConversationState
  conversations: []
  conversation: []

      
app = angular.module("MeApp")
app.factory "ConversationState", [ ->
  new ConversationState
]
