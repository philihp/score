import React from 'react'
import PropTypes from 'prop-types'
import {
  addIndex,
  map,
  prop,
  path,
  sortWith,
  keys,
  ascend,
  descend,
  toPairs,
} from 'ramda'
import Link from 'next/link'
import database from '../../lib/database'
import Float from '../../components/float'

const GameId = ({ id, name, matches, players }) => (
  <div>
    <Link href={`/games/${id}`}>
      <a>
        <h2>{name}</h2>
      </a>
    </Link>
    <p>Matches: {matches.length}</p>
    <p>Tracked Players: ...</p>
    <table border="1">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Rating (Ordinal)</th>
          <th>Mu (Mean)</th>
          <th>Sigma (Variance)</th>
        </tr>
      </thead>
      <tbody>
        {addIndex(map)(
          (player, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>
                <Link href={`/games/${id}/players/${player.id}`}>
                  <a>{player.id}</a>
                </Link>
              </td>
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
          ),
          players
        )}
      </tbody>
    </table>
  </div>
)

GameId.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  matches: PropTypes.arrayOf().isRequired,
  players: PropTypes.arrayOf().isRequired,
}

const sortPlayers = (players) =>
  sortWith(
    [descend(path(['rating', 'ordinal'])), ascend(prop('id'))],
    map(([id, val]) => ({ id, ...val }), toPairs(players))
  )

export const getStaticProps = async ({ params: { gameId } }) => {
  return {
    props: {
      ...database.games[gameId],
      players: sortPlayers(database.games[gameId].players),
    },
  }
}

const parameterize = (gameId) => ({ params: { gameId } })

export const getStaticPaths = async () => {
  return {
    paths: map(parameterize, keys(database.games)),
    fallback: false,
  }
}

export default GameId
