let musics = {
  list: [],
  current_misic: 0,
  mode: 0,      // 0 单曲    1 顺序   2 随机
  status: 0,    // 0 未播放  1 播放   2 暂停中  3 已结束
  a_resource: 'http://audio.22family.com/',
  i_resource: 'http://audio.22family.com/myplayer/mini/',
  playing: {
    cover: '',
    rotate: 0,
    singer: '',
    avatar: '',
    current_time: '',
    duration_time: ''
  }
}

let player = (state = musics, action)=>{
  if (typeof state === 'undefined') {
    return state
  }
  switch (action.type) {
    case 'list':
      return state
    case 'play':
      return state
    case 'pause':
      return state
    default:
      return state;
  }
}

export default player