import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Loadable, MyLoadingComponent } from './LazyLoad.js'

export default ()=>(
  <Router>
    <Switch>
      <Route path="/app" component={Loadable({ loader: () => import('@/page/home/Home.js'), loading: MyLoadingComponent })}></Route>
      <Route path="/music/detail" component={Loadable({ loader: () => import('@/page/music/detail/Detail.js'), loading: MyLoadingComponent })}></Route>
      <Route path="/login" component={Loadable({ loader: () => import('@/page/user/login/Login.js'), loading: MyLoadingComponent })}></Route>
      <Route path="/register" component={Loadable({ loader: () => import('@/page/user/register/Register.js'), loading: MyLoadingComponent })}></Route>
      <Redirect exact from="/" to="/app" />
    </Switch>
  </Router>
)