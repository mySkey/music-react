import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store.js'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import '@/common/style.css';
import '@/common/common.js';
import ajax from '@/common/ajax.js'

global.ajax = ajax;




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
