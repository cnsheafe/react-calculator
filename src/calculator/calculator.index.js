import React from 'react'
import CalcInput from './calc-input'
import CalcButtonArray from './calc-button-array'

export default class Calculator extends React.Component {
  state = {
    total: undefined,
    buffer: '',
    cursorPosition: 0,
  }

  appendButtonSymbolToBuffer = (evt) => {
    const symbol = evt.target.textContent
    const { buffer } = this.state

    this.setState({ buffer: `${buffer}${symbol}` })
  }

  appendKeyStrokesToBuffer = (evt) => {
    const buffer = evt.target.value

    this.setState({ buffer })
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
    const re = /\u221a([0-9]+(?:\.[0-9])?)/

    if (!re.test(input)) return input

    const parsed = input.replace(re, (match, operand) => {
      return Math.sqrt(operand)
    })

    return this.parseMultiplicationAndDivision(parsed)
  }

  render() {
    const { total, buffer } = this.state

    return (
      <div>
        <CalcInput
          total={total}
          onChange={this.appendKeyStrokesToBuffer}
          buffer={buffer}
        />
        <div>
          <CalcButtonArray
            symbols={[
              { text: 'C' },
              { text: '/' },
              { text: 'X' },
              { text: 'DEL' },
            ]}
            defaultHandler={this.appendButtonSymbolToBuffer}
            keyPrefix="calc-0"
          />
          <CalcButtonArray
            symbols={[
              { text: '7' },
              { text: '8' },
              { text: '9' },
              { text: '-' },
            ]}
            defaultHandler={this.appendButtonSymbolToBuffer}
            keyPrefix="calc-1"
          />
          <CalcButtonArray
            symbols={[
              { text: '4' },
              { text: '5' },
              { text: '6' },
              { text: '+' },
            ]}
            defaultHandler={this.appendButtonSymbolToBuffer}
            keyPrefix="calc-2"
          />
          <CalcButtonArray
            symbols={[
              { text: '1' },
              { text: '2' },
              { text: '3' },
              { text: '=' },
            ]}
            defaultHandler={this.appendButtonSymbolToBuffer}
            keyPrefix="calc-3"
          />
          <CalcButtonArray
            symbols={[
              { text: '%' },
              { text: '0' },
              { text: '.' },
              { text: '\u221a' }
            ]}
            defaultHandler={this.appendButtonSymbolToBuffer}
            keyPrefix="calc-4"
          />
        </div>
      </div>
    )
  }
}