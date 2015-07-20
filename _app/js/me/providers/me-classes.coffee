class ConversationState
  conversations: []
  conversation: []

class NotificationView
  entity: {}
  element: {}
  initialize: (entity) ->
    #before setting the new notification ensure the old one is not active
    @entity.element.className = "" if @entity && @entity.element
    @entity = entity
    @notifications = entity.notifications
  show: () ->
    # 1 set the offset to the correct div
    if @element.className.indexOf("active") > -1
      timeoutVal = 0
    else
      timeoutVal = 0

    @element.className = ""

    setTimeout () =>
      @element.style.cssText += "top: #{@entity.offsetTop}px;"
      @element.className = "active"
      @entity.element.className = "active"
      # 2 load the content
      @entity.loading = true
      @entity.loading = false
      
      # scale up the content
      @element.className = "active"   

    , timeoutVal



  close: () ->
    @entity.element.className = "" if @entity && @entity.element
    @element.className = ""  

      
app = angular.module("MeApp")
app.factory "ConversationState", [ ->
  new ConversationState
]

app.factory "NotificationView", [ ->
  new NotificationView
]