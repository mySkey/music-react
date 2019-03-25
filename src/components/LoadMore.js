import React,{ Component } from 'react'
import style from './LoadMore.css'

export default class LoadMore extends Component{
  getLoading(){
    switch (this.props.loading){
      case 1:
        return(
          <div className={style.wrap}>
            <div className={style.loadingDot}>
              <div className={[style.dot, style.dot1].join(' ')}></div>
              <div className={[style.dot, style.dot2].join(' ')}></div>
              <div className={[style.dot, style.dot3].join(' ')}></div>
            </div>
          </div>
        )
      case 2:
        return(
          <div className={style.wrap}>
            <div className={style.all}>我也是有底线的~~~</div>
          </div>
        )
      case 3:
        return(
          <div className={style.wrap}>
            <div className={style.all}>暂无数据</div>
          </div>
        )
      default:
          return(
            <div className={style.wrap}>
              <div className={style.placeholder}></div>
            </div>
          )
    }
  }
  render(){
    return(
      <div>{ this.getLoading() }</div>
    )
  }
}