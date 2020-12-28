const fs = require('fs')
const glob = require('glob').sync
const {
  compose,
  pipe,
  map,
  reduce,
  filter,
  where,
  equals,
  mergeAll,
  sortBy,
  view,
  lensPath,
  prop,
  toPairs,
  fromPairs,
  reverse,
} = require('ramda')
const { ordinal } = require('openskill')
const reduceRating = require('./reduce-rating')

const forGame = (matches) => (game) =>
  sortBy(prop('updatedAt'), filter(where({ game: equals(game.id) }))(matches))

const toIdMappedObject = pipe(
  map((player) => ({ [player.id]: player })),
  mergeAll
)

// -------------------------
// Load JSON files into DATA
// -------------------------

const reconstitute = (matches) =>
  pipe(
    glob,
    map(fs.readFileSync),
    map(JSON.parse),
    map((record) => ({
      ...record,
      matches: matches(record),
    })),
    toIdMappedObject
  )
const matches = pipe(
  glob,
  map(fs.readFileSync),
  map(JSON.parse)
)('public/matches/**/*.json', { ignore: ['**/match.schema.json'] })

const players = pipe(
  glob,
  map(fs.readFileSync),
  map(JSON.parse),
  toIdMappedObject
)('public/players/**/*.json')

const data = {
  players,
  matches: toIdMappedObject(matches),
  games: reconstitute(forGame(matches))('public/games/**/*.json'),
}

// -----------
// Run Ratings
// -----------

const gameRatings = map(
  (game) => reduce(reduceRating, {})(game.matches),
  data.games
)

const sortedRankings = (ranks) => {
  const o = pipe(
    map((r) => ({ ...r, ordinal: ordinal(r.rating) })),
    toPairs,
    compose(sortBy, view, lensPath)([1, 'ordinal']), // i, too, hate me for writing this.
    reverse
  )(ranks)
  return o
}

const out = {
  // players: data.players,
  // matches: data.matches,
  games: map(
    (g) => ({
      ...g,
      players: fromPairs(sortedRankings(gameRatings[g.id])),
      matches: toIdMappedObject(g.matches),
    }),
    data.games
  ),
}

fs.writeFileSync('./public/ratings.json', JSON.stringify(out, undefined, 2))
