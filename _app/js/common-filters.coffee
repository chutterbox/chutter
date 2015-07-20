app = angular.module("Chutter")

app.filter "postSearch", -> 
  (input, start) ->
    console.log input, start



app.filter "tags", ->
  (input) ->
    input.replace(/@(\S*)/g,'<a href=search?q=$1>@$1</a>')

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