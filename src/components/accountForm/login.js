import React from "react";
import "./modal.scss";
import { AuthServiceContext } from "../../utils/index";

class Login extends React.Component {
  state = {
    email: "mikeeolante@gmail.com",
    password: "",
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
          <div class="is-divider has-text-black" data-content="OR"></div>
          <p
            class={`${responseProps.status} has-text-centered has-text-weight-semibold`}
          >
            {" "}
            {responseProps.message}{" "}
          </p>
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-info"
                type="email"
                placeholder="johndoe@mail.com"
                onChange={this.controlEmailChange}
                value={email}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
              {/* <span class="icon is-small is-right">
<i class="fa fa-check"></i>
</span> */}
            </div>
            {/* <p class="help is-success">Success</p> */}
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-info"
                type="password"
                placeholder="**********"
                onChange={this.controlPasswordChange}
                value={password}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
              {/* <span class="icon is-small is-right">
<i class="fa fa-exclamation-triangle"></i>
</span> */}
            </div>
            {/* <p class="help is-danger">This email is invalid</p> */}
          </div>
          <div class="field">
            <p class="control">
              <button
                class="button is-info is-fullwidth is-rounded"
                onClick={this.login}
              >
                Login
              </button>
            </p>
          </div>
          <div class="is-divider has-text-black" data-content="OR"></div>
          <div class="field has-addons has-addons-centered">
            <p class="control has-text-black">New to easelist?</p>
          </div>
          <div class="field has-addons has-addons-centered">
            <p class="control">
              <button
                class="button is-info is-inverted"
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
