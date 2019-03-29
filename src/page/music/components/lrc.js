import React, { Component } from 'react'
import {connect } from 'react-redux'
import style from './lrc.css'


class Lrc extends Component{
  render(){
    return(
      <div>
        <ul className={[style.lrcList, 'df-col'].join(' ')}>
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
      transition: `all linear ${this.state.useTime}s`
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

  constructor(props){
    super(props)
    this.state = {
      lrcArr: [],
      timeArr: [],
      currentLrc: 0,
      currentWidth: 0,
      useTime: 1,
      userChange: false
    }
  }
  componentDidMount(){
    //this.getCurrentLrc()
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
          this.setState({ useTime, currentWidth })
        }
      })
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