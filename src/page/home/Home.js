import React,{ Component } from 'react'
import './Home.css';

import { store } from '@/store/store.js'
import { list, i_resource, a_resource } from '@/assets/music.js'
export default class Home extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
      <div>
        {
          list.map((v,k)=>{
            return(
              <div onClick={(e)=>this.play(v, e)} className="item df" key={k}>
                <img src={i_resource + v.imgUrl} />
                <div>

                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
  componentDidMount(){
    store.player.dispatch({type:'list', list})
    console.log(store.player.getState())
    this.getList()
  }
  play(v){
    global.audio.src = a_resource+v.musicUrl
    global.audio.play();
  }
  getList(){
    global.ajax.get('http://api.blog.22family.com/api/lrc', { music: '起风了' }).then(res=>{
      console.log(global.common.analysis(res))
    })
  }
}