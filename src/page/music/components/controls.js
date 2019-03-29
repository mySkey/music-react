import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './controls.css'
import Progress from '@/components/Progress.js'


class Controls extends Component {
  render() {
    return (
      <div className={style.controls}>
        <div className={[style.time, 'df-j-c'].join(' ')}>
          <div>{global.common.getAudioTime(this.props.audio.currentTime)}</div>
          <div className={style.progress}>
            <Progress radio={this.state.userChange ? '' : (Math.floor(this.props.audio.currentTime) / this.props.audio.duration)} 
              touchStart={this.progressTouch.bind(this)} 
              changeProgress={this.changeProgress.bind(this)}>
            </Progress>
          </div>
          <div>{global.common.getAudioTime(this.props.audio.duration)}</div>
        </div>
        
      </div>
    )
  }

  constructor(props){
    super(props)
    this.state = {
      currentLrc: 0,
      userChange: false
    }
  }
  componentDidMount() {

  }
  componentWillReceiveProps() {

  }
  progressTouch(){
    this.setState({ userChange: true })
  }
  changeProgress(radio){
    let currentTime = Math.floor(radio * this.props.audio.duration)
    global.audioDom.currentTime = currentTime
    this.props.setCurrentTime(currentTime)
    this.setState({ userChange: false })
    console.log(this.props.audio)
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    audio: state.player.playing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setName(name){
      dispatch({ type: 'setName', name })
    },
    setCurrentTime(currentTime){
      dispatch({ type: 'setCurrentTime', currentTime })
    },
    setPlaying(playing){
      dispatch({ type: 'setPlaying', playing })
    },
    setPlayer(player){
      dispatch({ type: 'setPlayer', player })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)