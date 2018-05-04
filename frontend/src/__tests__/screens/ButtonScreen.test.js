import React from "react";
import {shallow} from 'enzyme';
import ButtonScreen from "../../screens/ButtonScreen";
import renderer from "react-test-renderer";

describe ("ButtonScreen", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<ButtonScreen />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

})
