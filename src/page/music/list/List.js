import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views';
import { mapStateToProps, mapDispatchToProps } from '@/store/modules/counter.js'
class Home extends Component {
  render() {
    return (
      <div>
        123
        <SwipeableViews onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onChangeIndex={this.handleChangeIndex}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </SwipeableViews>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }
  toDetail() {
    this.props.reduce();
    this.props.history.push('/detail');
  }
  handleChangeIndex(index) {
    console.log(index)
  }
  handleTouchStart(e){
    console.log(e)
  }
  handleTouchMove(){
    console.log(1)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);