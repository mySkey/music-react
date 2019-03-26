import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './List.css'
import SwipeableViews from 'react-swipeable-views';
import { mapStateToProps, mapDispatchToProps } from '@/store/modules/counter.js'
class Home extends Component {
  render() {
    return (
      <div>
        <div className={style.typeTitle}>
          <div className={[style.typeList, 'df-j-b'].join(' ')}>
            {
              this.state.types.map((v,k)=>{
                return(
                  <div onClick={()=>this.changeType(k)} className={[k===this.state.currentType ? style.itemShow : '', style.typeItem].join(' ')} key={k}>{v}</div>
                )
              })
            }
          </div>
          <div className={style.line}></div>
        </div>

        <SwipeableViews
          index={this.state.currentType}
          onTouchStart={e=>this.handleTouchStart(e)} 
          onTouchMove={e=>this.handleTouchMove(e)} 
          onTouchEnd={this.handleTouchEnd} 
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
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      types:['最新','最热','华语','韩文','英文','流行'],
      currentType: 0,
      startX: 0,
      endX: 0
    }
  }
  componentDidMount() {

  }
  changeType(currentType){
    this.setState({ currentType })
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
    this.setState({ endX })
  }
  handleTouchEnd(){

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);