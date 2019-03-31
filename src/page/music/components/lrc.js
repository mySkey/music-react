import React, { Component } from 'react'
import {connect } from 'react-redux'
import style from './lrc.css'


class Lrc extends Component{
  render(){
    return(
      <div className={style.lrc_container}>
        <ul ref={this.listRef} onTouchMove={this.handleMove.bind(this)} className={[style.lrcList, 'df-col'].join(' ')}>
          {
            this.props.audio.lrcArr.map((v, k) => {
              return (
                <li className={style.lrcItem} key={k}>
                  <div style={this.getItemStyle(k)} className={style.lrcItem}>{v}</div>
                  {this.showLrc(v, k)}
                </li>
              )
            })
          }
        </ul>
        {this.changeCurrentList()}
      </div>
    )
  }
  getItemStyle(k) {
    return {
      visibility: this.state.currentLrc === k ? 'hidden' : 'visible',
      fontSize: this.state.currentLrc === k ? '1rem' : '0.7rem'
    }
  }
  getItemShowStyle() {
    return {
      width: `${this.state.currentWidth}px`,
      transition: `all ease ${this.state.useTime}s`
    }
  }
  showLrc(v, k) {
    if (this.state.currentLrc === k) {
      return (
        <div>
          <div ref={this.showingRef} className={style.lrcItemShow}>{v}</div>
          <div style={this.getItemShowStyle()} className={style.lrcItemShowIng}>{v}</div>
        </div>
      )
    }
  }
  changeCurrentList(){
    if(this.state.userChange){
      return(
        <div className={[style.swiper, 'df-j-b'].join(' ')}>
          <div>{global.common.getAudioTime(this.state.changeTo)}</div>
          <div className={style.line}></div>
          <div onClick={this.chnageToLrc.bind(this)} className={style.play}><i className={'iconfont icon-play'}></i></div>
        </div>
      )
    }
  }

  constructor(props){
    super(props)
    this.state = {
      currentLrc: 0,
      currentWidth: 0,
      useTime: 1,
      userChange: false,
      changeTo: 0
    }
    this.listRef = React.createRef()
    this.showingRef = React.createRef()
  }
  componentDidMount(){

  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  componentWillReceiveProps(){
    if(this.props.audio.lrcArr.length>0){
      this.getCurrentLrc()
    }
  }
  getCurrentLrc(){
    let { currentTime } = this.props.audio
    let currentLrc = 0;
    this.props.audio.timeArr.forEach((v,k)=>{
      if(currentTime > this.getSecond(v)){
        currentLrc = k
      }
    })

    // 更新当前歌词
    if(currentLrc !== this.state.currentLrc){
      this.setState({ currentLrc, currentWidth: 0 }, () => {
        let currentWidth = this.showingRef.current.offsetWidth
        if(currentLrc < this.props.audio.timeArr.length - 1){
          let useTime = this.getSecond(this.props.audio.timeArr[currentLrc + 1]) - this.getSecond(this.props.audio.timeArr[currentLrc])
          // 根据当前的倍速来决定时间
          useTime = useTime / this.props.player.playbackRate
          if(useTime > 10){
            this.setState({ useTime: 10 })
            return
          }
          this.setState({ useTime, currentWidth })
        }
      })
      if(!this.state.userChange){
        this.scrollLrc(currentLrc)
      }
    }else{
      let currentWidth = this.showingRef.current.offsetWidth
      this.setState({ currentWidth })
    }
  }
  getSecond(t){
    let minute = Number(t.slice(0,2))
    let second = Number(t.slice(3,5))
    let minS = Number(t.slice(7))
    return minS>100 ? (minute * 60 + second + minS / 1000) : (minute * 60 + second + minS / 100)
  }
  // 歌词滚动
  scrollLrc(currentLrc){
    if(currentLrc){
      this.listRef.current.scrollTop = currentLrc * 32
    }
  }
  // 滑动歌词调整进度
  handleMove(){
    window.clearTimeout(this.timer)
    this.setState({ userChange: true })
    this.timer = setTimeout(()=>{
      this.setState({ userChange: false })
    }, 5000)

    let currentLrc = Math.round(this.listRef.current.scrollTop / 32)
    let time = this.props.audio.timeArr[currentLrc]
    let currentTime = Math.ceil(this.getSecond(time))
    this.setState({ changeTo: currentTime })
  }
  chnageToLrc(){
    this.setState({ userChange: false }, ()=>{
      global.audioDom.currentTime = this.state.changeTo;
    })
  }
}

const mapStateToProps = state => {
  return {
    audio: state.player.playing,
    player: state.player,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayer(player) {
      dispatch({ type: 'setPlayer', player })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lrc)