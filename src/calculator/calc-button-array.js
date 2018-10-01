import React from 'react'
import { string, func, shape } from 'prop-types'

const CalcButtonArray = ({ symbols, uniqueName }) => (
  <div>
    {symbols.map(s => <button key={`${uniqueName}-${s.text}`} onClick={s.onClick}>{s.text}</button>)}
  </div>
)

CalcButtonArray.propTypes = {
  uniqueName: string.isRequired,
  symbols: shape({
    text: string,
    onClick: func
  }).isRequired
}

export default CalcButtonArray