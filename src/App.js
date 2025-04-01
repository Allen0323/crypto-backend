import React from 'react';
import './App.css';
import Login from './Login.tsx';
import Home from './Home.tsx';
import ProtectedRoute from './ProtectedRoute.js';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <ProtectedRoute path="/home" component={Home} />
    </Switch>
  )
}

export default App;
