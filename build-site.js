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
  any,
  mergeAll,
  sortBy,
  view,
  lensPath,
  prop,
  toPairs,
  reverse,
} = require('ramda')
const { ordinal } = require('openskill')
const reduceRating = require('./reduce-rating')

const forPlayer = (matches) => (player) =>
  filter((m) => any((p) => p.id === player.id, m.players), matches)

const forGame = (matches) => (game) =>
  sortBy(prop('updatedAt'), filter(where({ game: equals(game.id) }))(matches))

const reconstitute = (matches) =>
  pipe(
    glob,
    map(fs.readFileSync),
    map(JSON.parse),
    map((record) => ({
      ...record,
      matches: matches(record),
    })),
    map((record) => ({ [record.id]: record })),
    mergeAll
  )
const matches = pipe(
  glob,
  map(fs.readFileSync),
  map(JSON.parse)
)('matches/**/*.json', { ignore: ['**/match.schema.json'] })

const data = {
  players: reconstitute(forPlayer(matches))('players/**/*.json'),
  games: reconstitute(forGame(matches))('games/**/*.json'),
}

const gameRatings = map(
  (game) => reduce(reduceRating, {})(game.matches),
  data.games
)

const friendly = (float) => float.toFixed(3)

const friendlyRating = (r) => ({
  mu: friendly(r.mu),
  sigma: friendly(r.sigma),
  ordinal: friendly(r.ordinal),
})
const addFriendlyRating = ([name, r]) => [name, r, friendlyRating(r)]

const sortedRankings = (ranks) => {
  const o = pipe(
    map((r) => ({ ...r, ordinal: ordinal(r) })),
    toPairs,
    compose(sortBy, view, lensPath)([1, 'ordinal']), // i, too, hate me for writing this.
    reverse,
    map(addFriendlyRating)
  )(ranks)
  return o
}

const data2 = {
  ...data,
  games: map(
    (g) => ({ ...g, players: sortedRankings(gameRatings[g.id]) }),
    data.games
  ),
}

const createStubsForGame = (game) => {
  if (fs.existsSync(`./src/games/${game.id}.ejs`)) return
  fs.writeFileSync(`./src/games/${game.id}.ejs`, '')
}
map(createStubsForGame, data2.games)
fs.writeFileSync(
  './src/games/_data.json',
  JSON.stringify(data2.games, undefined, 2)
)

const createStubsForPlayer = (player) => {
  fs.writeFileSync(`./src/players/${player.id}.ejs`, '')
}
map(createStubsForPlayer, data2.players)
fs.writeFileSync(
  './src/players/_data.json',
  JSON.stringify(data2.players, undefined, 2)
)
