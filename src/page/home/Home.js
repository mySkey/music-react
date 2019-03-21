import React,{ Component } from 'react'
import { connect } from 'react-redux'
import './Home.css';
import { mapStateToProps, mapDispatchToProps } from '@/store/modules/counter.js'
import HomeRoute from '@/routers/home.js'
class Home extends Component{
  render(){
    return (
      <div>
        <HomeRoute></HomeRoute>
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
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      currentNav: 0,
      navList: [
        { name: '音乐', icon: 'music', path: '/music',  },
        { name: '电台', icon: 'fm', path: '/fm',  },
        { name: '新闻', icon: 'news', path: '/news',  },
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
    console.log(v,k)
    this.props.history.replace(v.path)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);