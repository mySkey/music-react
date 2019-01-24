import React, { Component } from 'react'
import  './Detail.css'

import { connect } from 'react-redux'
const mapStateToProps = (state) => {
  return {
    counter: state
  }
}
class Detail extends Component{
  constructor(props){
    super(props)
    this.state = {
      styleObj: { background: '#00bcd4' }
    }
  }
  render(){
    return(
      <div className="detail" style={this.state.styleObj}>

      </div>
    )
  }
  componentWillMount(){
    console.log(this.props.counter)
  }
  getLrc(){
    global.ajax.get('http://api.blog.22family.com/api/lrc', { music: '起风了' }).then(res => {
      console.log(global.common.analysis(res))
    })
  }
}

export default connect(mapStateToProps)(Detail)