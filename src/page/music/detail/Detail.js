import React, { Component } from 'react'
import style from './Detail.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LrcList from '../components/lrc.js'
import Controls from '../components/controls.js'
class Detail extends Component{
  constructor(props){
    super(props)
    this.state = {
      current_music: 0,
      userChange: false
    }
    this.id = ''
  }
  render(){
    return(
      <div style={this.detailStyle()} className={style.detail}>
        <div className={style.detail_container}>
          <Controls
            playLast={this.playLast.bind(this)}
            playNext={this.playNext.bind(this)}
          ></Controls>
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
    this.id = this.props.location.search ? global.common.getQuery(this.props.location.search).id : 3
    this.getDetail()
  }
  componentWillReceiveProps(){
    if(this.props.player.current_music !== this.state.current_music){
      let current_music = this.props.player.current_music
      this.setState({ current_music }, ()=>{
        this.id = this.props.player.list[current_music].id
        this.getDetail()
      })
    }
  }
  playLast(){
    let current_music = this.props.player.current_music - 1
    if(current_music<0){
      current_music = this.props.player.list.length - 1
    }
    this.props.setPlayer({ current_music })
    this.setState({ current_music }, ()=>{
      this.id = this.props.player.list[current_music].id
      this.getDetail()
    })
  }
  playNext(){
    let current_music = this.props.player.current_music + 1
    if(current_music>=this.props.player.list.length){
      current_music = 0
    }
    this.props.setPlayer({ current_music })
    this.setState({ current_music }, ()=>{
      this.id = this.props.player.list[current_music].id
      this.getDetail()
    })
  }
  getDetail() {
    global.ajax.get('audio/detail', { id: this.id }).then(res => {
      if (res.code === 0) {
        let { a_resource, i_resource } = res.data;
        let { lrc, id, url, cover, singer, name  } = res.data.audio
        let { timeArr, lrcArr } = global.common.analysis(lrc)
        this.props.setPlaying({id, timeArr, lrcArr, url, singer, name, cover })
        this.props.setPlayer({ i_resource, a_resource })

        global.audioDom.src = a_resource + url;
        setTimeout(()=>{
          global.audioDom.play()
        }, 500)
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

Detail.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)