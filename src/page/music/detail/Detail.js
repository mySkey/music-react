import React, { Component } from 'react'
import style from './Detail.css'
import { connect } from 'react-redux'
import LrcList from '../components/lrc.js'
import Controls from '../components/controls.js'
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
      <div style={this.detailStyle()} className={style.detail}>
        <div className={style.detail_container}>
          <Controls></Controls>
          <LrcList></LrcList>
        </div>
      </div>
    )
  }
  detailStyle(){
    let i_resource = this.props.player.i_resource
    let cover = this.props.audio.cover
    return{
      height: '100vh',
      overflow: 'hidden',
      background: `url(${cover ? (i_resource + cover + '-ph') : ''}) 0 0/cover`
    }
  }
  componentDidMount(){
    this.id = this.props.location.query ? this.props.location.query.id : 1
    this.getDetail()
  }
  componentWillReceiveProps(){
    //console.log(this.props.audio.currentTime)
  }
  getDetail() {
    global.ajax.get('audio/detail', { id: this.id }).then(res => {
      if (res.code === 0) {
        let { a_resource, i_resource } = res.data;
        let { lrc, url, cover, singer, name  } = res.data.audio
        let { timeArr, lrcArr } = global.common.analysis(lrc)
        this.props.setPlaying({ timeArr, lrcArr, url, singer, name, cover })
        this.props.setPlayer({ i_resource, a_resource })

        global.audioDom.src = a_resource + url;
        global.audioDom.play()
      }
    })
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail)