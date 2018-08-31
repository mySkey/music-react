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