import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { ModalContext } from "../accountForm";
import { AuthServiceContext } from "../../utils/index";
import logo from "./logo.png";

function HeaderComponent(props) {
  const { isAuthenticated, _logOut, setModalShow } = useContext(
    AuthServiceContext
  );
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <div className="header-logo"></div>
        </a>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          {isAuthenticated ? (
            <>
              <a className="navbar-item" onClick={() => _logOut()}>
                Log out
              </a>
              <Link to="/dashboard" className="navbar-item">
                Dashboard
              </Link>
            </>
          ) : (
            <a className="navbar-item" onClick={() => setModalShow(true)}>
              Sign in
            </a>
          )}
        </div>
        <div className="navbar-end">
          <Link to="/list" className="navbar-item">
            List a property
          </Link>
          <a className="navbar-item">Advertise with us</a>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;
