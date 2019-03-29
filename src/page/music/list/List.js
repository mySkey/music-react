import React, { Component } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import style from './List.css'
import SwipeableViews from 'react-swipeable-views';
import ScrollWatch from '@/components/ScrollWatch.js'
import LoadMore from '@/components/LoadMore.js'

class Home extends Component {
  render() {
    return (
      <div>
        <div className={style.typeTitle}>
          <div className={[style.typeList, 'df-j-b'].join(' ')}>
            {
              this.state.types.map((v,k)=>{
                return(
                  <div onClick={() => this.handleChangeIndex(k)} style={{width: `${ 100 / this.state.types.length}%`}} className={[k===this.state.currentType ? style.itemShow : '', style.typeItem].join(' ')} key={k}>{v}</div>
                )
              })
            }
          </div>
          <div className={style.navSwiper}>
            <div style={this.sliderStyle()} className={style.navSlider}>
              <div style={this.lineStyle()} className={style.navLine}></div>
            </div>
          </div>
        </div>

        <SwipeableViews
          axis='x'
          index={this.state.currentType}
          onTouchStart={e=>this.handleTouchStart(e)} 
          onTouchMove={e=>this.handleTouchMove(e)} 
          onTouchEnd={e=>this.handleTouchEnd(e)} 
          onChangeIndex={(index)=>this.handleChangeIndex(index)}
        >
          {
            this.props.musics.map((v,k)=>{
              return(
                <div className={[this.state.currentType === k ? style.swiperShow : style.swiper].join(' ')} key={k}>
                  {
                    v.audios.map((e,i)=>{
                      return(
                        <div  onClick={() => this.props.history.push({pathname: '/music/detail', query:{id: e.id}})} className={[style.item, 'df'].join(' ')} key={i}>
                          <img className={style.item_cover} src={this.props.player.i_resource + e.cover + '-cover'} alt='歌曲封面' />
                          <div className={[style.item_info, 'df-1'].join(' ')}>
                            <h3 className={style.item_name}>{e.name}</h3>
                            <div className={[style.singer_name, 'df'].join(' ')}>
                              <div className={style.singer_avatar}>
                                <img className={style.avatar_img} src={this.props.player.i_resource + e.singer.avatar + '-avatar'} alt='歌手头像' />
                              </div>
                              {e.singer.name}
                            </div>
                            <div className={style.item_date}>{this.dateFormat(e.date)}</div>
                          </div>
                        </div>
                      )
                    })
                  }
                  <LoadMore loading={this.state.loadingArr[k]}></LoadMore>
                </div>
              )
            })
          }
        </SwipeableViews>
        <ScrollWatch onReachBottom={this.onReachBottom.bind(this)}></ScrollWatch>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      types:['推荐','最热','原创','飙升','最新'],
      currentType: 0,
      startX: 0,
      endX: 0,
      lineWidth: 0,
      lineLeft: 0,
      loadingArr: [0,0,0,0,0]
    }
    this.p = 1
  }
  componentDidMount() {
    let currentType = Math.floor(global.common.getQuery(this.props.history.location.search).tab) || 0
    if(this.props.musics[currentType].audios.length === 0){
      this.setState({ currentType }, () => this.getList())
    }
  }
  sliderStyle(){
    return{
      width: `${ 100 / this.state.types.length}%`, 
      left: `${this.state.currentType * (100 / this.state.types.length)}%`
    }
  }
  dateFormat(t){
    return dayjs(t * 1000).format('YYYY.MM.YY')
  }
  lineStyle(){
    return{
      width: `calc(60% + ${this.state.lineWidth}px)`,
      marginLeft: `calc(20% - ${this.state.lineLeft}px)`,
      transition: this.state.lineWidth > 0 ? '' : 'all 0.5s'
    }
  }
  onReachBottom() {
    let currentType = this.state.currentType
    if (this.state.loadingArr[currentType] !== 0) return
    if (this.props.musics[currentType].page.p >= this.props.musics[currentType].page.total_page) {
      let loadingArr = this.state.loadingArr
      loadingArr[currentType] = 2
      this.setState({ loadingArr })
      return
    }
    this.p = this.props.musics[currentType].page.p + 1
    this.getList()
  }
  getList(){
    const type = this.state.currentType;
    let loadingArr = this.state.loadingArr
    loadingArr[type] = 1
    this.setState({ loadingArr })
    global.ajax.get('audio', { type, p: this.p }).then(res=>{
      loadingArr[type] = 0
      this.setState({ loadingArr })
      if(res.code === 0){
        let {audios, i_resource, a_resource, page} = res.data
        this.props.setPlayer({ i_resource, a_resource })
        this.props.saveMusics({ type, page, audios })
        console.log(this.props.musics)
      }
    })
  }
  toDetail() {
    this.props.reduce();
    this.props.history.push('/detail');
  }
  handleChangeIndex(currentType) {
    this.props.history.replace('/app/music?tab=' + currentType)
    this.p = this.props.musics[currentType].page.p || 1
    this.setState({ currentType }, () => {
      if(this.props.musics[currentType].audios.length === 0){
        this.getList()
      }
    })
  }
  handleTouchStart(e){
    let startX = e.targetTouches[0].clientX
    this.setState({ startX })
  }
  handleTouchMove(e){
    e.stopPropagation()
    let endX = e.targetTouches[0].clientX
    if (endX - this.state.startX > 0) {
      this.setState({ lineLeft: (endX - this.state.startX) / 10, lineWidth: (endX - this.state.startX) / 10 })
    } else {
      this.setState({ lineWidth: (this.state.startX - endX) / 10 })
    }
  }
  handleTouchEnd(e){
    this.setState({ lineWidth: 0, lineLeft: 0 })
  }
}

const mapStateToProps = state => {
  return {
    playList: state.player.list,
    playing: state.player.playing,
    player: state.player,
    musics: state.musics
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayer(player) {
      dispatch({ type: 'setPlayer', player })
    },
    setMusics(musics){
      dispatch({ type: 'setMusics', musics })
    },
    saveMusics(musics){
      dispatch({ type: 'saveMusics', musics })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);