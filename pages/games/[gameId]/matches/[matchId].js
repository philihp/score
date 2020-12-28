import React from 'react'
import { flatten, map, keys } from 'ramda'
import database from '../../../../lib/database'

const MatchId = ({ game, match }) => (
  <>
    <div>Game: {game.id}</div>
    <div>Match: {JSON.stringify(match)}</div>
  </>
)

export const getStaticProps = async ({ params: { gameId, matchId } }) => {
  const game = database.games[gameId]
  const match = game.matches[matchId]
  return { props: { game, match } }
}

const parameterize = (gameId) => (matchId) => ({
  params: { gameId, matchId },
})

export const getStaticPaths = async () => ({
  paths: flatten(
    map(
      (g) => map(parameterize(g), keys(database.games[g].matches)),
      keys(database.games)
    )
  ),
  fallback: false,
})

export default MatchId
