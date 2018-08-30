import { createStore } from 'redux'
// let appState = {
//   title: {
//     text: 'React.js 小书',
//     color: 'red',
//   },
//   content: {
//     text: 'React.js 小书内容',
//     color: 'blue'
//   }
// }
export let action = {
  add(text) { return { type: 'ADD', text } },
  del(text) { return { type: 'DEL', text } }
}

//定义reducer：用switch来匹配发出的操作信息并改变state
let counter = (state, action)=>{
  if (typeof state === 'undefined') {
    return 0
  }
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'RED':
      return state - 1
    default:
      return state
  }
}

let myInfo = { name: '邓boss', age: '23' }
let userInfo = (state, action)=>{
  if (typeof state === 'undefined') {
    return myInfo
  }
  switch (action.type) {
    case 'GET':
      return state
    case 'EDIT':
      let {name,age} = action
      state = {name,age}
      return state
    default:
      return state
  }
}



//store: 存储state数据，可以用getState方法来获取当前state,用createStore方法，传入reducer来得到store，一个应用对应一个store
export const store={}
store.counter = createStore(counter)
store.userinfo = createStore(userInfo)




