import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthServiceWithRouter } from "./utils/index";
import { PropertyProvider } from "./contexts/properties-context";
import { ModalProvider } from "./components/accountForm/index";
import IndexComponent from "./components/index";
import SearchResult from "./pages/SearchResult/index";
import HeaderComponent from "./components/Header/header";
import UserProfile from "./pages/profile";
import "./App.scss";
// import 'bulma/css/bulma.css'

function Province() {
  return (
    <div>
      <h1>Provinces.</h1>
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <Router>
        <AuthServiceWithRouter>
          <ModalProvider>
            <HeaderComponent />
          </ModalProvider>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <IndexComponent {...props} />}
            />
            <Route
              path="/user/profile"
              render={props => <UserProfile {...props} />}
            />
            <Route path="/:provinceParam/" component={Province} />
            <Route
              path="/:provinceParam/:searchParam"
              render={props => (
                <PropertyProvider {...props}>
                  <SearchResult {...props} />
                </PropertyProvider>
              )}
            />
          </Switch>
        </AuthServiceWithRouter>
      </Router>
    </div>
  );
}

export default App;
