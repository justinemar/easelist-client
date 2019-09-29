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
      console.log("invalid");
      this.setState({
        loginPopUp: true,
        isAuthenticated: false
      });
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
    // mock decode token
    return localStorage.getItem("token");
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

  _setToken = user => {
    this.setState({
      isAuthenticated: true,
      loginPopUp: false
    });
    localStorage.setItem("token", user);
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

  state = {
    userData: [],
    isAuthenticated: false,
    _defaultLogin: this._defaultLogin,
    _setToken: this._setToken,
    loginPopUp: false,
    _logOut: this._logOut
  };

  render() {
    return (
      <AuthServiceContext.Provider value={this.state}>
        {this.props.children}
      </AuthServiceContext.Provider>
    );
  }
}

export const AuthServiceWithRouter = withRouter(AuthService);
