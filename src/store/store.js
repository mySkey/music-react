import { createStore, combineReducers } from 'redux'
import { myInfo } from './reducer/myinfo'
import { counter } from './reducer/counter'
import { player } from './reducer/player'
import { news } from './reducer/news'
import { musics } from './reducer/music'

//store: 存储state数据，可以用getState方法来获取当前state,用createStore方法，传入reducer来得到store，一个应用对应一个store

let storeReducer = combineReducers({
  counter,
  myInfo,
  player,
  news,
  musics
})
export default createStore(storeReducer)


