import React,{ Component } from 'react'
import { Loadable, MyLoadingComponent } from '@/routers/LazyLoad.js'
import { connect } from 'react-redux'
import style from './Home.css';
import { mapStateToProps, mapDispatchToProps } from '@/store/modules/counter.js'
import { Route, Redirect, Switch } from 'react-router-dom'


class Home extends Component{
  render(){
    return (
      <div>
        <div className={[style.navList, 'df-j-b'].join(' ')}>
        {
          this.state.navList.map((v,k)=>{
            return (
              <div onClick={() => this.changeNav(v, k)} className={[style.navItem, k === this.state.currentNav ? style.itemShow : ''].join(' ')} key={k}>
                <i className={"iconfont icon-" + v.icon}></i>
                <div className={style.navName}>{v.name}</div>
              </div>
            )
          })
        }
        </div>
        <Switch>
          <Route path="/app/music" component={Loadable({ loader: () => import('@/page/music/list/List.js'), loading: MyLoadingComponent })}></Route>
          <Route path="/app/fm" component={Loadable({ loader: () => import('@/page/fm/list/List.js'), loading: MyLoadingComponent })}></Route>
          <Route path="/app/news" component={Loadable({ loader: () => import('@/page/news/list/List.js'), loading: MyLoadingComponent })}></Route>
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
  componentWillUpdate() {

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
  changeNav(v, k){
    this.props.history.replace(v.path)
    this.setState({
      currentNav: k
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);