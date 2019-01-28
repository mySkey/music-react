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


const routes = [
  { path: '/', name: 'home', component: () => import('../page/home/Home.js') },
  { path: '/login', name: 'login', component: () => import('../page/user/login/Login.js') },
  { path: '/register', name: 'register', component: () => import('../page/user/register/Register.js') },
  { path: '/detail', name: 'detail', component: () => import('../page/music/detail/Detail.js') },
]
export default ()=>(
  <Router>
    <Switch>
      {
        routes.map(({path, name, component})=>{
          return (
            <Route path={path} key={name} exact component={Loadable({ loader: component, loading: MyLoadingComponent })}></Route>
          )
        })
      }
    </Switch>
  </Router>
)