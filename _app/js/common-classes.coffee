'use strict'

class Paginator
  offset: 26
  itemsLoaded: 25
  ended: false
  current_sort:  "hot"
  loading: false
  start_fetch: () ->
    @loading = true
  finish_fetch: (length) ->
    if length < 25
      @ended = true
    @offset += 25
    @loading = false
  reset: (current_sort = "hot") ->
    @offset = 26
    @ended  = false
    @current_sort   = current_sort
    @loading = false

class Page
  title: ""
  scope: ""
  communities: []
  networks: []
  cachedScrollTops: []
  community: 
    permitted_formats_list: []
  posts: []
  paginator: new Paginator

app = angular.module("Chutter")
app.factory "Page", [ ->
  new Page
]


app.factory "MediaPlayer", ["$document", "$mdMedia", "$mdBottomSheet", "$rootScope", "$templateRequest", "$compile", "$sce", ($document, $mdMedia, $mdBottomSheet, $rootScope, $templateRequest, $compile, $sce) ->
  class MPClass
    scope: $rootScope.$new()
    mediaPlayerContentJQElement: {} # the actual media player content, e.g. image, vid, etc..
    post: {}
    @scrollElement: $(".md-virtual-repeat-scroller") #can pass in custom element upon scroll if desired
    DESKTOP_MEDIA_PLAYER_HEIGHT: 457.5 #4:3 of 610 (the size of reddit's expando)
    MINI_DESKTOP_MEDIA_PLAYER_HEIGHT: 228.75 #4:3 of 610/2 (the size of reddit's expando)
    MINI_DESKTOP_MEDIA_PLAYER_WIDTH: 305 #4:3 of 610/2 (the size of reddit's expando)
    desktopMediaPlayerElement: $document[0].createElement('div')
    currentSrcElement: undefined #this is what is used to determine if there is a playing item right now, it gets set upon opening a media item
    scrollElement: {}
    
    constructor: () ->
      @desktopMediaPlayerElement.id = "desktopMediaPlayer"
      @desktopMediaPlayerElement.className += "md-whiteframe-z1" #add a whiteframe to it
      @scope.currentMedia = {} #the currently playing media
      @scope.media = [] #list of all the media for the media player, since posts can have multiple medium (media).
      angular.element(document.body).append(@desktopMediaPlayerElement)
      $templateRequest("../app/partials/shared/mediaPlayerContent.html").then (html) => 
        template = angular.element(html)
        @mediaPlayerContentJQElement = template
        $compile(@mediaPlayerContentJQElement)(@scope)

        
    toggle: (post, ev, customScrollElementClass) ->
      if @currentSrcElement && (ev.target.id is @currentSrcElement.id)
        @closeAllPlayers()
      else
        @open(post, ev, customScrollElementClass)
    
    openMiniDesktopMediaPlayer: _.throttle(() ->
        boundingRect = @desktopMediaPlayerElement.getBoundingClientRect()
        canvas = @scrollElement.width()
        translateXAmount = canvas - boundingRect.width + boundingRect.left 
        translateYAmount = boundingRect.top - 80
        @desktopMediaPlayerElement.style.transform = "translateX(#{translateXAmount}px) translateY(-#{translateYAmount}px) scale(0.5)"
        @desktopMediaPlayerElement.style.mozTransform = "translateX(#{translateXAmount}px) translateY(-#{translateYAmount}px) scale(0.5)"
        @desktopMediaPlayerElement.style.webkitTransform = "translateX(#{translateXAmount}px) translateY(-#{translateYAmount}px) scale(0.5)"
        @scrollElement.unbind('scroll') 

    , 50)
    open: (post, ev, customScrollElementClass) ->
      #set up scope for media player
      @closeAllPlayers()
      @scope.currentMedia = post.media[0]
      if @scope.currentMedia and @scope.currentMedia.format is "video"
        @scope.currentMedia.trusted_stream_link = $sce.trustAsResourceUrl(@scope.currentMedia.stream_link)
      @scope.media = @scope.media.concat(post.media)
      @scope.body = post.body
      @currentSrcElement = ev.target

      #decide upon the parent container in which to trigger the mini player on scroll
      if customScrollElementClass
        @scrollElement = $(".#{customScrollElement}")
      else
        @scrollElement = $(".md-virtual-repeat-scroller")
      #if desktop client
      if $mdMedia('gt-md')

        @desktopMediaPlayerElement.appendChild @mediaPlayerContentJQElement[0]
        #register a few click listners, probably not the best way of doing things, but scope got me confused
        $("#fill-button").click () =>
          @desktopMediaPlayerElement.className += " largeOpened"
        $("#close-button").click () =>
          @closeAllPlayers()
        if @scope.currentMedia and @scope.currentMedia.format is "video"
          #defer because ng-switch shows the element, so let stack clear
          @showProgress()
          _.defer () =>
            $("iframe").load () =>
              @hideProgress()
        if @scope.currentMedia and (@scope.currentMedia.format is "video" or @scope.currentMedia.format is "music")
          @scrollElement.scroll(() =>
            @openMiniDesktopMediaPlayer()
          )

        #compile the mediaplayercontent element with the scope and attatch to player
        computedHeight = ev.target.getBoundingClientRect().top + @DESKTOP_MEDIA_PLAYER_HEIGHT
        viewportHeight = (window.innerHeight || document.documentElement.clientHeight)
        targetTop = ev.target.getBoundingClientRect().top
        actualTop = ev.target.getBoundingClientRect().top
        #simply ensure that the element is in the viewport
        if computedHeight > viewportHeight
          actualTop = viewportHeight - @DESKTOP_MEDIA_PLAYER_HEIGHT
        @desktopMediaPlayerElement.style.top = "#{actualTop}px"
        @desktopMediaPlayerElement.style.left = "146px"
        @desktopMediaPlayerElement.className += " opened"


      else

        $mdBottomSheet.show({
          templateUrl: '/partials/shared/mediaPlayerSheet.html'
          controller: ["MediaPlayer", "$scope", (MediaPlayer, $scope) ->
            setTimeout () =>
              document.getElementById("mobileMediaPlayer").appendChild MediaPlayer.mediaPlayerContentJQElement[0]
            ,500
          ]
          disableParentScroll: true
          parent: angular.element(document.body)
          clickOutsideToClose: true
        })


    showProgress: () ->
      elm = document.getElementById("progress-place-holder")
      elm.style.display = "block" if elm
    hideProgress: () ->
      elm = document.getElementById("progress-place-holder")
      elm.style.display = "none" if elm

    closeAllPlayers: () ->
      console.log "hi"
      if $mdMedia('gt-md')
        @closeDesktopMediaPlayer()
      else
        @closeMobileMediaPlayer()
      @currentSrcElement = undefined
      @mediaPlayerContentJQElement.remove()

    closeDesktopMediaPlayer: () ->
      if @currentSrcElement
        @scrollElement.unbind('scroll')
        @desktopMediaPlayerElement.className = "md-whiteframe-z1" 
        @desktopMediaPlayerElement.style.transform = ""
        @desktopMediaPlayerElement.style.webkitTransform = ""
        @desktopMediaPlayerElement.style.mozTransform = ""

    closeMobileMediaPlayer: () ->
      $mdBottomSheet.hide().then () =>
        @currentSrcElement = undefined
  return new MPClass
]



app.factory "CommunityRule", [ ->
  return () ->
    {
      general: false
      posts: false
      comments: false
      ban: false
      removal: false
      discouraged: false
      category: ""
      detailed_explanation: ""
    }
]

app.factory "ActivityLogEntry", [ ->
  return () ->
    {
      rule_id: undefined
      detailed_explanation: ""
      entityable_user_id: undefined
    }
]