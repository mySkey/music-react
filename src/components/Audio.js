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
    this.props.setPlayer({ status: 1 })
  }
  handleTimeUpdate(){
    let { currentTime, duration } = global.audioDom
    duration = isNaN(duration) ? 0 : duration
    this.props.setCurrentTime(Number(currentTime.toFixed(3)))
    this.props.setDuration(Math.floor(duration))
  }
  handlePause(){
    this.props.setPlayer({ status: 2 })
  }
  handleEnded(){
    this.props.setPlayer({ status: 3 })
    let mode = this.props.player.mode;
    switch (mode){  // 0 单曲    1 顺序   2 随机
      case 0:
        global.audioDom.play()
        break;
      case 1:
        if(this.props.list.length> 0){
          let current_music = this.props.player.current_music + 1
          if(current_music>=this.props.list.length){
            current_music = 0;
          }
          global.audioDom.src = this.props.player.a_resource + this.props.list[current_music].url
          setTimeout(()=>{
            global.audioDom.play()
            this.props.setPlayer({ current_music })
          }, 500)
          return
        }
        global.audioDom.pause()
        break;
      case 2:
        if(this.props.list.length> 0){
          let current_music = Math.floor(Math.random() * this.props.list.length)
          global.audioDom.src = this.props.player.a_resource + this.props.list[current_music].url
          setTimeout(()=>{
            global.audioDom.play()
            this.props.setPlayer({ current_music })
          },500)
          return
        }
        global.audioDom.pause()
        break;
      default:
        global.audioDom.pause()
    }
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
    audio: state.player.playing,
    player: state.player
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
    },
    setPlayer(player){
      dispatch({ type: 'setPlayer', player })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAudio)