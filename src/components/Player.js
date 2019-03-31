import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import style from './Player.css'
import { setTimeout } from 'timers';

class Player extends Component{
  render(){
    return(
      <div>{this.getAudioPlayer()}</div>
    )
  }
  getAudioPlayer(){
    if(this.props.audio.id && this.props.player.global_show){
      return(
        <div onClick={this.toDtail.bind(this)} className={[style.player, 'df-j-b'].join(' ')}>
          <div className={style.avatar}>
            <img style={this.avatarStyle()} className={style.avatar_img} src={this.props.player.i_resource + this.props.audio.cover+'-cover'} alt='歌曲封面' />
          </div>
          <div className={[style.content, 'df-1 df-j-b'].join(' ')}>
            <div className={[style.info, 'df-col'].join(' ')}>
              <div className={style.name}>{this.props.audio.name}</div>
              <div className={style.singer}>{this.props.audio.singer.name}</div>
            </div>
            <div className={[style.right, 'df-j-b'].join(' ')}>
              <div className={[style.controls, 'df-j-b'].join(' ')}>
                <i onClick={this.playLast.bind(this)} className={[style.last_next,'iconfont icon-last-play'].join(' ')}></i>
                {this.getPlayIcon()}
                <i onClick={this.playNext.bind(this)} className={[style.last_next, 'iconfont icon-next-play'].join(' ')}></i>
              </div>
              <div className={[style.delete, 'df'].join(' ')}>
                <div className={style.line}></div>
                <i onClick={this.closePlayer.bind(this)} className='iconfont icon-error'></i>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  avatarStyle(){
    if(this.props.player.status === 1){
      return{
        animation: `4s ${style.rotateImg} infinite linear`
      }
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

  constructor(props){
    super(props)
    this.state = {
      
    }
  }
  componentDidMount() {
    //console.log(this.props.audio)
  }
  pauseAudio(e){
    e.stopPropagation()
    global.audioDom.pause()
  }
  palyAudio(e){
    e.stopPropagation()
    global.audioDom.play()
  }
  playLast(e){
    e.stopPropagation()
    let current_music = this.props.player.current_music - 1
    if(current_music<0){
      current_music = this.props.player.list.length - 1
    }
    this.playCurrent(current_music)
  }
  playNext(e){
    e.stopPropagation()
    let current_music = this.props.player.current_music + 1
    if(current_music>=this.props.player.list.length){
      current_music = 0
    }
    this.playCurrent(current_music)
  }
  playCurrent(current_music){
    let { id, name, cover, url, singer } = this.props.player.list[current_music]
    this.props.setPlaying({ id, name, cover, url, singer })
    global.audioDom.src = this.props.player.a_resource + this.props.player.list[current_music].url
    setTimeout(()=>{
      global.audioDom.play()
      this.props.setPlayer({ current_music })
    },500)
  }
  closePlayer(e){
    e.stopPropagation()
    this.props.setPlayer({ global_show: 0 })
  }
  toDtail(){
    let { id } = this.props.player.playing
    this.context.router.history.push(`/music/detail?id=${id}`)
  }
}

const mapPropsState = state=>{
  return{
    player: state.player,
    audio: state.player.playing
  }
}
const mapPropsAction = dispatch=>{
  return{
    setPlayer(player){
      dispatch({ type: 'setPlayer', player })
    },
    setPlaying(playing){
      dispatch({ type: 'setPlaying', playing })
    }
  }
}

Player.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapPropsState, mapPropsAction)(Player)