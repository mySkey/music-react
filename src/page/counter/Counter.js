import React,{ Component } from 'react'
import { mapStateToProps, mapDispatchToProps } from '@/store/modules/counter.js'
import { connect } from 'react-redux'

class Counter extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)