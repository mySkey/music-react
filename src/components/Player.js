import React, { Component } from 'react'
import './Player.css'

import { store } from '@/store/store.js'

export default class Player extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    return(
      <div className="player">
        <div className="swiper">
          <div className="slider"></div>
          <div className="disc"></div>
        </div>
        <div className="content">
          <div>
            <img src={''} alt="头像" />
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    store.player.subscribe(() => {
      this.state.player = store.player.getState();
      //console.log(this.state)
    });
  }
}