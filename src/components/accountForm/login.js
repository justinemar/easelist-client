import React from "react";
import "./modal.scss";
import { AuthServiceContext } from "../../utils/index";

class Login extends React.Component {
  state = {
    email: "jmarcantado@gmail.com",
    password: "newone131521",
    responseProps: {
      status: "",
      message: ""
    }
  };
  componentDidMount() {
    console.log(this.context);
  }

  controlEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  controlPasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  login = async e => {
    const { _defaultLogin, _setToken } = this.context;
    const { email, password } = this.state;
    const { history } = this.props;
    const data = await _defaultLogin(email, password).catch(exception => {
      exception.json().then(error => {
        this.setState({
          responseProps: {
            status: "has-text-danger",
            message: error.message
          }
        });
      });
    });

    if (data) {
      _setToken(data);
    }
  };

  render() {
    const [defaultForm, setDefaultForm] = this.props.contextProps;
    const { email, password, responseProps } = this.state;
    return (
      <>
        <>
          <div className="is-divider has-text-black" data-content="OR"></div>
          <p
            className={`${responseProps.status} has-text-centered has-text-weight-semibold`}
          >
            {" "}
            {responseProps.message}{" "}
          </p>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-info"
                type="email"
                placeholder="johndoe@mail.com"
                onChange={this.controlEmailChange}
                value={email}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
              {/* <span className="icon is-small is-right">
<i className="fa fa-check"></i>
</span> */}
            </div>
            {/* <p className="help is-success">Success</p> */}
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-info"
                type="password"
                placeholder="**********"
                onChange={this.controlPasswordChange}
                value={password}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
              {/* <span className="icon is-small is-right">
<i className="fa fa-exclamation-triangle"></i>
</span> */}
            </div>
            {/* <p className="help is-danger">This email is invalid</p> */}
          </div>
          <div className="field">
            <p className="control">
              <button
                className="button is-info is-fullwidth is-rounded"
                onClick={this.login}
              >
                Login
              </button>
            </p>
          </div>
          <div className="is-divider has-text-black" data-content="OR"></div>
          <div className="field has-addons has-addons-centered">
            <p className="control has-text-black">New to easelist?</p>
          </div>
          <div className="field has-addons has-addons-centered">
            <p className="control">
              <button
                className="button is-info is-inverted"
                onClick={() => setDefaultForm(false)}
              >
                Register for Free
              </button>
            </p>
          </div>
        </>
      </>
    );
  }
}
Login.contextType = AuthServiceContext;

export default Login;
