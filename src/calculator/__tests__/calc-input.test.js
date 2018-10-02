import React from 'react'
import CalcInput from '../calc-input'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })


describe('<CalcInput />', () => {
  const props = {
    onChange: jest.fn(),
    updateCursorPosition: jest.fn(),
    total: 18,
    buffer: '8+10',
    errorMessage: undefined,
  }

  it('should match the snapshot', () => {
    const wrapper = shallow(<CalcInput {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should display an error message', () => {
    const wrapper = shallow(<CalcInput {...props} errorMessage="Malformed input." />)
    expect(wrapper).toMatchSnapshot()
  })
})