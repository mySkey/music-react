import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Loadable from 'react-loadable';
const MyLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }else {
    return null;
  }
};

const Home = Loadable({
  loader: () => import('../page/home/Home.js'),
  loading: MyLoadingComponent
})
const Detail = Loadable({
  loader: () => import('../page/music/detail/Detail.js'),
  loading: MyLoadingComponent
})
const Login = Loadable({
  loader: () => import('../page/user/login/Login.js'),
  loading: MyLoadingComponent
});
const Register = Loadable({
  loader: () => import('../page/user/register/Register.js'),
  loading: MyLoadingComponent
});

export default ()=>(
  <Router>
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/detail" component={Detail}></Route>
    </Switch>
  </Router>
)