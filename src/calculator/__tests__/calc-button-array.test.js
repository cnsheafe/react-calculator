import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CalcButtonArray from '../calc-button-array'

configure({ adapter: new Adapter() })

describe('<CalcButton />', () => {
  const symbols = [
    { text: '+', onClick: jest.fn()},
    { text: '-', onClick: jest.fn()},
    { text: '=', onClick: jest.fn()}
  ]

  it('should match the snapshot', () => {
    const wrapper = shallow(<CalcButtonArray symbols={symbols} uniqueName="calc-1" />)
    expect(wrapper).toMatchSnapshot()
  })
})