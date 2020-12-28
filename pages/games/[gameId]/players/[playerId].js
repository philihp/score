import React from 'react'
import { flatten, map, keys } from 'ramda'
import database from '../../../../lib/database'

const PlayerId = ({ game, player }) => (
  <>
    <div>Game: {game.id}</div>
    <div>Player: {JSON.stringify(player)}</div>
  </>
)

export const getStaticProps = async ({ params: { gameId, playerId } }) => {
  const game = database.games[gameId]
  const player = game.players[playerId]
  return { props: { game, player } }
}

const parameterize = (gameId) => (playerId) => ({
  params: { gameId, playerId },
})

export const getStaticPaths = async () => ({
  paths: flatten(
    map(
      (g) => map(parameterize(g), keys(database.games[g].players)),
      keys(database.games)
    )
  ),
  fallback: false,
})

export default PlayerId
