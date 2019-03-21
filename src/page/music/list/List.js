import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views';
import { mapStateToProps, mapDispatchToProps } from '@/store/modules/counter.js'
class Home extends Component {
  render() {
    return (
      <div>
        <SwipeableViews onChangeIndex={this.handleChangeIndex}>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);