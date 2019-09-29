import React, { useContext } from "react";
import "./index.scss";
import { ModalContext } from "../accountForm";
import { AuthServiceContext } from "../../utils/index";

function HeaderComponent() {
  const [modalShow, setModalShow] = useContext(ModalContext);

  const { isAuthenticated, _logOut } = useContext(AuthServiceContext);
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <div className="header-logo"></div>
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          {isAuthenticated ? (
            <a class="navbar-item" onClick={() => _logOut()}>
              Log out
            </a>
          ) : (
            <a class="navbar-item" onClick={() => setModalShow(true)}>
              Sign in
            </a>
          )}
        </div>
        <div class="navbar-end">
          <a class="navbar-item">List a property</a>
          <a class="navbar-item">Advertise with us</a>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;
