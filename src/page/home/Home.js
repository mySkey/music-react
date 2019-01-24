import React,{ Component } from 'react'
import { connect } from 'react-redux'
import './Home.css';

import { list, i_resource, a_resource } from '@/assets/music.js'

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    add(){
      dispatch({ type: 'add' });
    },
    reduce(){
      dispatch({ type: 'reduce' })
    },
    set(value){
      dispatch({ type: 'set', value })
    }
  };
}
class Home extends Component{
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

  }
  toDetail(){
    this.props.reduce();
    this.props.history.push('/detail');
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);