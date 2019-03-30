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
        <div className={[style.btns, 'df-j-c'].join(' ')}>
          <div onClick={this.changeMode.bind(this)} className={[style.mode_rete, 'df-j-c'].join(' ')}>{this.getPlayMode()}</div>
          <div className={[style.play_btn, 'df-j-c'].join(' ')}>
            <i onClick={this.playLast.bind(this)} className={[style.last_next,'iconfont icon-last-play'].join(' ')}></i>
            {this.getPlayIcon()}
            <i onClick={this.playNext.bind(this)} className={[style.last_next,'iconfont icon-next-play'].join(' ')}></i>
          </div>
          <div onClick={this.changeRate.bind(this)} className={[style.mode_rete, 'df-j-c'].join(' ')}>{this.getPlayRate()}</div>
        </div>
      </div>
    )
  }
  getPlayMode(){
    let mode = this.props.player.mode; // 0 单曲    1 顺序   2 随机
    switch (mode){
      case 0:
        return (<i className={[style.mode, 'iconfont icon-only'].join(' ')}></i>)
      case 1:
        return (<i className={[style.mode, 'iconfont icon-next'].join(' ')}></i>)
      case 2:
        return (<i className={[style.mode, 'iconfont icon-suiji'].join(' ')}></i>)
      default:
        return (<i className={[style.mode, 'iconfont icon-only'].join(' ')}></i>)
    }
  }
  getPlayIcon(){
    let status = this.props.player.status;
    if(status === 1){
      return (
        <i onClick={this.pauseAudio.bind(this)} className={[style.play_pause, 'iconfont icon-pause'].join(' ')}></i>
      )
    }else{
      return(
        <i onClick={this.palyAudio.bind(this)} className={[style.play_pause, 'iconfont icon-play'].join(' ')}></i>
      )
    }
  }
  getPlayRate(){
    let playbackRate = this.props.player.playbackRate; // 0 单曲    1 顺序   2 随机
    switch (playbackRate){
      case 1:
        return (<div>正常</div>)
      default:
        return (<div>×{playbackRate}</div>)
    }
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
  pauseAudio(){
    global.audioDom.pause()
  }
  palyAudio(){
    global.audioDom.play()
  }
  playLast(){
    if(this.props.player.list.length > 0){
      this.props.playLast()
    }
  }
  playNext(){
    if(this.props.player.list.length > 0){
      this.props.playNext()
    }
  }
  changeMode(){
    let mode =  this.props.player.mode+1
    if(mode>2){
      mode = 0
    }
    this.props.setPlayer({ mode })
  }
  changeRate(){
    let playbackRate = this.props.player.playbackRate+0.25
    if(playbackRate > 2) playbackRate = 0.5
    this.props.setPlayer({ playbackRate })
    global.audioDom.playbackRate = playbackRate;
  }
  progressTouch(){
    this.setState({ userChange: true })
  }
  changeProgress(radio){
    let currentTime = Math.floor(radio * this.props.audio.duration)
    global.audioDom.currentTime = currentTime
    this.props.setCurrentTime(currentTime)
    this.setState({ userChange: false })
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