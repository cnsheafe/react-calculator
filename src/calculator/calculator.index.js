import React from 'react'
import CalcInput from './calc-input'
import CalcButtonArray from './calc-button-array'

export default class Calculator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      total: undefined,
      buffer: '',
    }
  }


  render() {
    const { total } = this.state

    return (
      <div>
        <CalcInput total={total} onChange={this.onInputChange} />
        <div>
          <CalcButtonArray
            symbols={[
              { text: 'C' },
              { text: '/' },
              { text: 'X' },
              { text: 'DEL' },
            ]}
            uniqueName="calc-0"
          />
          <CalcButtonArray
            symbols={[
              { text: '7' },
              { text: '8' },
              { text: '9' },
              { text: '-' },
            ]}
            uniqueName="calc-1"
          />
          <CalcButtonArray
            symbols={[
              { text: '4' },
              { text: '5' },
              { text: '6' },
              { text: '+' },
            ]}
            uniqueName="calc-2"
          />
          <CalcButtonArray
            symbols={[
              { text: '1' },
              { text: '2' },
              { text: '3' },
              { text: '=' },
            ]}
            uniqueName="calc-3"
          />
          <CalcButtonArray
            symbols={[
              { text: '%' },
              { text: '0' },
              { text: '.' },
            ]}
            uniqueName="calc-4"
          />
        </div>
      </div>
    )
  }
}