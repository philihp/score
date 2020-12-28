import React from 'react'
import PropTypes from 'prop-types'
import { keys } from 'ramda'
import Link from 'next/link'
import database from '../../lib/database'

const Index = ({ games }) => (
  <ul className="Nav">
    {games.map((game) => (
      <li>
        <Link href={`/games/${game}`}>
          <a>{game}</a>
        </Link>
      </li>
    ))}
    <style jsx>{`
      .Nav {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .Nav li:before {
        content: ' | ';
      }
      .Nav li:first-child:before {
        content: '[ ';
      }
      .Nav li {
        display: inline;
      }
      .Nav li:last-child:after {
        content: ' ]';
      }
    `}</style>
  </ul>
)

Index.propTypes = {
  games: PropTypes.arrayOf(PropTypes.string),
}

Index.defaultProps = {
  games: [],
}

export const getStaticProps = async ({ params, preview = false }) => {
  return {
    props: {
      games: keys(database.games),
    },
  }
}

export default Index
