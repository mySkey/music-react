import React, { Component } from 'react'
import  './Detail.css'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '@/store/modules/myinfo.js'
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
        <h4>{this.props.myInfo.name}</h4>
        <p onClick={() => this.props.setName('mySkey')}>设置名字</p>
      </div>
    )
  }
  componentWillMount(){
    console.log(this.props.myInfo)
  }
  getLrc(){
    global.ajax.get('http://api.blog.22family.com/api/lrc', { music: '起风了' }).then(res => {
      console.log(global.common.analysis(res))
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)