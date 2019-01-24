// 管理个人信息状态
let info = { 
  name: '邓boss',
  age: '23',
  position: '四川'
}

let myInfo = (state, action) => {
  if (typeof state === 'undefined') {
    return info
  }
  switch (action.type) {
    case 'GET':
      return state
    case 'EDIT':
      let { name, age } = action
      state = { name, age }
      return state
    default:
      return state
  }
}

export default myInfo;