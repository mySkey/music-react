import React, { Component } from 'react';
import './App.css';

import MyRouter from './routers/index.js'
export default class App extends Component {
  constructor(props){
    super(props)
    global.audio = new Audio();
    global.audio.pause();
  }
  render() {
    return (
      <div className="App">
        <MyRouter></MyRouter>
      </div>
    );
  }
}

