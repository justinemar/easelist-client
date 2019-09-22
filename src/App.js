import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import IndexComponent from './components/index';
import SearchResult from './components/SearchResult/index';
import HeaderComponent from './components/Header/header';
import './App.scss';
// import 'bulma/css/bulma.css'

function App() {
  return (
    <div className="App">
                  <HeaderComponent/>
      <Router>
        <Route exact path="/" render={(props) => <IndexComponent {...props}/>} />
        <Route path="/places" render={(props) => <SearchResult {...props}/>} />
      </Router>
    </div>
  );
}

export default App;
