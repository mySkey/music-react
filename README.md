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
 