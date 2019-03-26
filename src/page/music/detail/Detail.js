import React, { Component } from 'react'
import style from './Detail.css'
import { connect } from 'react-redux'
import Progress from '@/components/Progress.js'
class Detail extends Component{
  constructor(props){
    super(props)
    this.state = {
      timeArr: [],
      lrcArr: [],
      currentLrc: 0
    }
  }
  render(){
    return(
      <div className="detail">
        <h4>{this.props.myInfo.name}</h4>
        <p onClick={() => this.props.setName('mySkey')}>设置名字{global.common.getAudioTime(this.props.audio.currentTime)}----{global.common.getAudioTime(this.props.audio.duration)}</p>
        <div style={{width: '300px', marginLeft: '50px'}}><Progress changeProgress={this.changeProgress.bind(this)}></Progress></div>
        <ul className={[style.lrcList, 'df-col'].join(' ')}>
          {
            this.state.lrcArr.map((v,k)=>{
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
  componentDidMount(){
    //console.log(this.props.myInfo)
    this.getLrc()
  }
  getLrc() {
    global.ajax.get('lrc', { music: '起风了' }).then(res => {
      if (res.code === 0) {
        let { timeArr, lrcArr } = this.analysis(res.data.lrc)
        this.setState({ timeArr, lrcArr })
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
  analysis(str){
    let s = str.replace(/[\r\n]/g, "").split('[');
    let lrcDataArr = s.slice(5);
    let timeArr = [], lrcArr = [];
    for (let v of lrcDataArr){
      timeArr.push(v.slice(0, 8))
      lrcArr.push(v.slice(9, v.length))
    }
    return { timeArr, lrcArr }
  }
  changeProgress(radio){
    console.log(radio)
  }
}

const mapStateToProps = state => {
  return {
    myInfo: state.myInfo,
    audio: state.music.playing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setName(name){
      dispatch({ type: 'setName', name })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)