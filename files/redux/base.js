import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Provider as Rebass } from 'rebass';
import { Title } from './components';
import theme from '../style-theme';

// Basic Redux Setup
import { createStore, compose } from 'redux';
import { Provider as Redux } from 'react-redux';
import { reducer } from './redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const title = 'Basic React';

ReactDOM.render(
  <Rebass theme={theme}>
    <Redux store={store}>
      <Title title={title} />
    </Redux>
  </Rebass>,
  document.getElementById('root')
);
