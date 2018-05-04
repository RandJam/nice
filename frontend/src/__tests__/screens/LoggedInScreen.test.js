import React from "react";
import {shallow} from 'enzyme';
import LoggedInScreen from "../../screens/LoggedInScreen";
import renderer from "react-test-renderer";

describe ("LoggedInScreen", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<LoggedInScreen />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('calls navigate on pressing go to button', () => {
    const fakeNavigation = {navigate: jest.fn()};

    let loggedIn = renderer.create(<LoggedInScreen
      navigation={fakeNavigation}
      />
    ).getInstance();

    loggedIn.handleButtonScreenPress();
    expect(fakeNavigation.navigate).toHaveBeenCalledTimes(1);
  })
})
