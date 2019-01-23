import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import '@/common/ajax.js';
import '@/common/common.js';

import { Provider } from 'react-redux';
import store from './store/store.js'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
