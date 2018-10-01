import React from 'react'
import { string, func, shape, arrayOf } from 'prop-types'

/**
 * Represents a column or row of buttons. Each one can have an optional associated onClick handler.
 * @param {Object} props
 * @param {Array<{text: string, onClick?: function}>} props.symbols
 * @param {string} props.keyPrefix prefix for react-key of each button
 * @param {function} props.defaultHandler called when symbol.onClick is falsy
 */
const CalcButtonArray = ({ symbols, keyPrefix, defaultHandler }) => (
  <div>
    {symbols.map(s => <button key={`${keyPrefix}-${s.text}`} onClick={s.onClick || defaultHandler}>{s.text}</button>)}
  </div>
)

CalcButtonArray.propTypes = {
  keyPrefix: string.isRequired,
  defaultHandler: func.isRequired,
  symbols: arrayOf(shape({
    text: string.isRequired,
    onClick: func
  })).isRequired
}

export default CalcButtonArray