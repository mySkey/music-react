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
    return musics
  }
  switch (action.type) {
    case 'list':
      return Object.assign({}, state, {
        list: action.list
      })
    case 'play':
      global.audio.src = action.src
      global.audio.play()
      return Object.assign({}, state, {
        status: 1
      })
    case 'pause':
      global.audio.pause()
      return Object.assign({}, state, {
        status: 2
      })
    default:
      break;
  }
}

export default player