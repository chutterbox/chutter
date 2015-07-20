# Filters
'use strict'

app = angular.module('MainApp')

app.filter "gtThreshold", ->
  (input) ->
    if parseInt(input.toString().replace(/,/g, '')) > 10
      input + " plays"

app.filter "tags", ->
  (input) ->
    input.replace(/@(\S*)/g,'<a href=search?q=$1>@$1</a>')

app.filter "oneAtATime", ->
  (input, start) ->
    start = +start
    input.slice start, start + 1

app.filter "stripEmail", ->
  (input) ->
    index = input.indexOf("@")
    input.slice 0, index

app.filter "truncate", ->
  (text, length, end) ->
    length = 10  if isNaN(length)
    end = "..."  if end is `undefined`
    if text && (text.length <= length or text.length - end.length <= length)
      text
    else
      String(text).substring(0, length - end.length) + end

app.filter 'nospace', ->
  (value) ->
    if !value then '' else value.replace(RegExp(' ', 'g'), '')