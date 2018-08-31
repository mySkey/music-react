import React, { Component } from 'react';
import './App.css';

import {store,action} from './store/store.js'

import MyRouter from './routers/index.js'
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.handleLoginClick = this.handleLoginClick.bind(this);
  //   // this.handleLogoutClick = this.handleLogoutClick.bind(this);
  //   // this.state = { isLoggedIn: false };
  // }
  state={
    me:{},
    num:0
  }
  componentDidMount(){
    
  }
  add(){
    store.counter.dispatch(action.add())
    console.log(store.counter.getState())

    store.userinfo.dispatch({ type: 'GET' })
    console.log(store.userinfo.getState())
    this.setState({ 
      me: store.userinfo.getState(),
      num: store.counter.getState()
    })
  }
  reduce(){
    store.counter.dispatch({ type: 'RED' })
    console.log(store.counter.getState())

    store.userinfo.dispatch({ type: 'EDIT',name:'dongdong',age:Math.floor(Math.random()*100) })
    console.log(store.userinfo.getState())
    this.setState({
      me: store.userinfo.getState(),
      num: store.counter.getState()
    })
  }
  render() {
    return (
      <div className="App">
        <div>{this.state.me.name}{this.state.me.age}</div>
        <div>{this.state.num}</div>
        <div onClick={()=>this.add()}>增加</div>
        <div onClick={()=>this.reduce()}>减少</div>
        <MyRouter></MyRouter>
      </div>
    );
  }
}

export default App;
