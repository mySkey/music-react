//定义reducer：用switch来匹配发出的操作信息并改变state
let counter = (state, action) => {
  if (typeof state === 'undefined') {
    return 0
  }
  switch (action.type) {
    case 'add':
      return state + 1
    case 'reduce':
      return state - 1
    default:
      return state
  }
}

export default counter;