import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import HomeMeasurement from '../../components/HomeMeasurement';
import reducer from '../../reducers/index';

it('renders correctly', () => {
  const store = createStore(reducer);
  const tree = renderer
    .create((
      <Provider store={store}>
        <HomeMeasurement />
      </Provider>
    ))
    .toJSON();
  expect(tree).toMatchSnapshot();
});
