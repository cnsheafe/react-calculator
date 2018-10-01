import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Calculator from '../calculator.index'

configure({ adapter: new Adapter() })

describe('<Calculator />', () => {
  let wrapper = shallow(<Calculator />)

  beforeEach(() => {
    wrapper = shallow(<Calculator />)
  })

  it('should match the snaphost', () => {
    expect(wrapper).toMatchSnapshot()
  })
})