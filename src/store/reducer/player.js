let musicInfo = {
  list: [],
  current_music: 0,
  mode: 0,      // 0 单曲    1 顺序   2 随机
  status: 0,    // 0 未播放  1 播放   2 暂停中  3 已结束
  a_resource: '',
  i_resource: '',
  playing: {
    cover: '',
    rotate: 0,
    rate: 1,
    singer: '',
    avatar: '',
    currentTime: 0,
    duration: 0
  }
}

let player = (state = musicInfo, action)=>{
  if (typeof state === 'undefined') {
    return state
  }
  switch (action.type) {
    case 'last':
      let last_music = state.current_music > 0 ? state.current_music - 1 : state.current_music
      return Object.assign({}, state, { current_music: last_music })

    case 'next':
      let next_music = state.current_music < state.list.length - 1 ? state.current_music + 1 : state.current_music
      return Object.assign({}, state, { current_music: next_music })

    case 'setRate':
      let rateState = Object.assign({}, state)
      rateState.playing = Object.assign({}, state.playing, { rate: action.rate })
      return rateState

    case 'setCurrentTime':
      let currentTimeState = Object.assign({}, state)
      currentTimeState.playing = Object.assign({}, state.playing, { currentTime: action.currentTime })
      return currentTimeState

    case 'setDuration':
      let durationState = Object.assign({}, state)
      durationState.playing = Object.assign({}, state.playing, { duration: action.duration })
      return durationState

    case 'setMode':
      return Object.assign({}, state, { mode: action.mode })

    case 'play':
      return Object.assign({}, state, { status: 1 })

    case 'pause':
      return Object.assign({}, state, { status: 2 })

    case 'setPlayer':
      return Object.assign({}, state, action.player)

    default:
      return state;
  }
}

export { player }