import React, { Component } from 'react';
import './App.scss';

import { Route, Link } from 'react-router-dom';

import Login from './components/User/Login/Login';

import MainHeader from './components/general/MainHeader/MainHeader';
import Home from './components/general/Home/Home';

import PlacesList from './components/Places/PlacesList/PlacesList';
import EventsList from './components/Events/EventsList/EventsList';
import UserAccount from './components/User/UserAccount/UserAccount';

class App extends Component {
  render() {
    return (
      <div className="App">

        <MainHeader/>

        <main id="main-container">      

          <Route exact path="/" component={Login}/>
          <Route exact path="/inicio" component={Home}/>
          
          <Route exact path="/usuario/evento/nuevo" component={Home}/>
          <Route exact path="/usuario/eventos" component={Home}/>
          <Route exact path="/usuario/reservaciones" component={Home}/>
          
          <Route exact path="/lugares" component={PlacesList}/>
          <Route exact path="/eventos" component={EventsList}/>
          <Route exact path="/mi-cuenta" component={UserAccount}/>

        </main>

        <footer id="main-footer">
          footer
        </footer>
        

      </div>
    );
  }
}

export default App;
