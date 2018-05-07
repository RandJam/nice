import React from "react";
import { shallow } from 'enzyme';
import renderer from "react-test-renderer";
import axiosMain from '../../axios';
import MockAdapter from 'axios-mock-adapter';
import AuthScreen from "../../screens/AuthScreen";

describe ("AuthScreen", () => {

  it('fetches data from server and renders them on mount', (done) => {
    const mock = new MockAdapter(axiosMain);
    const data = 'hello' ;
    const wrapper = shallow(<AuthScreen />);

    mock.onGet('/').reply(200, data);

    wrapper
      .instance()
      .componentDidMount()
      .then(() => {
        expect(wrapper.state()).toHaveProperty('term': 'hello');
        done();
      });

      console.log(wrapper.state)
  });

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
  });

  it('shoud call componentDidMount', () => {
    const wrapper = shallow(<AuthScreen />);
    wrapper.instance().componentDidMount();
  });

})
