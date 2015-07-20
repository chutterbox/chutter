getRandomInt = (min, max) ->
  Math.floor(Math.random() * (max - min + 1)) + min

exports.randomString = (len) ->
  buf = []
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  charlen = chars.length
  i = 0

  while i < len
    buf.push chars[getRandomInt(0, charlen - 1)]
    ++i
  buf.join ""