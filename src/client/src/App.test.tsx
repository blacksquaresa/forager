import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { InitialData } from './models/InitialData';

test('renders without crashing', () => {
  const props = {
    isLoggedIn: true,
    addInitialData: (data: InitialData) => {}
  };

  const { instance } = shallow(<App {...props} />);
  expect(instance).toBeDefined();
});
