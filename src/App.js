import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './App.css';
import Pusher  from 'pusher-js';
import axios from './axios';
import Login from './Login';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const user = useSelector(state => state.user);
  return (
    <div className="app">
      <div className='app__body'>
        { !user ? (
              <Login />
        ) : (
        <Router>
          <Switch>
              <Route path='/rooms/:roomId'>
                <Sidebar />
                <Chat />
              </Route>
              <Route path='/'>
                <Sidebar />
              </Route>
          </Switch>
        </Router>
        ) }
      </div>
    </div>
  );
}

export default App;
