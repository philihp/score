import React from 'react'
import { flatten, map, keys } from 'ramda'
import Link from 'next/link'
import database from '../../../../lib/database'
import Float from '../../../../components/float'

const PlayerId = ({ game, player }) => (
  <>
    <Link href={`/games/${game.id}`}>
      <a>
        <h2>{game.id}</h2>
      </a>
    </Link>
    <Link href={`/games/${game.id}/players/${player.id}`}>
      <a>
        <h2>{player.id}</h2>
      </a>
    </Link>
    <table>
      <thead>
        <th>Rating (Ordinal)</th>
        <th>Mu (Mean)</th>
        <th>Sigma (Variance)</th>
        <th>Match</th>
      </thead>
      <tbody>
        {map(
          ([matchId, rating]) => (
            <tr>
              <td>
                <Float n={rating.ordinal} />
              </td>
              <td>
                <Float n={rating.mu} />
              </td>
              <td>
                <Float n={rating.sigma} />
              </td>
              <td>
                <Link href={`/games/${game.id}/matches/${matchId}`}>
                  <a>{matchId}</a>
                </Link>
              </td>
            </tr>
          ),
          player.history
        )}
        <tr>
          <td>
            <Float n={player.rating.ordinal} />
          </td>
          <td>
            <Float n={player.rating.mu} />
          </td>
          <td>
            <Float n={player.rating.sigma} />
          </td>
        </tr>
      </tbody>
    </table>
  </>
)

export const getStaticProps = async ({ params: { gameId, playerId } }) => {
  const game = database.games[gameId]
  const player = game.players[playerId]
  return { props: { game, player: { id: playerId, ...player } } }
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
