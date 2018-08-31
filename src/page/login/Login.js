import React,{ Component } from 'react'

import { store } from '../../store/store.js'
export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      num:''
    }
  }
  componentDidMount(){
    console.log(store.counter.getState())
    this.setState({
      num: store.counter.getState() 
    })
  }
  render() {
    return (
      <div>
        login 现在计数为{this.state.num}
      </div>
    )
  }
}