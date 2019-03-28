
let defaultData = [
  { audios: [], page: {} },   // 推荐
  { audios: [], page: {} },   // 最热
  { audios: [], page: {} },   // 原创
  { audios: [], page: {} },   // 飙升
  { audios: [], page: {} },   // 最新
]
let musics = (state, action) => {
  if (typeof state === 'undefined') {
    return defaultData
  }
  switch (action.type) {
    case 'setMusics':
      return action.musics

    case 'saveMusics':
      let saveMusics = [].concat(state)
      saveMusics[action.musics.type] = { 
        audios: saveMusics[action.musics.type].audios.concat(action.musics.audios), 
        page: action.musics.page
      }
      return saveMusics

    default:
      return state
  }
}

export { musics }