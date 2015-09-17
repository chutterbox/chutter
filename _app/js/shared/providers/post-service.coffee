app = angular.module("Chutter")

#i needed some reusable utility methods for posts. it didn't make much sense to create a directive with all of this logic
#for each post, rather this service will be used to provide some utility methods to any scope that has some posts
app.factory "PostService", ["PostResource", "$stateParams", "MediaPlayer", "$mdBottomSheet", "$mdToast", "$rootScope", (PostResource, $stateParams, MediaPlayer, $mdBottomSheet, $mdToast, $rootScope) ->
  class PostService
    updateVote: (post, vote) ->
      if post.vote == vote 
        vote = 0
      post.vote = vote
      PostResource.vote({id: post.id, vote: vote}) 
    moderate: (post) ->
      if $rootScope.user && $rootScope.user.moderator
        $mdBottomSheet.show({
          templateUrl: '../app/partials/shared/modSheet.html'
          parent: angular.element(document.body)
          disableParentScroll: true
          locals:
            entityable: post
            entityableType: "post"
          controller: "modSheetCtrl"
        })

    report: (post) ->
      $mdBottomSheet.show({
        templateUrl: '../app/partials/shared/reportSheet.html'
        #has to have leading digit on id
        parent: angular.element(document.body)
        disableParentScroll: true
        locals:
          entityable: post
          entityableType: "post"
        controller: "reportSheetCtrl"
      }).then (reported) ->
        if reported
          $mdToast.show($mdToast.simple().content('Post Reported.'))
    toggleSave: (post) ->
      if $rootScope.user && $rootScope.user.id
        if post.saved
          post.saved = false
          PostResource.unsave_post({id: post.id})
        else
          post.saved = true
          PostResource.save_post({id: post.id})
      else
        $rootScope.$broadcast ('auth:show-signin')
    getBackgroundImage: (post) ->
      if post.media && post.media.length > 0 
        if post.media[0].thumbnail_link && post.media[0].thumbnail_link.length > 0
          "url(#{post.media[0].thumbnail_link})"
        else
          "url('/img/character.svg')"
      else
        "none"


  return new PostService

]