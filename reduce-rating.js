const {
  sortBy,
  map,
  zip,
  flatten,
  over,
  lensProp,
  reduce,
  compose,
} = require('ramda')
const { rate, rating, ordinal } = require('openskill')

const updateRating = (r, match) => (oldRating) => ({
  rating: { ...r, ordinal: ordinal(r) },
  history: [
    ...(oldRating?.history || []),
    [
      match.id,
      {
        ...(oldRating?.rating || { ...rating(), ordinal: ordinal(rating()) }),
      },
    ],
  ],
})

module.exports = (ratings, match) => {
  const players = map(
    (p) => p.player,
    sortBy((p) => -p.score, match.results)
  )
  const oldRatings = map((p) => [ratings[p]?.rating || rating()], players)
  const accumulate = reduce(
    (accumulator, [p, r]) =>
      over(lensProp(p), updateRating(r, match), accumulator),
    ratings
  )
  return compose(accumulate, zip(players), flatten, rate)(oldRatings)
}
