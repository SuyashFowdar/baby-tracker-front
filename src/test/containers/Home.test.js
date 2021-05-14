import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from '../../containers/Home';
import reducer from '../../reducers/index';

it('renders correctly', () => {
  const store = createStore(reducer);
  const tree = renderer
    .create(<Provider store={store}><Home /></Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
