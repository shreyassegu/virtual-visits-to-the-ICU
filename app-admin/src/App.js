import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import {checkLogin} from './scripts/admin'
import Dashboard from './components/Dashboard.jsx';

class App extends Component {

  constructor() {
    super()
    this.loggedInfo = checkLogin()
  }
  render() {
    return (
      <div className="App">
        {
          (this.loggedInfo == null) ? <Login /> : <Dashboard admin = {this.loggedInfo}/>
        }
      </div>
    );
  }
}

export default App;
