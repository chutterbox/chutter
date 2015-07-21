#common directives used by all 3 apps

app = angular.module("Chutter")

app.directive 'post', ["MediaPlayer", "PostResource", "Page", (MediaPlayer, PostResource, Page) ->
  restrict: "E"
  scope: 
    post: "="
    postIndex: "="

  templateUrl: "/partials/main/post.html"

  link: (scope, element, attrs) ->
    scope.resource = PostResource
    SCALE_CONST = 125 * 2.5
    scope.post.elements = {}
    scope.post.elements["post"] = element[0]
    scope.post.toggled = false
    _.each element[0].children, (child) ->
      scope.post.elements[child.className] = child
    
    scope.post.updateVote = (vote) ->
      if scope.post.vote == vote 
        vote = 0
      scope.post.vote = vote
      PostResource.vote({id: scope.post.id, vote: vote}) 


    scope.post.toggle = () ->
      MediaPlayer.initialize(scope.post)
      mdContent = document.getElementById("posts")
      #todo if mobile
      # mdContent.scrollTop = (scope.post.elements.post.offsetTop - ((mdContent.clientHeight / 2) - (SCALE_CONST / 2)))
      targets = Page.posts
      if scope.post.toggled
        i = 0
        scope.post.elements.media.className = "media unscale-media"
        scope.post.elements.middle.className = "middle unscale-middle"
        _.each(targets.slice(scope.postIndex), (target) -> 
          if target.elements && target.elements.post
            target.elements.post.style.cssText += "transform: translateY(0px);-webkit-transform: translateY(0px);"
        )
      else
        i = 0
        _.each(targets, (target) -> 
          if target.elements && target.elements.post
            if target.toggled
              target.elements.media.className = "media unscale-media"
              target.elements.middle.className = "middle unscale-middle"
            target.toggled = false
            if scope.postIndex < i 
              target.elements.post.style.cssText += "transform:translateY(#{SCALE_CONST}px); -webkit-transform:translateY(#{SCALE_CONST}px);"
            else
              target.elements.post.style.cssText += "transform:translateY(0px); -webkit-transform:translateY(0px);"
            i += 1
        )
        scope.post.elements.middle.className = "middle scale-middle"
        scope.post.elements.media.className = "media scale-media"
        MediaPlayer.show()
      scope.post.toggled = !scope.post.toggled
]


app.directive "mediaPlayer", ["MediaPlayer", (MediaPlayer) ->
  restrict: "E"
  templateUrl: "/partials/main/mediaPlayer.html"
  link: (scope, element, attrs) ->
    MediaPlayer.element = element[0]
  controller: ["$scope", "MediaPlayer", ($scope, MediaPlayer) ->
    $scope.mediaPlayer = MediaPlayer

  ]
]
