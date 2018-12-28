import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

//import Home from '../page/home/Home.js'
//import Login from '../page/login/Login.js'
//import Register from '../page/register/Register.js'

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
    </Switch>
  </Router>
)