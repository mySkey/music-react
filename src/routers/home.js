import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Loadable from 'react-loadable';
const MyLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>; // 全局loading组件，页面加载时
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;   // 全局
  } else {
    return null;
  }
};


const routes = [
  { path: '/', name: 'music', component: () => import('@/page/music/list/List.js') }
]
export default () => (
  <Router>
    <Switch>
      {
        routes.map(({ path, name, component }) => {
          return (
            <Route path={path} key={name} exact component={Loadable({ loader: component, loading: MyLoadingComponent })}></Route>
          )
        })
      }
    </Switch>
  </Router>
)