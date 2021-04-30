import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import List from '../../components/List';
import reducer from '../../reducers/index';

it('renders correctly', () => {
  const store = createStore(reducer);
  const tree = renderer
    .create((
      <Provider store={store}>
        <Router><List itemKey="" addItem={() => {}} displayAttr={[]} toAddAttr={[]} /></Router>
      </Provider>
    ))
    .toJSON();
  expect(tree).toMatchSnapshot();
});
