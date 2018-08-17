import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home/home';
import HeaderComponent from './components/header/header';
class App extends Component {
  render() {
    return (
      <div className="h-100">
         <HeaderComponent />
         <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
