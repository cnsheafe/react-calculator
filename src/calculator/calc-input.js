import React from 'react'
import { func, string } from 'prop-types'

const CalcInput = React.forwardRef(({
  onChange, errorMessage, buffer, calculate, className, autoFocus, onFocus,
}, ref) => (
  <div className={className}>
    <input
      type="text"
      value={buffer}
      onChange={onChange}
      onKeyPress={calculate}
      ref={ref}
      autoFocus={autoFocus}
      onFocus={onFocus}
    />
    <div>{errorMessage}</div>
  </div>
))

CalcInput.propTypes = {
  onChange: func.isRequired,
  buffer: string.isRequired,
  errorMessage: string, 
  className: string,
  onFocus: func,
}


export default CalcInput