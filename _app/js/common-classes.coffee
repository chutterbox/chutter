'use strict'

class Page
  title: ""
  scope: ""
  community: 
    permitted_formats_list: []
  network: 
    communities: []
  posts: []
  
  #this shit should be in a nav class or data structure
  selectSection: (section) ->
    @selectedSection = section
  toggleSelectSection: (section) ->
    if section is @selectedSection
      @selectedSection = null
    else
      @selectedSection = section 
    # section.open = !section.open
  isSectionSelected: (section) ->
    @selectedSection is section

class MediaPlayer
  post: {}
  height: 125 * 3
  width: 167 * 3
  element: {}
  currentMedia: {}
  initialize: (post) ->
    @post = post
    @media = post.media
    @currentMedia = @media[0]
  show: () ->
    @element.className = ""
    @element.style.cssText += "top: #{@post.elements.post.offsetTop}px;"
    @element.className = "active"
  close: () ->
    @post.toggle()
    @element.className = ""  

app = angular.module("Chutter")
app.factory "Page", [ ->
  new Page
]
app.factory "MediaPlayer", [ ->
  new MediaPlayer
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