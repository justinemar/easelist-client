import React, { useContext } from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { AuthServiceWithRouter, AuthServiceContext } from "./utils/index";
import { PropertyProvider } from "./contexts/properties-context";
import { ModalProvider } from "./components/accountForm/index";
import IndexComponent from "./components/index";
import SearchResult from "./pages/SearchResult";
import SelectedProperty from "./pages/SearchResult/SelectedProperty";

import HeaderComponent from "./components/Header/header";
import DashBoard from "./pages/Dashboard";
import ListProperty from "./pages/ListProperty/list";
import "./App.scss";
// import 'bulma/css/bulma.css'

function Province() {
  return (
    <div>
      <h1>Provinces.</h1>
    </div>
  );
}

function Footer({ children }) {
  return (
    <footer className="footer">
      <div className="content has-text-centered has-text-black">
        <p>
          <strong>Currently being Develop</strong> by{" "}
          <a className="has-text-black" href="https://justinemar.surge.sh">
            Justine Cantado
          </a>
          . The source code is licensed
          <a
            className="has-text-black"
            href="http://opensource.org/licenses/mit-license.php"
          >
            {" "}
            MIT
          </a>
        </p>
      </div>
    </footer>
  );
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { _validSession } = useContext(AuthServiceContext);
  return (
    <Route
      {...rest}
      render={props =>
        _validSession() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <AuthServiceWithRouter>
          <HeaderComponent />
          <ModalProvider />
          <Switch>
            <Route
              exact
              path="/"
              render={props => <IndexComponent {...props} />}
            />
            <ProtectedRoute path="/dashboard" component={DashBoard} />
            <Route path="/list" render={props => <ListProperty {...props} />} />
            <Route
              path="/:provinceParam/:searchParam/:slug"
              render={props => (
                <PropertyProvider {...props}>
                  <SelectedProperty {...props} />
                </PropertyProvider>
              )}
            />
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
        <Footer />
      </Router>
    </div>
  );
}

export default App;
