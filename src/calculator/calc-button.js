import React from 'react'
import { string, func } from 'prop-types'

const CalcButton = ({ symbol, onClick }) => (
  <button onClick={onClick}>{symbol}</button>
)

CalcButton.propTypes = {
  symbol: string.isRequired,
  onClick: func.isRequired,
}

export default CalcButton