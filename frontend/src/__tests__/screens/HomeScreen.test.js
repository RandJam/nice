import React from 'react'
import { shallow } from 'enzyme'
import HomeScreen from '../../screens/HomeScreen'
import renderer from 'react-test-renderer'

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<HomeScreen />).toJSON()
    expect(rendered).toBeTruthy()
    expect(rendered).toMatchSnapshot()
  })

  it('Nice button redirects to ListScreen view', () => {
    const fakeNavigation = { navigate: jest.fn() }

    let homeScreen = renderer.create(<HomeScreen navigation={fakeNavigation} />).getInstance()
    homeScreen.handleNiceButtonPress()
    expect(fakeNavigation.navigate).toHaveBeenCalledTimes(1)
  })
})
