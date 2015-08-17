#common directives used by all 3 apps

app = angular.module("Chutter")

app.directive 'post', ["MediaControls", "PostResource", "Page", "audio", "$document", (MediaControls, PostResource, Page, audio, $document) ->
  restrict: "E"
  scope: 
    post: "="
    postIndex: "="

  templateUrl: "../app/partials/shared/post.html"

  link: ($scope, element, attrs) ->
    $scope.post.elements = {}
    $scope.post.elements["post"] = element[0]
    $scope.post.toggled = false
    _.each element[0].children, (child) ->
      $scope.post.elements[child.className] = child
    if $scope.post.media.length > 0
      $scope.post.currentMedia = $scope.post.media[0]
    else
      $scope.post.currentMedia = {format: "body", body: $scope.post.body}
    
    $scope.post.elements.postcontent = $scope.post.elements.main.children[0]
    $scope.post.elements.middle      = $scope.post.elements.main.children[1] 
      
    if $scope.post.currentMedia
      $scope.post.elements.postcontent.style.backgroundImage = "url("+$scope.post.currentMedia.thumbnail_link+")"
      $scope.post.elements.postcontent.style.backgroundSize = "cover"
      if $scope.post.currentMedia.format is "music"
        $scope.post.audio = new audio("#{scope.post.currentMedia.stream_link}?client_id=d26dfbcb4ff9b9c8e712bcbcc37db120")

    $scope.$watch "post.zoomValue", (newVal, oldVal) ->
      if newVal and newVal != oldVal
        if newVal is 0
          newVal = 1
        val = newVal/10
        $scope.post.elements.postcontent.style.cssText +=  
          "transform: scale(#{val});-webkit-transform: scale(#{val});-moz-transform: scale(#{val});"
        $scope.post.elements.middle.style.cssText += 
          "transform: scale(#{1-val});-webkit-transform: scale(#{1-val});-moz-transform: scale(#{1-val});"
        $scope.setXTranslations()
        if $scope.post.currentMedia.format != "video" and (newVal > 1 and (!oldVal or oldVal <= 1))
          #children[0] is always the image tag since we use ng-if to toggle between media types
          #this is needed in order to translate the ancestor divs by an additional amount since the
          #image will take up an unpredictable amount of vertical space.
          $scope.post.elements.postcontent.children[0].onload = () ->
            setTimeout () ->
              $scope.$apply () -> 
                $scope.setXTranslations()
            , 350  
    
    $scope.$watch "post.toggled", (newVal) ->
        if newVal is true
          # mdContent = document.getElementById("content")
          #todo if mobile
          # mdContent.scrollTop = $scope.post.elements.post.offsetTop - (mdContent.clientHeight/3)
          if $scope.post.audio
            $scope.post.audio.play()
        else if newVal is false and $scope.post.audio
          $scope.post.audio.pause()

    $scope.setXTranslations = () ->
      #check if it's an image
      #then check if the image tag is in dom (will be for values > 3)
      #check if image is finshed loading, if not, we can assume the lo-res version is still being shown
      if $scope.post.currentMedia.format != "video" and $scope.post.zoomValue > 1 and $scope.post.elements.postcontent.children[0].complete
        xTranslation = ($scope.post.elements.postcontent.children[0].offsetHeight * ($scope.post.zoomValue/10)) - 100
      else
        xTranslation = ($scope.post.elements.postcontent.offsetHeight * ($scope.post.zoomValue/10)) - 100
      $("#active-post ~ post").unwrap()
      $("#active-post ~ post").wrapAll "<div class='new-stuff' />"
      elm = $(".new-stuff")
      elm[0].style.cssText += 
        "transform: translateY(#{xTranslation}px);-webkit-transform: translateY(#{xTranslation}px);-moz-transform: translateY(#{xTranslation}px);"
  
      # targets = Page.posts
      # _.each(targets.slice(scope.postIndex+1), (target) -> 
      #   if target.elements && target.elements.post


    $scope.post.updateVote = (vote) ->
      if $scope.post.vote == vote 
        vote = 0
      $scope.post.vote = vote
      PostResource.vote({id: $scope.post.id, vote: vote}) 

    $scope.post.toggleSave = () ->
      if $scope.user and $scope.user.id
        if $scope.post.saved
          $scope.post.saved = false
          PostResource.unsave({id: $scope.post.id})
        else
          $scope.post.saved = true
          PostResource.save({id: $scope.post.id})
      else
        $scope.$emit ('auth:show-signin')
 
    $scope.post.toggle = (post) ->
      preferredScaleValue = if $scope.post.currentMedia.format is "music" then 4 else 5
      #unzoom the zoomed post
      if Page.selectedPost is $scope.post
        if Page.selectedPost.zoomValue != 1
          Page.selectedPost.zoomValue = 1
          Page.selectedPost.toggled = false
          $("#active-post ~ post").unwrap()

          $scope.post.elements.post.id = ""

        
        else
          Page.selectedPost.zoomValue = preferredScaleValue
          Page.selectedPost.toggled = true
          
          $scope.post.elements.post.id = "active-post"

      else 
        #otherwise unzoom other post
        if Page.selectedPost
          Page.selectedPost.zoomValue = 1
          Page.selectedPost.toggled = false
          $("#active-post ~ post").unwrap()

          $scope.post.elements.post.id = ""

          _.defer () ->
              $scope.post.zoomValue = preferredScaleValue
              $scope.$apply()
          Page.selectedPost = $scope.post
          Page.selectedPost.toggled = true
          $scope.post.elements.post.id = "active-post"


        else
          Page.selectedPost = $scope.post
          Page.selectedPost.zoomValue = preferredScaleValue
          Page.selectedPost.toggled = true
          $scope.post.elements.post.id = "active-post"


  
 

  controller: ["$scope", "$rootScope", "$mdBottomSheet", ($scope, $rootScope, $mdBottomSheet) ->
      $scope.user = $rootScope.user

      $scope.moderate = () ->
        if $scope.user.moderator
          $mdBottomSheet.show({
            templateUrl: '../app/partials/shared/modSheet.html'
            #has to have leading digit on id
            parent: "#posts"
            disableParentScroll: true
            locals:
              entityable: $scope.post
              entityableType: "post"
            controller: "modSheetCtrl"
          })
      $scope.report = () ->
        $mdBottomSheet.show({
          templateUrl: '../app/partials/shared/reportSheet.html'
          #has to have leading digit on id
          parent: "#posts"
          disableParentScroll: true
          locals:
            entityable: $scope.post
            entityableType: "post"
          # controller: "modSheetCtrl"
        })

  
  ]
]


app.directive 'comment', ["$compile", "$mdBottomSheet", "CommentResource", ($compile, $mdBottomSheet, CommentResource) ->
  restrict: "E"
  scope: 
    comment: "="
    parent: "="
  link: ($scope, $element) ->
    #apparently stack overflow thinks this is the best way to tell if the object property is an array or object literal
    #redis cjson.encode returns nested tables (from lua) as json object literals, when they should be arrays. depending
    #on the severity of this, we may need to move this into a more general approach
    unless Object.prototype.toString.call( $scope.comment.children ) is '[object Array]'
      $scope.comment.children = []
    if $scope.comment && $scope.comment.children.length > 0
      $compile('<comment class="child" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="comment" comment="child"></comment>') $scope, (cloned, scope) ->
         $element.append(cloned) 
    $scope.comment.elements = {}
    $scope.comment.element = $element[0]
    _.each $element[0].children, (child) ->
      $scope.comment.elements[child.className] = child
    $scope.offsetTop = $scope.comment.element.offsetTop
    $scope.offsetLeft = $scope.comment.element.offsetLeft
    $scope.comment.childIds = _.map $scope.comment.children, (child) ->
      return "c#{child.path}"

    $scope.toggle = ->
      if $scope.comment.open
        $scope.comment.open = false
        window.requestAnimationFrame () ->
          $scope.comment.elements.main.className = "main active"
          $scope.comment.elements.collapsed.className = "collapsed active"
          _.each $scope.comment.childIds, (id) ->
            document.getElementById(id).className = "ng-scope ng-isolate-scope shrunk"
          $scope.comment.element.style.cssText = "height: 35px;"

      else 
        $scope.comment.open = true
        window.requestAnimationFrame () ->
          $scope.comment.element.style.cssText = ""
          $scope.comment.elements.main.className = "main"
          $scope.comment.elements.collapsed.className = "collapsed"
          _.each $scope.comment.childIds, (id) ->
            document.getElementById(id).className = "ng-scope ng-isolate-scope"

    $scope.comment.updateVote = (vote) -> 
      if $scope.comment.vote == vote 
        vote = 0
      $scope.comment.vote = vote
      CommentResource.vote({id: $scope.comment.id, vote: vote}) 
    
    $scope.reply = () ->
      $mdBottomSheet.show({
        templateUrl: '../app/partials/main/comments/replyPanel.html'
        parent: "#content"
        clickOutsideToClose: true
        preserveScope: true
        disableParentScroll: true
        controller: "replyCtrl"
        scope: $scope
      })
  templateUrl: "../app/partials/shared/comments/comment.html"
]  
 


app.directive "mediaControls", ["MediaControls", (MediaControls) ->
  restrict: "E"
  templateUrl: "../app/partials/main/mediaPlayer.html"
  link: (scope, element, attrs) ->
    MediaControls.element = element[0]
  controller: ["$scope", "MediaControls", ($scope, MediaControls) ->
    $scope.mediaControls = MediaControls


  ]
]
