import React, { Component } from 'react';
import './App.scss';

import { Route, Link } from 'react-router-dom';

import Login from './components/User/Login/Login';

import Home from './components/general/Home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">

        <header id="main-header">
          HEADER
        </header>

        <main id="main-container">      

          <Route exact path="/" component={Login}/>
          <Route exact path="/inicio" component={Home}/>
          <Route exact path="/usuario/evento/nuevo" component={Home}/>
          <Route exact path="/usuario/eventos" component={Home}/>
          <Route exact path="/usuario/reservaciones" component={Home}/>
          <Route exact path="/lugares" component={Home}/>

        </main>

        <footer id="main-footer">
          footer
        </footer>
        

      </div>
    );
  }
}

export default App;
