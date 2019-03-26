import React, { Component } from 'react';
import './App.css';
import MyAudio from '@/components/Audio.js'
import MyRouter from './routers/index.js'
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <MyAudio></MyAudio>
        <MyRouter></MyRouter>
      </div>
    );
  }
}
