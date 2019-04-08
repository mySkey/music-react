### 扫码预览

<div align=center><img src="http://img.22family.com/mySKey/music-react.png" /></div>


### 1.安装环境
* npm install -g create-react-app

* create-react-app '项目名'

* npm install

* npm start

### 2.打开webpack配置

* npm run eject

### 3.关于打包问题

  * 不生成map文件，prod文件57行注释掉

  * 打包生成打包报告

  * npm install webpack-bundle-analyzer --save-dev

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins:[
    ...
    new BundleAnalyzerPlugin()
]

"analyze": "source-map-explorer dist/static/js/main.*"
```


### 4.react中使用路由

  * npm install --save react-router-dom

  * 新建router.js，也是一个react组件

```javascript
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../page/home/Home.js'
import Login from '../page/login/Login.js'
import Register from '../page/register/Register.js'


export default ()=>(
  <Router>
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </Switch>
  </Router>
)
```

### 5.react-router 4.0 路由懒加载

  * <a href="https://segmentfault.com/a/1190000011128817" target="_blank">路由懒加载参考文档</a>

  * 1.安装babel-plugin-syntax-dynamic-import
    > 在.babelrc文件的plungins中加上"syntax-dynamic-import"

  * 2.安装 react-loadable

```javascript
import Loadable from 'react-loadable';
const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};
const Home = Loadable({
  loader: () => import('../page/home/Home.js'),
  loading: MyLoadingComponent
});
```

### 6.redux + react-redux使用<a href="https://www.redux.org.cn/" target="_blank">redux中文文档</a>

* <a href="https://github.com/mySkey/redux-demo" target="_blank">GIT仓库demo地址</a>
>

### Why？ 为什么要用redux？

> 解决react组件间传值，并且要状态动态更新麻烦的问题。redux就是个中央仓库，将数据存在了一个地方，而且只能通过定义了的方法来更改，保证了数据的唯一性和稳定性

### 一、安装

```npm
npm install redux --save
```

* 如果只用redux的话，那么状态更改了，只能通过subscribe的回调中得到新的状态，那么还是一样繁琐，所以一般与react-redux一起使用

```npm
npm install react-redux --save
```

* react-redux中的Provider组件，redux生成的store传入就能传递到每个组件中，react-redux的Provider就是如下实现的

```javascript
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}
```

### 二、编写Reducer

```javascript
// /store/counter.js
const counter =  (state, action) => {
  if (typeof state === 'undefined') {
    return 0
  }
  switch (action.type) {
    case 'add':
      return state + 1
    case 'reduce':
      return state - 1
    case 'set':
      return action.value
    default:
      return state
  }
}

export default counter;
```

### 三、创建store并绑定到Provider上

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counter from './store/counter.js'

const store = createStore(counter)

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
```

### 四、在组件中得到state，并dispatch

* 使用react-redux的connect，将Provider的store中的state和需要的dispatch连接到现在的组件，那么在组件中就能直接使用this.prop访问到属性和方法
>
```javascript
import React, { Component } from 'react'
import  './Detail.css'
import { connect } from 'react-redux'

class Detail extends Component{
  constructor(props){
    super(props)
    this.state = {
      styleObj: { background: '#00bcd4' }
    }
  }
  render(){
    return(
      <div className="detail" style={this.state.styleObj}>
        <h4>{this.props.myInfo.name}</h4>
        <p onClick={() => this.props.add()}>设置名字</p>
      </div>
    )
  }
  componentWillMount(){
    console.log(this.props.counter)
  }
}

const mapStateToProps = state => {
  return {
    counter: state
  }
}

const mapDispatchToProps = dispatch => {
  return{
    add() {
      dispatch({ type: 'add' })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail)
```

### 五、参考文献

* <a href="http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html" target="_blank">阮一峰Redux 入门教程（三）</a>
>
* <a href="https://www.cnblogs.com/bax-life/p/8440326.html" target="_blank">真铁头娃redux和react-redux小记</a>
>
 

 ### 六、路由的嵌套

 react-router4没法直接嵌套写路由，嵌套的路由在组件中写，就像真的路由也是组件

router.js中的路由配置

```javascript
<Router>
  <Switch>
    <Route path="/app" component={Loadable({ loader: () => import('@/page/home/Home.js'), loading: MyLoadingComponent })}></Route>
    <Route path="/login" component={Loadable({ loader: () => import('@/page/user/login/Login.js'), loading: MyLoadingComponent })}></Route>
    <Route path="/register" component={Loadable({ loader: () => import('@/page/user/register/Register.js'), loading: MyLoadingComponent })}></Route>
    <Redirect exact from="/" to="/app" />
  </Switch>
</Router>
```

然后在Home.js中配置它的子路由

 ```javascript
<Switch>
  <Route path="/app/music" component={Music}></Route>
  <Route path="/app/fm" component={Fm}></Route>
  <Route path="/app/news" component={News}></Route>
  <Redirect exact from="/app" to="/app/music" />
</Switch>
 ```

 ### 七、css模块化

 如果不修改webpack的配置，那么父组件的样式重名类名的时候会影响子组件的样式，配置后会把类型打包hash值，将modules 设置为 true

 ```javascript
module.exports = {
  module: {
    rulers:[
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
    ]
  }
}
 ```

 然后在js文件中引入时也有变化

 ```javascript
import style from './Home.css'
import React,{ Component } from 'react'

class Home extends Component{
  render(){
    return(
      <div className={style.home}></div>
    )
  }
}
 ```

 最后就是全局的css，公用的类，这时你引入到index.js里面将会失效了，可以在index.html里面link引入

 ### 八、使用redux异步存储数据时和react-loadable会冲突，会一直陷入组件挂载中循环

 ### 九、使用监听的问题

 * 添加监听如果不绑定当前的作用域，那么将无法在监听的回调用调用当前类的方法

 ```javascript
componentDidMount() {
  window.addEventListener('scroll', this.hadleScroll)
  console.log(this.props.news)
  if(this.props.news.length===0){
    this.getList()
  }
}
componentWillUnmount(){
  window.removeEventListener('scroll', this.hadleScroll)
}
hadleScroll(){
  this.scroll()   // scroll将会是undefined
}
scroll(){

}
 ```

* 但是绑定了当前作用域的话将会无法清除监听

 ```javascript
componentDidMount() {
  window.addEventListener('scroll', this.hadleScroll.bind(this))
  console.log(this.props.news)
  if(this.props.news.length===0){
    this.getList()
  }
}
componentWillUnmount(){
  window.removeEventListener('scroll', this.hadleScroll.bind(this))
}
hadleScroll(){
  this.scroll()   // 这时能调用scroll函数了，但是切换到别的路由，监听并没有移除
}
scroll(){

}
 ```

 最终解决方案是，将监听的回调函数设置成变量

  ```javascript
constructor(props){
  super(props)
  this.hadleScroll = ()=>{
    this.scroll()
  }
}
componentDidMount() {
  window.addEventListener('scroll', this.hadleScroll
  console.log(this.props.news)
  if(this.props.news.length===0){
    this.getList()
  }
}
componentWillUnmount(){
  window.removeEventListener('scroll', this.hadleScroll
}
scroll(){

}
 ```


### End、学习需求（vue中有的特性）

* 全局监听滚动，向每个路由分发一个事件，比如滚动到底了，调用当前路由的onReachBottom

* 路由的切换如何记忆该路由的滚动位置，下次切换过来，直接到这个位置