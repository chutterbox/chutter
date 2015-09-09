'use strict'

class Paginator
  offset: 26
  ended: false
  current_sort:  "hot"
  loading: false
  start_fetch: () ->
    @loading = true
  finish_fetch: (length) ->
    if length < 25
      @ended = true
    @loading = true
  reset: (current_sort = "hot") ->
    @offset = 26
    @ended  = false
    @current_sort   = current_sort
    @loading = false

class Page
  title: ""
  scope: ""
  community: 
    permitted_formats_list: []
  network: 
    communities: []
  posts: []
  paginator: new Paginator

  


class MediaControls
  post: {}
  element: {}
  currentMedia: {}
  initialize: (post) ->
    @post = post
    @media = post.media
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

app.factory "WrapperDiv", [ ->
  () -> 
    div = document.createElement("div")
    div.id = "under-active-post-wrapper"
    return div
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