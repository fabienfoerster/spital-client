import React, { Component } from 'react';
import './App.css';
import ListingView from './ListingView';
import MenuPrincipal from './MenuPrincipal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Router, Route, hashHistory } from 'react-router'



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Saint Joseph Hospital</h2>
        </div>
        <MuiThemeProvider>
          <Router history={hashHistory}>
            <Route path="/" component={MenuPrincipal}/>
            <Route path="/listing" component={ListingView}/>
          </Router>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
