import React from 'react';
import { shallow } from 'enzyme'; //Enzyme is a testing utility used for making assertions and manipulating React components
import RectangleButton, { styles } from '../../components/RectangleButton';

describe('rendering',  () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<RectangleButton text='rectButt' handleOnPress={() => {}}/>)
  })
  it('renders a <TouchableHighlight/>', () => {
    expect(wrapper.find('TouchableHighlight')).toHaveLength(1)
  })
})

describe('interaction', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = { text:'rectButt', color: '#FFFF00', handleOnPress: jest.fn() },
    wrapper = shallow(<RectangleButton {...props} />)
  })
  describe('clicking the button', () => {
    beforeEach(() => {
      wrapper.find('TouchableHighlight').prop('onPress')()
    })
    it('calls the handleOnPress callback function', () => {
      expect(props.handleOnPress).toHaveBeenCalledTimes(1)
    })
  })
})
