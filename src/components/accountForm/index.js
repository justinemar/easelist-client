import React, { useState, createContext, useContext, useEffect } from "react";
import Login from "./login";
import Register from "./register";
import { AuthServiceContext } from "../../utils/index";

export const ModalContext = createContext([false, () => {}]);

export function ModalProvider(props) {
  const authService = useContext(AuthServiceContext);
  let isShow = authService.loginPopUp;
  console.log(isShow);
  const [modalShow, setModalShow] = useState(authService.loginPopUp);
  const [defaultForm, setDefaultForm] = useState(true);

  const showForm = defaultForm ? (
    <Login contextProps={[defaultForm, setDefaultForm]} />
  ) : (
    <Register contextProps={[defaultForm, setDefaultForm]} />
  );

  useEffect(() => {
    setModalShow(authService.loginPopUp);
    console.log("efect", authService.loginPopUp);
  }, [authService.loginPopUp]);
  return (
    <>
      <ModalContext.Provider value={[modalShow, setModalShow]}>
        {props.children}
      </ModalContext.Provider>
      {modalShow ? (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setModalShow(false)}
          ></div>
          <div className="modal-content">{showForm}</div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setModalShow(false)}
          ></button>
        </div>
      ) : null}
    </>
  );
}
