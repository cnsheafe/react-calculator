import React from 'react'
import { func, number, string } from 'prop-types'

const CalcInput = ({ onChange, total, errorMessage }) => (
  <div>
    <input type="text" onChange={onChange} />
    <div>{errorMessage || total}</div>
  </div>
)

CalcInput.propTypes = {
  onChange: func.isRequired,
  total: number.isRequired,
  errorMessage: string, 
}


export default CalcInput