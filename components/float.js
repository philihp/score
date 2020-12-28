import React from 'react'
import PropTypes from 'prop-types'

const Float = ({ n }) => <>{n && n.toFixed(3)}</>

Float.propTypes = {
  n: PropTypes.number.isRequired,
}

export default Float
