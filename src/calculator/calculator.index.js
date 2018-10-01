import React from 'react'
import CalcInput from './calc-input'
import CalcButtonArray from './calc-button-array'

export default class Calculator extends React.Component {
  state = {
    total: undefined,
    buffer: '',
  }

  appendButtonSymbolToBuffer = (evt) => {
    const symbol = evt.target.textContent
    const { buffer } = this.state

    this.setState({ buffer: `${buffer}${symbol}` })
  }

  appendKeyStrokesToBuffer = (evt) => {
    const buffer = evt.target.value

    this.setState({ buffer})
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
            ]}
            defaultHandler={this.appendButtonSymbolToBuffer}
            keyPrefix="calc-4"
          />
        </div>
      </div>
    )
  }
}