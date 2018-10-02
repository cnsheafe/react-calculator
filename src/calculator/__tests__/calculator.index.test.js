import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Calculator from '../calculator.index'

configure({ adapter: new Adapter() })

describe('<Calculator />', () => {
  let wrapper = shallow(<Calculator />)
  let instance = wrapper.instance()

  beforeEach(() => {
    wrapper = shallow(<Calculator />)
    instance = wrapper.instance()
  })

  it('should match the snaphost', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('#insertButtonSymbolToBuffer', () => {
    const evt = {
      target: {
        textContent: 7
      },
      preventDefault: jest.fn(),
    }

    it('should append a symbol to the buffer', () => {
      instance.inputRef = {
        current: {
          selectionStart: 1,
          focus: jest.fn(),
        }
      }
      instance.insertButtonSymbolToBuffer(evt)
      expect(wrapper.state().buffer).toBe('7')
      expect(evt.preventDefault).toHaveBeenCalled()
    })
  })

  describe('#appendKeyStrokesToBuffer', () => {
    const evt = {
      target: {
        value: '+'
      }
    }

    it('should update the buffer with the new input value', () => {
      instance.inputRef = {
        current: {
          selectionStart: 10
        }
      }
      instance.insertKeyStrokesToBuffer(evt)
      expect(wrapper.state().buffer).toBe('+')
    })
  })

  describe('#parseAdditionAndSubtraction', () => {
    it('should parse the input and return a new string with addition operations solved', () => {
      const parsed = instance.parseAdditionAndSubtraction('2+2+50')
      expect(parsed).toBe('54')
    })

    it('should parse the input when there is a subtraction operation', () => {
      const parsed = instance.parseAdditionAndSubtraction('-10-5-3')
      expect(parsed).toBe('-18')
    })

    it('should return the input if there is not a valid operation', () => {
      const parsed = instance.parseAdditionAndSubtraction('2+g')
      expect(parsed).toBe('2+g')
    })

    it('should parse the input when there is a mix of addition and subtraction', () => {
      const parsed = instance.parseAdditionAndSubtraction('2-2+72-16')
      expect(parsed).toBe('56')
    })

    it('should parse then input when floating numbers are present', () => {
      const parsed = instance.parseAdditionAndSubtraction('2.2+3.3+4.4')
      expect(parsed).toBe('9.9')
    })
  })

  describe('#parseMultiplicationAndDivision', () => {
    it('should parse the the input when there is a multiplication operation', () => {
      const parsed = instance.parseMultiplicationAndDivision('2*4*7*-1')
      expect(parsed).toBe('-56')
    })

    it('should parse the the input when there is a division operation', () => {
      const parsed = instance.parseMultiplicationAndDivision('100/5/10')
      expect(parsed).toBe('2')
    })

    it('should parse the input when there is a mix of multiplication and division', () => {
      const parsed = instance.parseMultiplicationAndDivision('100/5/10*7')
      expect(parsed).toBe('14')
     
    })
  })

  describe('#parseSquareRoot', () => {
    it('should parse the input when there is an square root', () => {
      const parsed = instance.parseSquareRoot('\u221a100')
      expect(parsed).toBe('10')
    })

    it('should parse input when square root has leading coeffecient', () => {
      const parsed = instance.parseSquareRoot('10\u221a100')
      expect(parsed).toBe('100')
    })
  })

  describe('#parseInput', () => {
    const evt = {
      preventDefault: jest.fn(),
    }
    it('should parse input with mixed operators', () => {
      instance.inputRef = {
        current: {
          focus: jest.fn()
        }
      }

      wrapper.setState({ buffer: '3+3*5-6' })
      instance.parseInput(evt)
      expect(wrapper.state().buffer).toBe('12')
      expect(evt.preventDefault).toHaveBeenCalled()
    })
  })
})