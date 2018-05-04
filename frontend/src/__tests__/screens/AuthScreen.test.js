import React from "react";
import {shallow} from 'enzyme';
import AuthScreen from "../../screens/AuthScreen";
import renderer from "react-test-renderer";

describe ("AuthScreen", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<AuthScreen />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('calls navigate on pressing sign in', () => {
    const fakeNavigation = {navigate: jest.fn()};

    let authScreen = renderer.create(<AuthScreen
      navigation={fakeNavigation}
      />
    ).getInstance();

    authScreen.handleLogInPress();
    expect(fakeNavigation.navigate).toHaveBeenCalledTimes(1);
  })
})
