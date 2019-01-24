import { createStore, combineReducers } from 'redux'
import { myInfo } from './modules/myinfo'
import { counter } from './modules/counter'
import { player } from './modules/player'

//store: 存储state数据，可以用getState方法来获取当前state,用createStore方法，传入reducer来得到store，一个应用对应一个store

let storeReducer = combineReducers({
  counter,
  myInfo,
  player
})
export default createStore(storeReducer)


