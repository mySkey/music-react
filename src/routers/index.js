import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Loadable from 'react-loadable';
const MyLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>; // 全局loading组件，页面加载时
  }else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;   // 全局
  }else {
    return null;
  }
};


export default ()=>(
  <Router>
    <Switch>
      <Route path="/" component={Loadable({ loader: () => import('@/page/home/Home.js'), loading: MyLoadingComponent })}></Route>
      <Route path="/login" component={Loadable({ loader: () => import('@/page/user/login/Login.js'), loading: MyLoadingComponent })}></Route>
      <Route path="/register" component={Loadable({ loader: () => import('@/page/user/register/Register.js'), loading: MyLoadingComponent })}></Route>
    </Switch>
  </Router>
)