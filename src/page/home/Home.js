import React,{ Component } from 'react'
import { connect } from 'react-redux'
import './Home.css';
import { mapStateToProps, mapDispatchToProps } from '@/store/modules/counter.js'
import { Route } from 'react-router-dom'

import Music from '@/page/music/list/List.js'
import Fm from '@/page/fm/list/List.js'
import News from '@/page/news/list/List.js'

class Home extends Component{
  render(){
    return (
      <div>
        <div className="nav-list df-j-b">
        {
          this.state.navList.map((v,k)=>{
            return (
              <div onClick={()=>this.changeNav(v,k)} className="nav-item" key={k}>
                <i className={"iconfont icon-" + v.icon}></i>
                <div>{v.name}</div>
              </div>
            )
          })
        }
        </div>
        <Route path="/music" component={Music}></Route>
        <Route path="/fm" component={Fm}></Route>
        <Route path="/news" component={News}></Route>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      currentNav: 0,
      navList: [
        { path: '/music', name: '音乐', icon: 'music',   },
        { path: '/fm', name: '电台', icon: 'fm',   },
        { path: '/news', name: '新闻', icon: 'news',  },
      ]
    }
  }
  componentDidMount(){
    
  }
  toDetail(){
    this.props.reduce();
    this.props.history.push('/detail');
  }
  handleChangeIndex(index){
    console.log(index)
  }
  changeNav(v, k){
    this.props.history.replace(v.path)
    this.setState({
      currentNav: k
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);