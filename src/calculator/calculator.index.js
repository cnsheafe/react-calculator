import React from 'react'
import CalcInput from './calc-input'
import CalcButtonArray from './calc-button-array'
import pipe from '../util/pipe'
import './calculator.css'
import bem from '../util/bem'

const cn = bem('calculator')

export default class Calculator extends React.Component {
  state = {
    buffer: '',
    errorMessage: '',
  }

  inputRef = React.createRef()

  insertButtonSymbolToBuffer = (evt) => {
    // Prevents trigger submit action
    evt.preventDefault()
    const symbol = evt.target.textContent
    const { buffer } = this.state

    const ref = this.inputRef.current
    const cursorPos = ref.selectionStart
    ref.focus()

    const newBuffer = `${buffer.slice(0, cursorPos)}${symbol}${buffer.slice(cursorPos)}`

    this.setState({ buffer: newBuffer })
  }

  insertKeyStrokesToBuffer = (evt) => {
    const buffer = evt.target.value

    this.setState({ buffer })
  }

  /**
   * Force focus on cursor at end of text
   */
  onInputFocus = (evt) => {
    const len = evt.target.value.length
    evt.target.setSelectionRange(len, len)
  }

  /**
   * Helper function to #parse for addition
   * @param {string} input
   */
  parseAdditionAndSubtraction = (input) => {
    const re = /(-?[0-9]+(?:\.[0-9]+)?)(\+|-)([0-9]+(?:\.[0-9]+)?)/

    if (!re.test(input)) return input

    const parsed = input.replace(re, (match, firstOperand, operator, secondOperand) => {
      switch (operator) {
      case '+':
        return parseFloat(firstOperand) + parseFloat(secondOperand)
      default:
        return parseFloat(firstOperand) - parseFloat(secondOperand)
      }
    })

    return this.parseAdditionAndSubtraction(parsed)
  }

  parseMultiplicationAndDivision = (input) => {
    const re = /(-?[0-9]+(?:\.[0-9]+)?)(\*|\/)(-?[0-9]+(?:\.[0-9]+)?)/
    
    if (!re.test(input)) return input

    const parsed = input.replace(re, (match, firstOperand, operator, secondOperand) => {
      switch (operator) {
      case '*':
        return parseFloat(firstOperand) * parseFloat(secondOperand)
      default:
        return parseFloat(firstOperand) / parseFloat(secondOperand)
      }
    })

    return this.parseMultiplicationAndDivision(parsed)
  }

  parseSquareRoot = (input) => {
    const re = /([0-9]+(?:\.[0-9]+)?)?\u221a([0-9]+(?:\.[0-9]+)?)/

    if (!re.test(input)) return input

    const parsed = input.replace(re, (match, firstOperand, secondOperand) => {
      if (firstOperand) return parseFloat(firstOperand) * Math.sqrt(parseFloat(secondOperand))
      return Math.sqrt(parseFloat(secondOperand))
    })

    return this.parseSquareRoot(parsed)
  }

  parsePercentage = (input) => {
    const re = /([0-9]+(?:\.[0-9]+)?)%/

    if (!re.test(input)) return input

    const parsed = input.replace(re, (match, operand) => {
      return parseFloat(operand) * 0.01
    })

    return this.parsePercentage(parsed)
  }

  validateForIllegalCharacters = (input) => {
    // eslint-disable-next-line no-useless-escape
    const re = /[^0-9.\+\-*\/\u221a%]+/

    if (re.test(input)) return 'Illegal characters present.'
    return ''
  }

  parseInput = (evt) => {
    evt.preventDefault()
    const { buffer } = this.state

    this.inputRef.current.focus()
    if (!buffer) return

    let errorMessage = this.validateForIllegalCharacters(buffer)
    if (errorMessage) return this.setState({ errorMessage })

    const parsed = pipe(
      buffer,
      this.parseSquareRoot,
      this.parsePercentage,
      this.parseMultiplicationAndDivision,
      this.parseAdditionAndSubtraction
    )

    if (parsed === buffer) errorMessage = 'No calculation was performed. Possible malformed expression.'

    this.setState({ buffer: parsed, errorMessage })
  }

  /**
   * Allows user to press enter in input to calculate total; otherwise the field is cleared.
   */
  parseInputViaEnter = (evt) => {
    if (evt.key === 'Enter') {
      this.parseInput(evt)
    }
  }

  deleteLastCharacter = (evt) => {
    evt.preventDefault()
    const { buffer } = this.state

    const parsed = buffer.slice(0, buffer.length - 1)
    this.setState({ buffer: parsed })
  }

  clearBuffer = (evt) => {
    evt.preventDefault()
    this.setState({ buffer: '' })
  }

  render() {
    const { buffer, errorMessage } = this.state

    return (
      <form className={cn.b()}>
        <CalcInput
          onChange={this.insertKeyStrokesToBuffer}
          calculate={this.parseInputViaEnter}
          buffer={buffer}
          errorMessage={errorMessage}
          ref={this.inputRef}
          className={cn.e('input')}
          onFocus={this.onInputFocus}
          autoFocus
        />
        <div className={cn.e('key-grid')}>
          <CalcButtonArray
            symbols={[
              { text: 'C', onClick: this.clearBuffer },
              { text: '/' },
              { text: '*' },
              { text: 'DEL', onClick: this.deleteLastCharacter },
            ]}
            defaultHandler={this.insertButtonSymbolToBuffer}
            keyPrefix="calc-0"
            className={cn.e('row')}
          />
          <CalcButtonArray
            symbols={[
              { text: '7' },
              { text: '8' },
              { text: '9' },
              { text: '\u221a' }
            ]}
            defaultHandler={this.insertButtonSymbolToBuffer}
            keyPrefix="calc-1"
            className={cn.e('row')}
          />
          <CalcButtonArray
            symbols={[
              { text: '4' },
              { text: '5' },
              { text: '6' },
              { text: '-' },
            ]}
            defaultHandler={this.insertButtonSymbolToBuffer}
            keyPrefix="calc-2"
            className={cn.e('row')}
          />
          <CalcButtonArray
            symbols={[
              { text: '1' },
              { text: '2' },
              { text: '3' },
              { text: '+' },
            ]}
            defaultHandler={this.insertButtonSymbolToBuffer}
            keyPrefix="calc-3"
            className={cn.e('row')}
          />
          <CalcButtonArray
            symbols={[
              { text: '%' },
              { text: '0' },
              { text: '.' },
              { text: '=', onClick: this.parseInput },
            ]}
            defaultHandler={this.insertButtonSymbolToBuffer}
            keyPrefix="calc-4"
            className={cn.e('row')}
          />
        </div>
      </form>
    )
  }
}