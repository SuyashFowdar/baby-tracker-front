import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../../containers/App';
import reducer from '../../reducers/index';

it('renders correctly', () => {
  const store = createStore(reducer);
  const tree = renderer
    .create(<Provider store={store}><App /></Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
