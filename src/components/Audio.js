import React, { Component } from 'react'
import { connect } from 'react-redux'

class MyAudio extends Component{
  constructor(props){
    super(props)
    global.audioDom = new Audio('http://audio.22family.com/%E8%B5%B7%E9%A3%8E%E4%BA%86.mp3')
    global.audioDom.pause()
  }
  componentDidMount(){
    global.audioDom.addEventListener('timeupdate', this.handlePlaying.bind(this))
    global.audioDom.addEventListener('ended', this.handleEnded.bind(this))
  }
  handlePlaying(){
    let { currentTime, duration } = global.audioDom
    this.props.setCurrentTime(Math.floor(currentTime))
    this.props.setDuration(Math.floor(duration))
    //console.log(this.props.list)
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
    list: state.music.list,
    audio: state.music.playing
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