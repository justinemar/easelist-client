import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import IndexComponent from "./components/index";
import SearchResult from "./components/SearchResult/index";
import { ModalProvider } from "./components/accountForm/index";
import HeaderComponent from "./components/Header/header";
import { AuthServiceWithRouter } from "./utils/index";
import { PropertyProvider } from "./contexts/properties-context";

import "./App.scss";
// import 'bulma/css/bulma.css'

function Province() {
  return (
    <div>
      <h1>No match</h1>
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <AuthServiceWithRouter>
        <ModalProvider>
          <HeaderComponent />
        </ModalProvider>
        <Router>
          <Route
            exact
            path="/"
            render={props => <IndexComponent {...props} />}
          />

          <Route
            exact
            path="/:provinceParam/:searchParam"
            render={props => (
              <PropertyProvider {...props}>
                <SearchResult {...props} />
              </PropertyProvider>
            )}
          />

          <Route exact path="/:province/" component={Province} />
        </Router>
      </AuthServiceWithRouter>
    </div>
  );
}

export default App;
