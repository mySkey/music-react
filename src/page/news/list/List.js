import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './List.css'
import { mapStateToProps, mapDispatchToProps } from '@/store/modules/news.js'
class News extends Component {
  render() {
    return (
      <div>
        {
          this.props.news.map((v,k)=>{
            return(
              <div className={style.item} key={k}>{v.title}</div>
            )
          })
        }

        {/* <ScrollWatch pageTop={100} onReachBottom={this.onReachBottom.bind(this)}></ScrollWatch> */}
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: 0
    }
    this.con = {
      p: 1
    }
    this.hadleScroll = ()=>{
      const scrollTop = window.scrollY;
      const offsetHeight = window.innerHeight;
      const scrollHeight = document.body.scrollHeight;
      if (scrollTop + offsetHeight >= scrollHeight -10) {
        this.onReachBottom();
      }
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.hadleScroll)
    console.log(this.props.news)
    if(this.props.news.length===0){
      this.getList()
    }
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.hadleScroll)
  }
  // hadleScroll(){
  //   const scrollTop = window.scrollY;
  //   const offsetHeight = window.innerHeight;
  //   const scrollHeight = document.body.scrollHeight;
  //   if (scrollTop + offsetHeight >= scrollHeight -10) {
  //     this.onReachBottom();
  //   }
  // }
  onReachBottom(){
    if(this.state.loading !== 0) return
    if(this.props.page.p >= this.props.page.total_page){
      this.setState({ loading: 2 })
      return
    }
    this.con.p = this.props.page.p + 1
    this.getList()
  }
  getList(){
    this.setState({ loading: 1 })
    global.ajax.get('news', this.con).then(res=>{
      this.setState({ loading: 0 })
      if(res.code === 0){
        let { news, page } = res.data;
        this.props.add({ news, page })
      }
    })
  }
  toDetail() {
    this.props.reduce();
    this.props.history.push('/detail');
  }
  handleChangeIndex(index) {
    console.log(index)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);