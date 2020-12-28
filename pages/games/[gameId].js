import React from 'react'
import PropTypes from 'prop-types'
import { map, keys } from 'ramda'
import database from '../../lib/database'

const GameId = (params) => <div>{JSON.stringify(params)}</div>

GameId.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    matches: PropTypes.arrayOf(),
    players: PropTypes.arrayOf(),
  }).isRequired,
}

export const getStaticProps = async ({ params: { gameId } }) => {
  return {
    props: database.games[gameId],
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
