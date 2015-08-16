'use strict'

class Page
  title: ""
  scope: ""
  community: 
    permitted_formats_list: []
  network: 
    communities: []
  posts: []
  

class MediaControls
  post: {}
  element: {}
  currentMedia: {}
  initialize: (post) ->
    @post = post
    @media = post.media
    console.log post.media
    @currentMedia = @media[0]
  show: () ->
    @element.className = ""
    @element.style.cssText += "top: #{@post.elements.post.offsetTop}px; left: #{@post.elements.vote.offsetWidth}px;"
    @element.className = "active"
  close: () ->
    @element.className = ""  

app = angular.module("Chutter")
app.factory "Page", [ ->
  new Page
]
app.factory "MediaControls", [ ->
  new MediaControls
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
      brief_description: ""
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