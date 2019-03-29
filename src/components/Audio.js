import React, { Component } from 'react'
import { connect } from 'react-redux'

class MyAudio extends Component{
  constructor(props){
    super(props)
    global.audioDom = new Audio()
    global.audioDom.preload = 'auto'
  }
  componentDidMount(){
    this.initEvent()
  }
  initEvent(){
    global.audioDom.addEventListener('waiting', this.handleWaiting.bind(this))
    global.audioDom.addEventListener('play', this.handlePlay.bind(this))
    global.audioDom.addEventListener('timeupdate', this.handleTimeUpdate.bind(this))
    global.audioDom.addEventListener('pause', this.handlePause.bind(this))
    global.audioDom.addEventListener('ended', this.handleEnded.bind(this))
  }
  handleWaiting(){

  }
  handlePlay(){

  }
  handleTimeUpdate(){
    let { currentTime, duration } = global.audioDom
    duration = isNaN(duration) ? 0 : duration
    this.props.setCurrentTime(Number(currentTime.toFixed(3)))
    this.props.setDuration(Math.floor(duration))
  }
  handlePause(){

  }
  handleEnded(){

  }
  render(){
    return(
      <div></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.player.list,
    audio: state.player.playing
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    last() {
      dispatch({ type: 'last' });
    },
    next() {
      dispatch({ type: 'next' });
    },
    play() {
      dispatch({ type: 'play' });
    },
    pause() {
      dispatch({ type: 'pause' });
    },
    setRate(rate) {
      dispatch({ type: 'setRate', rate })
    },
    setMode(mode) {
      dispatch({ type: 'setMode', mode })
    },
    setCurrentTime(currentTime) {
      dispatch({ type: 'setCurrentTime', currentTime })
    },
    setDuration(duration) {
      dispatch({ type: 'setDuration', duration })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAudio)