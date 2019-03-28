
let defaultData = [
  { list: [], page: {} },   // 推荐
  { list: [], page: {} },   // 最热
  { list: [], page: {} },   // 原创
  { list: [], page: {} },   // 飙升
  { list: [], page: {} },   // 最新
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
      saveMusics[action.type] = action.data
      return saveMusics

    default:
      return state
  }
}

export { musics }