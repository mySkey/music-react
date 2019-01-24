import React,{ Component } from 'react'
import { connect } from 'react-redux'
import './Home.css';

import { list, i_resource, a_resource } from '@/assets/music.js'
import { mapStateToProps, mapDispatchToProps } from '@/store/modules/counter.js'
class Home extends Component{
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
              <div className="item df" key={k}>
                <img onClick={()=>this.toDetail()} src={i_resource + v.imgUrl} alt="歌曲封面" />
                <div onClick={this.props.add} className="info">
                  <h4>{v.sing}{this.props.counter}</h4>
                  <div>{v.singer}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
  componentDidMount(){
    console.log(a_resource)
  }
  toDetail(){
    this.props.reduce();
    this.props.history.push('/detail');
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);