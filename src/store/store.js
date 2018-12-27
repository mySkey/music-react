import { createStore } from 'redux'
import userInfo from './modules/userinfo'
import counter from './modules/counter'
import player from './modules/player'

//store: 存储state数据，可以用getState方法来获取当前state,用createStore方法，传入reducer来得到store，一个应用对应一个store
export const store = { }
store.counter = createStore(counter)
store.userinfo = createStore(userInfo)
store.player = createStore(player)



