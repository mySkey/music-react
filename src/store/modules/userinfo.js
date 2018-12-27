// 管理个人信息状态
let myInfo = { name: '邓boss', age: '23' }

let userInfo = (state, action) => {
  if (typeof state === 'undefined') {
    return myInfo
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

export default userInfo;