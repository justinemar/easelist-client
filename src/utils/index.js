import React, { createContext } from "react";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";

export const AuthServiceContext = createContext({
  userData: null,
  isAuthenticated: false,
  loginPopUp: false,
  _defaultLogin: () => {}
});

export class AuthService extends React.Component {
  componentDidMount() {
    const { history } = this.props;
    if (!this._validSession()) {
      this._logOut();
    } else {
      try {
        const userData = this._getUserData();
        this.setState({
          userData,
          isAuthenticated: true
        });
      } catch (err) {
        this._logOut();
        history.push("/");
      }
    }
  }

  _getUserData() {
    const token = localStorage.getItem("token");
    const data = decode(token);
    return data;
  }

  _validSession = () => {
    // Checks if there is a saved token and it's still valid
    const token = this._getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  };

  _getToken = () => {
    return localStorage.getItem("token");
  };

  _logOut = () => {
    this.setState({
      isAuthenticated: false,
      loginPopUp: true
    });
    return localStorage.removeItem("token");
  };

  _setToken = token => {
    const { history } = this.props;
    localStorage.setItem("token", token);
    const data = decode(token);
    this.setState(
      {
        isAuthenticated: true,
        loginPopUp: false,
        userData: data
      },
      history.push("/dashboard")
    );
  };

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  _defaultLogin = (email, password) => {
    console.log(email, password);
    return fetch("/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.json());
      } else if (res.status >= 400) {
        return Promise.reject(res);
      }
    });
  };

  fetch = (url, options) => {
    // performs api calls sending the required authentication header

    const headers = {
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx

    headers.Authorization = `Bearer ${this._getToken()}`;

    return fetch(url, {
      headers,
      ...options
    }).then(response => response.json());
  };

  setModalShow = () => {
    this.setState({
      loginPopUp: this.state.loginPopUp ? false : true
    });
  };

  state = {
    userData: [],
    isAuthenticated: false,
    _defaultLogin: this._defaultLogin,
    _setToken: this._setToken,
    loginPopUp: false,
    _logOut: this._logOut,
    _validSession: this._validSession,
    fetch: this.fetch,
    _getToken: this._getToken,
    setModalShow: this.setModalShow
  };

  render() {
    return (
      <AuthServiceContext.Provider value={this.state}>
        {this.props.children}
      </AuthServiceContext.Provider>
    );
  }
}

export const AuthServiceConsumer = AuthServiceContext.Consumer;
export const AuthServiceWithRouter = withRouter(AuthService);
