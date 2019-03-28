import React, { Component } from 'react'
import style from './Detail.css'
import { connect } from 'react-redux'
import Progress from '@/components/Progress.js'
class Detail extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentLrc: 0,
      userChange: false
    }
    this.id = ''
  }
  render(){
    return(
      <div style={this.detailStyle()} className="detail">
        <p onClick={() => this.props.setName('mySkey')}>{global.common.getAudioTime(this.props.audio.currentTime)}----{global.common.getAudioTime(this.props.audio.duration)}</p>
        <div style={{width: '300px', marginLeft: '50px'}}>
          <Progress radio={this.state.userChange ? '' : (this.props.audio.currentTime / this.props.audio.duration)} touchStart={this.progressTouch.bind(this)} changeProgress={this.changeProgress.bind(this)}></Progress>
        </div>
        <ul className={[style.lrcList, 'df-col'].join(' ')}>
          {
            this.props.audio.lrcArr.map((v,k)=>{
              return(
                <li className={style.lrcItem} key={k}>
                  <div style={this.getItemStyle(k)} className={style.lrcItem}>{v}</div>
                  { this.showLrc(v, k) }
                </li>
              )
            })
          }
          <li></li>
        </ul>
      </div>
    )
  }
  detailStyle(){
    let i_resource = this.props.player.i_resource
    let cover = this.props.audio.cover
    return{
      height: '100vh',
      overflow: 'hidden',
      background: `url(${i_resource + cover + '-ph'}) 0 0/cover`
    }
  }
  componentDidMount(){
    this.id =  this.props.location.query.id
    this.getLrc()
  }
  componentWillReceiveProps(){
    //console.log(this.props.audio.currentTime)
  }
  getLrc() {
    global.ajax.get('audio/detail', { id: this.id }).then(res => {
      if (res.code === 0) {
        let { a_resource } = res.data;
        let { lrc, url, cover, singer, name  } = res.data.audio
        let { timeArr, lrcArr } = global.common.analysis(lrc)
        this.props.setPlaying({ timeArr, lrcArr, url, singer, name, cover })
        console.log(this.props.audio)

        global.audioDom.src = a_resource + url;
        global.audioDom.play()
      }
    })
  }
  getItemStyle(k){
    return { 
      visibility: this.state.currentLrc === k ? 'hidden' : 'visible',
      fontSize: this.state.currentLrc === k ? '1rem' : '0.7rem'
    }
  }
  getItemShowStyle(){
    return{
      animation: `${style.showing} linear 3s`
    }
  }
  showLrc(v, k){
    if (this.state.currentLrc === k){
      return(
        <div>
          <div className={style.lrcItemShow}>{v}</div>
          <div style={this.getItemShowStyle()} className={style.lrcItemShowIng}>{v}</div>
        </div>
      )
    }
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
    myInfo: state.myInfo,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)