const { sortBy, map, fromPairs, zip, flatten } = require('ramda')
const { rate, rating } = require('openskill')

module.exports = (ratings, match) => {
  const players = map(
    (p) => p.player,
    sortBy((p) => -p.score, match.results)
  )
  const oldRatings = map((p) => [ratings[p] || rating()], players)
  const newRatings = rate(oldRatings)
  return { ...ratings, ...fromPairs(zip(players, flatten(newRatings))) }
}
