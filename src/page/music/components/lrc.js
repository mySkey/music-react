import React, { Component } from 'react'
import {connect } from 'react-redux'
import style from './lrc.css'


class Lrc extends Component{
  render(){
    return(
      <div className={style.lrc_container}>
        <ul onTouchMove={this.handleMove.bind(this)} className={[style.lrcList, 'df-col'].join(' ')}>
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
          <div id='show-ing' className={style.lrcItemShow}>{v}</div>
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
      lrcArr: [],
      timeArr: [],
      currentLrc: 0,
      currentWidth: 0,
      useTime: 1,
      userChange: false,
      changeTo: 0
    }
  }
  componentDidMount(){
    
  }
  componentWillReceiveProps(){
    if(this.state.lrcArr.length===0){
      this.getLrc()
      return
    }
    this.getCurrentLrc()
  }
  getLrc(){
    let { lrcArr, timeArr } = this.props.audio
    if(lrcArr.length>0){
      this.setState({ lrcArr, timeArr })
    }
  }
  getCurrentLrc(){
    let { currentTime } = this.props.audio
    let currentLrc = 0;
    this.state.timeArr.forEach((v,k)=>{
      if(currentTime > this.getSecond(v)){
        currentLrc = k
      }
    })
    if(currentLrc !== this.state.currentLrc){
      this.setState({ currentLrc, currentWidth: 0 }, () => {
        let showingDom = document.querySelector(`#show-ing`)
        let currentWidth = showingDom.offsetWidth
        if(currentLrc < this.state.timeArr.length - 1){
          let useTime = this.getSecond(this.state.timeArr[currentLrc + 1]) - this.getSecond(this.state.timeArr[currentLrc])
          if(useTime > 10){
            this.setState({ useTime: 10, currentLrc: -1 })
          }
          this.setState({ useTime, currentWidth })
        }
      })
      if(!this.state.userChange){
        this.scrollLrc(currentLrc)
      }
    }else{
      let showingDom = document.querySelector(`#show-ing`)
      let currentWidth = showingDom.offsetWidth
      this.setState({ currentWidth })
    }
  }
  getSecond(t){
    let minute = Number(t.slice(0,2))
    let second = Number(t.slice(3,5))
    let minS = Number(t.slice(7))
    return minute * 60 + second + minS / 1000
  }
  scrollLrc(currentLrc){
    if(currentLrc){
      let listDom = document.querySelector(`.${style.lrcList}`)
      listDom.scrollTop = currentLrc * 32
    }
  }
  handleMove(){
    window.clearTimeout(this.timer)
    this.setState({ userChange: true })
    this.timer = setTimeout(()=>{
      this.setState({ userChange: false })
    }, 5000)

    let listDom = document.querySelector(`.${style.lrcList}`)
    let currentLrc = Math.round(listDom.scrollTop / 32)
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