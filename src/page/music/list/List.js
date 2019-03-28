import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './List.css'
import SwipeableViews from 'react-swipeable-views';
import ScrollWatch from '@/components/ScrollWatch.js'

class Home extends Component {
  render() {
    return (
      <div>
        <div className={style.typeTitle}>
          <div className={[style.typeList, 'df-j-b'].join(' ')}>
            {
              this.state.types.map((v,k)=>{
                return(
                  <div onClick={()=>this.changeType(k)} style={{width: `${ 100 / this.state.types.length}%`}} className={[k===this.state.currentType ? style.itemShow : '', style.typeItem].join(' ')} key={k}>{v}</div>
                )
              })
            }
          </div>
          <div className={style.navSwiper}>
            <div style={this.sliderStyle()} className={style.navSlider}>
              <div style={this.lineStyle()} className={style.navLine}></div>
            </div>
          </div>
        </div>

        <SwipeableViews
          index={this.state.currentType}
          onTouchStart={e=>this.handleTouchStart(e)} 
          onTouchMove={e=>this.handleTouchMove(e)} 
          onTouchEnd={e=>this.handleTouchEnd(e)} 
          onChangeIndex={(index)=>this.handleChangeIndex(index)}
        >
          {
            [0,0,0,0,0,0].map((v,k)=>{
              return(
                <div onClick={()=>this.props.history.push('/music/detail')} className={style.swiper} key={k}>{k+1}</div>
              )
            })
          }
        </SwipeableViews>
        <ScrollWatch onReachBottom={this.onReachBottom.bind(this)}></ScrollWatch>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      types:['最新','最热','华语','韩文','英文','流行'],
      currentType: 0,
      startX: 0,
      endX: 0,
      lineWidth: 0,
      lineLeft: 0
    }
  }
  componentDidMount() {
    this.getList()
  }
  sliderStyle(){
    return{
      width: `${ 100 / this.state.types.length}%`, 
      left: `${this.state.currentType * (100 / this.state.types.length)}%`
    }
  }
  lineStyle(){
    return{
      width: `calc(60% + ${this.state.lineWidth}px)`,
      marginLeft: `calc(20% - ${this.state.lineLeft}px)`,
      transition: this.state.lineWidth > 0 ? '' : 'all 0.5s'
    }
  }
  changeType(currentType){
    this.setState({ currentType })
  }
  getList(){
    global.ajax.get('audio', { type: this.state.currentType }).then(res=>{
      if(res.code === 0){
        let {audios, i_resource, a_resource, page} = res.data
        this.props.setPlayer({ i_resource, a_resource })
        console.log(this.props)
      }
    })
  }
  toDetail() {
    this.props.reduce();
    this.props.history.push('/detail');
  }
  handleChangeIndex(currentType) {
    this.setState({ currentType })
  }
  handleTouchStart(e){
    let startX = e.targetTouches[0].clientX
    this.setState({ startX })
  }
  handleTouchMove(e){
    let endX = e.targetTouches[0].clientX
    if(endX - this.state.startX > 0){
      this.setState({ lineLeft: (endX - this.state.startX) / 10, lineWidth: (endX - this.state.startX) / 10 })
    }else{
      this.setState({ lineWidth: (this.state.startX - endX) / 10 })
    }
  }
  handleTouchEnd(e){
    this.setState({ lineWidth: 0, lineLeft: 0 })
  }
  onReachBottom(){
    console.log('滑动到底部了~')
  }
}

const mapStateToProps = state => {
  return {
    playList: state.player.list,
    playing: state.player.playing,
    player: state.player
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayer(player) {
      dispatch({ type: 'setPlayer', player })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);