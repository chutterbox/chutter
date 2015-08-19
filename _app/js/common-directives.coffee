#common directives used by all 3 apps

app = angular.module("Chutter")

app.directive 'post', ["MediaControls", "PostResource", "Page", "audio", "WrapperDiv", (MediaControls, PostResource, Page, audio, WrapperDiv) ->
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
        $scope.post.audio = new audio("#{$scope.post.currentMedia.stream_link}?client_id=d26dfbcb4ff9b9c8e712bcbcc37db120")

    $scope.$watch "post.zoomValue", (newVal, oldVal) ->
      if newVal and newVal != oldVal
        if newVal is 0
          newVal = 1
        val = newVal/10
        #if the post is being zoomed up, beyond 2, wrap its ancestors in a div
        if $scope.post.toggled and oldVal != newVal
          $scope.wrapperDiv = new WrapperDiv
          elms = _.rest(Page.posts, $scope.postIndex + 1).map (post) ->
            $scope.wrapperDiv.appendChild(post.elements.post)
          $scope.post.elements.post.parentNode.insertBefore($scope.wrapperDiv, $scope.post.elements.post.nextSibling)

        window.requestAnimationFrame () ->
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
          #todo if mobile
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
      
      window.requestAnimationFrame () ->
        $scope.wrapperDiv.style.cssText += 
          "transform: translateY(#{xTranslation}px);-webkit-transform: translateY(#{xTranslation}px);-moz-transform: translateY(#{xTranslation}px);"
  


    $scope.post.updateVote = (vote) ->
      if $scope.post.vote == vote 
        vote = 0
      $scope.post.vote = vote
      PostResource.vote({id: $scope.post.id, vote: vote}) 

    $scope.post.toggleSave = () ->
      if $scope.user and $scope.user.id
        if $scope.post.saved
          $scope.post.saved = false
          PostResource.unsave_post({id: $scope.post.id})
        else
          $scope.post.saved = true
          PostResource.save_post({id: $scope.post.id})
      else
        $scope.$emit ('auth:show-signin')
 
    $scope.post.toggle = (post) ->
      preferredScaleValue = if $scope.post.currentMedia.format is "music" then 4 else 5
      #unzoom the zoomed post
      if Page.selectedPost is $scope.post
        if Page.selectedPost.zoomValue != 1
          Page.selectedPost.zoomValue = 1
          Page.selectedPost.toggled = false

        else
          Page.selectedPost.zoomValue = preferredScaleValue
          Page.selectedPost.toggled = true
      else 
        #otherwise unzoom other post
        if Page.selectedPost
          #wrap new post contents
          if Page.selectedPost.wrapperDiv
            range = document.createRange()
            range.selectNodeContents(Page.selectedPost.wrapperDiv)
            frag = range.extractContents()
            Page.selectedPost.wrapperDiv.parentNode.replaceChild(frag, Page.selectedPost.wrapperDiv)

          Page.selectedPost.toggled = false
          Page.selectedPost.zoomValue = 1
          $scope.post.zoomValue = preferredScaleValue
          Page.selectedPost = $scope.post
          Page.selectedPost.toggled = true


        else
          Page.selectedPost = $scope.post
          Page.selectedPost.zoomValue = preferredScaleValue
          Page.selectedPost.toggled = true


  
 

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
      $scope.comment.depth = $scope.comment.path.match(/[0-9]+/g).length
      switch $scope.comment.depth
        when 2,6,12 then $scope.comment.depthColor = 1
        when 3,7,13 then $scope.comment.depthColor = 2
        when 4,8,14 then $scope.comment.depthColor = 3
      $compile('<comment class="child" color="{{comment.depthColor}}" collapsed="false" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="comment" comment="child"></comment>') $scope, (cloned, scope) ->
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
          $scope.comment.element.setAttribute("collapsed", true)

      else 
        $scope.comment.open = true
        window.requestAnimationFrame () ->
          $scope.comment.element.setAttribute("collapsed", false)
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
        templateUrl: '../app/partials/shared/comments/replyPanel.html'
        clickOutsideToClose: true
        preserveScope: true
        disableParentScroll: true
        parent: angular.element(document.body)
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
