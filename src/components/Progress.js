import React, { Component } from 'react'

export default class Progress extends Component{
  render(){
    return(
      <div>
        <div id="swiper" onTouchStart={(e) => this.swiperTouch(e)} style={this.getSwiperStyle()}>
          <div style={this.getLineStyle()}></div>
          <div onTouchStart={(e) => this.touchStart(e)} onTouchMove={(e) => this.touchMove(e)} onTouchEnd={(e) => this.touchEnd(e)} style={this.getSliderStyle()}></div>
        </div>
      </div>
    )
  }

  constructor(props){
    super(props)
    this.state = {
      left: 0,
      sliderW: 12
    }
  }
  componentDidMount(){

  }
  getSwiperStyle(){
    return {
      width: '100%',
      height: '6px',
      background: '#d2d2d2',
      margin: '20px 0',
      position: 'relative',
      borderRadius: '6px'
    }
  }
  getSliderStyle() {
    return {
      width: `${this.state.sliderW}px`,
      height: `${this.state.sliderW}px`,
      borderRadius: '50%',
      background: '#33c9d4',
      position: 'absolute',
      left: this.state.left,
      top: `${-(this.state.sliderW / 2 - 3)}px`
    }
  } 
  getLineStyle(){
    return {
      width: this.state.left,
      height: '6px',
      background: '#dd5866',
      position: 'absolute',
      left: 0,
      top: 0,
      borderRadius: '6px 0 0 6px'
    }
  }

  touchStart(e){
    e.stopPropagation()
    this.setState({ sliderW: 18 })
  }
  touchMove(e) {
    let endX = e.targetTouches[0].clientX
    let swiperDom = document.getElementById('swiper')
    let startX = swiperDom.offsetLeft
    if (endX - startX <= 0){
      this.setState({ left: 0 })
      return
    }
    if (endX - startX >= swiperDom.offsetWidth){
      this.setState({ left: swiperDom.offsetWidth })
      return
    }
    this.setState({ left: endX - startX })
  }
  touchEnd() {
    let swiperDom = document.getElementById('swiper')
    this.setState({ sliderW: 12 })
    this.props.changeProgress(this.state.left / swiperDom.offsetWidth)
  }
  swiperTouch(e) {
    let swiperDom = document.getElementById('swiper')
    let endX = e.targetTouches[0].clientX
    let startX = swiperDom.offsetLeft
    this.setState({ left: endX - startX })
    this.props.changeProgress((endX - startX) / swiperDom.offsetWidth)
  }
}