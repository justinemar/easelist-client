import React, { useState, createContext, useContext, useEffect } from "react";
import Login from "./login";
import Register from "./register";
import { AuthServiceContext } from "../../utils/index";

export function ModalProvider(props) {
  const authService = useContext(AuthServiceContext);
  const [defaultForm, setDefaultForm] = useState(true);

  const showForm = defaultForm ? (
    <Login contextProps={[defaultForm, setDefaultForm]} />
  ) : (
    <Register contextProps={[defaultForm, setDefaultForm]} />
  );

  return (
    <>
      {authService.loginPopUp ? (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => authService.setModalShow(false)}
          ></div>
          <div className="modal-content">{showForm}</div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => authService.setModalShow(false)}
          ></button>
        </div>
      ) : null}
    </>
  );
}
