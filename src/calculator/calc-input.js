import React from 'react'
import { func, string } from 'prop-types'

const CalcInput = React.forwardRef(({ onChange, errorMessage, buffer, updateCursorPosition, calculate }, ref) => (
  <div>
    <input
      type="text"
      value={buffer}
      onChange={onChange}
      onClick={updateCursorPosition}
      onKeyPress={calculate}
      ref={ref}
    />
    <div>{errorMessage}</div>
  </div>
))

CalcInput.propTypes = {
  onChange: func.isRequired,
  updateCursorPosition: func.isRequired,
  buffer: string.isRequired,
  errorMessage: string, 
}


export default CalcInput