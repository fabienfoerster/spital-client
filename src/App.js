import React, { Component } from 'react';
import './App.css';
import ListingView from './ListingView';



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Saint Joseph Hospital</h2>
        </div>
          <ListingView />
      </div>
    );
  }
}

export default App;
