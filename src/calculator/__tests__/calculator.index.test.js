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

  describe('#appendButtonSymbolToBuffer', () => {
    const evt = {
      target: {
        textContent: 7
      }
    }

    it('should append a symbol to the buffer', () => {
      instance.appendButtonSymbolToBuffer(evt)
      expect(wrapper.state().buffer).toBe('7')
    })
  })
})