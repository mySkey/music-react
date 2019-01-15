import React,{ Component } from 'react'
import './Home.css';
import Player from '@/components/Player.js'

import { store } from '@/store/store.js'
import { list, i_resource, a_resource } from '@/assets/music.js'
export default class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      status: 0
    }
  }
  render(){
    return (
      <div>
        {
          list.map((v,k)=>{
            return(
              <div onClick={(e)=>this.play(v, e)} className="item df" key={k}>
                <img src={i_resource + v.imgUrl} alt="歌曲封面" />
                <div className="info">
                  <h4>{v.sing}</h4>
                  <div>{v.singer}</div>
                </div>
              </div>
            )
          })
        }
        <Player></Player>
      </div>
    )
  }
  componentDidMount(){
    store.player.dispatch({type:'list', list})

  }
  play(v){
    global.audio.src = a_resource+v.musicUrl
    global.audio.play();
  }
}