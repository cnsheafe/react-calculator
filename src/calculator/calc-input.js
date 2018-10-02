import React from 'react'
import { func, number, string } from 'prop-types'

const CalcInput = ({ onChange, total, errorMessage, buffer }) => (
  <div>
    <input type="text" value={buffer} onChange={onChange} />
    <div>{errorMessage || total}</div>
  </div>
)

CalcInput.propTypes = {
  onChange: func.isRequired,
  buffer: string.isRequired,
  total: number,
  errorMessage: string, 
}


export default CalcInput