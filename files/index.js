import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Provider } from 'rebass';
import { Title } from './components';
import theme from '../style-theme';

const title = 'Basic React';

ReactDOM.render(
  <Provider theme={theme}>
    <Title title={title} />
  </Provider>,
  document.getElementById('root')
);