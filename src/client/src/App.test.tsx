import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';

test('renders without crashing', () => {
  const { baseElement } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(baseElement).toBeDefined();
});
