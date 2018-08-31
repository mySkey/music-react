1.安装环境
npm install -g create-react-app

create-react-app '项目名'

npm install

npm start

2.打开webpack配置

npm run eject

3.关于打包问题

  不生成map文件，prod文件57行注释掉

  打包生成打包报告

  npm install webpack-bundle-analyzer --save-dev

  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  plugins:[
     ...
     new BundleAnalyzerPlugin()
  ]

  "analyze": "source-map-explorer dist/static/js/main.*"

4.使用redux

  安装  npm install --save redux
	npm install --save-dev redux-devtools


5.react中使用路由

  npm install --save react-router-dom

  新建router.js，也是一个react组件

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

6.react-router 4.0 路由懒加载

  参考文档https://segmentfault.com/a/1190000011128817

  1.安装babel-plugin-syntax-dynamic-import
    在.babelrc文件的plungins中加上"syntax-dynamic-import"

  2.安装 react-loadable

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

 