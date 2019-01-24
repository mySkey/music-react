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
    case 'setName':
      return Object.assign({}, state, { name: action.name })
    default:
      return state
  }
}

const mapStateToProps = state => {
  return {
    myInfo: state.myInfo
  }
}

const mapDispatchToProps = dispatch => {
  return{
    setName(name) {
      dispatch({ type: 'setName', name })
    }
  }
}
export { myInfo, mapStateToProps, mapDispatchToProps }