import React,{ Component } from 'react'
import { connect } from 'react-redux'
import style from './Home.css';
import { mapStateToProps, mapDispatchToProps } from '@/store/modules/counter.js'
import { Route, Redirect, Switch } from 'react-router-dom'

import Music from  '@/page/music/list/List.js'
import Fm from  '@/page/fm/list/List.js'
import News from  '@/page/news/list/List.js'

class Home extends Component{
  render(){
    return (
      <div>
        <div className={[style.navList, 'df-j-b'].join(' ')}>
        {
          this.state.navList.map((v,k)=>{
            return (
              <div onClick={(e) => this.changeNav(v, k, e)} className={[style.navItem, k === this.state.currentNav ? style.itemShow : ''].join(' ')} key={k}>
                <i className={"iconfont icon-" + v.icon}></i>
                <div className={style.navName}>{v.name}</div>
              </div>
            )
          })
        }
        </div>
        <Switch>
          <Route path="/app/music" component={Music}></Route>
          <Route path="/app/fm" component={Fm}></Route>
          <Route path="/app/news" component={News}></Route>
          <Redirect exact from="/app" to="/app/music" />
        </Switch>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      currentNav: 0,
      navList: [
        { path: '/app/music', name: '音乐', icon: 'music',   },
        { path: '/app/fm', name: '电台', icon: 'fm',   },
        { path: '/app/news', name: '新闻', icon: 'news',  },
      ]
    }
  }
  componentWillMount(){
    
  }
  componentDidMount(){
    this.state.navList.forEach((v,k)=>{
      if (v.path === this.props.location.pathname){
        this.setState({ currentNav: k })
      }
    })
  }
  componentWillUpdate(){
    document.getElementById('root').scrollIntoView(true);//为ture返回顶部，false为底部
  }
  componentDidUpdate(){

  }
  componentWillUnmount(){

  }
  toDetail(){
    this.props.reduce();
    this.props.history.push('/detail');
  }
  handleChangeIndex(index){
    console.log(index)
  }
  changeNav(v, k, e){
    e.stopPropagation();
    this.props.history.replace(v.path)
    this.setState({
      currentNav: k
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);