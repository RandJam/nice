import React, { TextInput } from "react";
import renderer from "react-test-renderer";
import axiosMain from '../../axios';
import MockAdapter from 'axios-mock-adapter';
import AuthScreen from "../../screens/AuthScreen";

describe ("AuthScreen", () => {

  it("renders without crashing", () => {
    const rendered = renderer.create(<AuthScreen />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('renders input field with placeholder', function () {
      const expectedPlaceholder = 'write something';
      expect(textInput).to.have.length(1);
      expect(textInput.props().placeholder).to.eql(expectedPlaceholder);
        });



  // it('calls navigate on pressing sign in', () => {
  //   const fakeNavigation = {navigate: jest.fn()};
  //
  //   let authScreen = renderer.create(<AuthScreen
  //     navigation={fakeNavigation}
  //     />
  //   ).getInstance();
  //
  //   authScreen.handleLogInPress();
  //   expect(fakeNavigation.navigate).toHaveBeenCalledTimes(1);
  // });
  //
  // it('shoud call componentDidMount', () => {
  //   const wrapper = shallow(<AuthScreen />);
  //   wrapper.instance().componentDidMount();
  // });

})
