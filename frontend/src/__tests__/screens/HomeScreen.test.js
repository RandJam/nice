import React from "react";
import {shallow} from 'enzyme';
import HomeScreen from "../../screens/HomeScreen";
import renderer from "react-test-renderer";

describe ("HomeScreen", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<HomeScreen />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('calls navigate on pressing sign in', () => {
    const fakeNavigation = {navigate: jest.fn()};

    let home = renderer.create(<HomeScreen
      navigation={fakeNavigation}
      />
    ).getInstance();

    home.handleLogInPress();
    expect(fakeNavigation.navigate).toHaveBeenCalledTimes(1);
  })
})
