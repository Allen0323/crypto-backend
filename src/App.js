import React from 'react';
import './App.css';
import Login from './Login.tsx';
import Home from './Home.tsx';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
    </Switch>
  )
  //   const routes = useRoutes([
  //     { path: '/home', element: <Home /> },
  //     { path: '/', element: <Login /> },
  //     { path: '/login', element: <Login /> },
  // ]);
  // return routes;
}

export default App;
