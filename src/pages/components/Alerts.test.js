import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Alerts from './Alerts';
import {
  createAlert
} from "@/factories/createAlert";

describe('Alerts', () => {
  it('should render correctly', () => {
    let alerts = [];
    alerts.push(createAlert({
      text: "Test!",
      type: 'success'
    }));
    const output = shallow(
      <Alerts alerts={alerts} actions={() => {}}/>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});