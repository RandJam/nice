import React from 'react';
import { mount, shallow } from 'enzyme'; //Enzyme is a testing utility used for making assertions and manipulating React components
import Button, { styles } from '../../components/Button';
import Logo from '../../assets/nice-logo.png';

describe('rendering',  () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Button label="Submit" onClick={() => {}}/>)
  })
  it('renders a <TouchableOpacity/>', () => {
    expect(wrapper.find('TouchableOpacity')).toHaveLength(1)
  })

  it("renders a nice logo", () => {
    expect(wrapper.find('Image').prop('source')).toEqual(Logo)
  });
})

describe('interaction', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = {label: 'Submit', onClick: jest.fn() },
    wrapper = shallow(<Button {...props} />)
  })
  describe('clicking the button', () => {
    beforeEach(() => {
      wrapper.find('TouchableOpacity').prop('onPress')()
    })
    it('calls the onClick callback function', () => {
      expect(props.onClick).toHaveBeenCalledTimes(1)
    })
  })
})
