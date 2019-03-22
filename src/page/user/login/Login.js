import React,{ Component } from 'react'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      num:''
    }
  }
  componentDidMount(){
    
    this.setState({
      num: 1
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