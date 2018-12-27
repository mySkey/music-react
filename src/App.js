import React, { Component } from 'react';
import './App.css';

import MyRouter from './routers/index.js'
export default class App extends Component {  
  render() {
    return (
      <div className="App">
        <MyRouter></MyRouter>
      </div>
    );
  }
}

