calculateRank = (s, created_at) ->
  order = Math.log(Math.max(Math.abs(s), 1), 10)
  sign = undefined
  if s > 0
    sign = 1
  else if s < 0
    sign = -1
  else
    sign = 0
  seconds = created_at - 1134028003
  Math.floor order + (sign * seconds / 45000), 7
module.exports.calculateRank = calculateRank