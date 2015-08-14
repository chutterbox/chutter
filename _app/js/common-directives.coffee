#common directives used by all 3 apps

app = angular.module("Chutter")

app.directive 'post', ["MediaControls", "PostResource", "Page", "audio", "$document", (MediaControls, PostResource, Page, audio, $document) ->
  restrict: "E"
  scope: 
    post: "="
    postIndex: "="

  templateUrl: "../app/partials/shared/post.html"

  link: (scope, element, attrs) ->
    console.log scope.post
    console.log scope.post
    console.log scope.post
    console.log element
    scope.post.elements = {}
    scope.post.elements["post"] = element[0]
    scope.post.toggled = false
    _.each element[0].children, (child) ->
      scope.post.elements[child.className] = child
    if scope.post.media.length > 0
      scope.post.currentMedia = scope.post.media[0]
    else
      scope.post.currentMedia = {format: "body", body: scope.post.body}
    scope.post.elements.postcontent = scope.post.elements.main.children[0]
    scope.post.elements.media = scope.post.elements.postcontent.children[1]
    scope.post.elements.middle = scope.post.elements.main.children[1] 
    _.defer () ->
      scope.ratioHeight = (scope.post.elements.postcontent.offsetWidth)*(3/4) - 80
      scope.post.elements.postcontent.style.height = "#{scope.ratioHeight}px"
      
    if scope.post.currentMedia
      scope.post.elements.media.style.backgroundImage = "url("+scope.post.currentMedia.thumbnail_link+")"
      scope.post.elements.media.style.backgroundSize = "cover"
      if scope.post.currentMedia.format is "music"
        scope.post.audio = new audio("#{scope.post.currentMedia.stream_link}?client_id=d26dfbcb4ff9b9c8e712bcbcc37db120")

    scope.$watch "post.zoomValue", (newVal, oldVal) ->
      if newVal and newVal != oldVal
        if newVal is 0
          newVal = 1
        val = newVal/10
        scope.post.elements.postcontent.style.cssText +=  
          "transform: scale(#{val});-webkit-transform: scale(#{val});-moz-transform: scale(#{val});"
        scope.post.elements.middle.style.cssText += 
          "transform: scale(#{1-val});-webkit-transform: scale(#{1-val});-moz-transform: scale(#{1-val});"
        scope.setXTranslations()
        if scope.post.currentMedia.format != "video" and (newVal > 1 and (!oldVal or oldVal <= 1))
          #children[0] is always the image tag since we use ng-if to toggle between media types
          #this is needed in order to translate the ancestor divs by an additional amount since the
          #image will take up an unpredictable amount of vertical space.
          scope.post.elements.media.children[0].onload = () ->
            setTimeout () ->
              scope.$apply () -> 
                scope.setXTranslations()
            , 350  
    
    scope.$watch "post.toggled", (newVal) ->
        if newVal is true
          mdContent = document.getElementById("content")
          #todo if mobile
          mdContent.scrollTop = scope.post.elements.post.offsetTop - (mdContent.clientHeight/3)
          if scope.post.audio
            scope.post.audio.play()
        else if newVal is false and scope.post.audio
          scope.post.audio.pause()


    scope.setXTranslations = () ->
      #check if it's an image
      #then check if the image tag is in dom (will be for values > 3)
      #check if image is finshed loading, if not, we can assume the lo-res version is still being shown
      if scope.post.currentMedia.format != "video" and scope.post.zoomValue > 1 and scope.post.elements.media.children[0].complete
        xTranslation = (scope.post.elements.media.children[0].offsetHeight * (scope.post.zoomValue/10)) - 100
      else
        xTranslation = (scope.post.elements.postcontent.offsetHeight * (scope.post.zoomValue/10)) - 100

      targets = Page.posts
      _.each(targets.slice(scope.postIndex+1), (target) -> 
        if target.elements && target.elements.post
          target.elements.post.style.cssText += 
            "transform: translateY(#{xTranslation}px);-webkit-transform: translateY(#{xTranslation}px);-moz-transform: translateY(#{xTranslation}px);"
      )  

    scope.post.updateVote = (vote) ->
      if scope.post.vote == vote 
        vote = 0
      scope.post.vote = vote
      PostResource.vote({id: scope.post.id, vote: vote}) 
 
    scope.post.toggle = (post) ->
      preferredScaleValue = if scope.post.currentMedia.format is "music" then 4 else 5
      #unzoom the zoomed post
      if Page.selectedPost is scope.post
        if Page.selectedPost.zoomValue != 1
          Page.selectedPost.zoomValue = 1
          Page.selectedPost.toggled = false
        
        else
          Page.selectedPost.zoomValue = preferredScaleValue
          Page.selectedPost.toggled = true
      else 
        #otherwise unzoom other post
        if Page.selectedPost
          Page.selectedPost.zoomValue = 1
          Page.selectedPost.toggled = false
          _.defer () ->
              scope.post.zoomValue = preferredScaleValue
              scope.$apply()
          Page.selectedPost = scope.post
          Page.selectedPost.toggled = true

        else
          Page.selectedPost = scope.post
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


app.directive "mediaControls", ["MediaControls", (MediaControls) ->
  restrict: "E"
  templateUrl: "../app/partials/main/mediaPlayer.html"
  link: (scope, element, attrs) ->
    MediaControls.element = element[0]
  controller: ["$scope", "MediaControls", ($scope, MediaControls) ->
    $scope.mediaControls = MediaControls


  ]
]
