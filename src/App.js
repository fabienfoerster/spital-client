import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListingView from './ListingView';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class App extends Component {
  render() {
    var data = [{"id":1,"name":"Chabichou","last_modified":1471705676091925633,"information":"","specialty":1},{"id":2,"name":"Valou","last_modified":1471705751371938459,"information":"","specialty":2},{"id":3,"name":"Fabien","last_modified":1471705764534589054,"information":"","specialty":3}];

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <MuiThemeProvider>
          <ListingView data={data} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
