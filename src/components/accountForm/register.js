import React from "react";
import { AuthServiceContext } from "../../utils/index";
import Validation from "../../utils/validation";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      checkbox: false,
      responseProps: {
        status: "",
        message: ""
      },
      formProps: {
        field: "",
        toValidate: ""
      }
    };
  }

  handleOnChange = e => {
    const { name: key, value, checked } = e.target;

    if (key === "termsCheckbox") {
      this.setState({
        checkbox: checked
      });

      return;
    }
    this.setState({
      [key]: value,
      formProps: {
        field: key,
        toValidate: value
      }
    });
  };

  register = () => {
    const { _defaultLogin, _setToken } = this.context;
    const { email, password, checkbox } = this.state;

    if (!checkbox) {
      this.setState({
        responseProps: {
          status: "has-text-danger",
          message: "Just agree to it.."
        }
      });

      return;
    }

    fetch("/api/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(async res => {
      if (res.status === 200) {
        this.setState({
          responseProps: {
            status: "has-text-success",
            message: "Logging you in.."
          }
        });
        const data = await _defaultLogin(email, password).catch(exception => {
          exception.json().then(error => {
            console.log("ERROR", error);
            this.setState({
              responseProps: {
                status: "has-text-danger",
                message: error.errmsg
              }
            });
          });
        });

        if (data) {
          _setToken(data);
        }
      } else if (res.status >= 400) {
        res.json().then(parsed => {
          this.setState({
            responseProps: {
              status: "has-text-danger",
              message: parsed.errmsg
            }
          });
        });
      }
    });
  };

  render() {
    const [defaultForm, setDefaultForm] = this.props.contextProps;
    const { email, password, responseProps, formProps } = this.state;

    return (
      <>
        <div className="is-divider has-text-black" data-content="OR"></div>
        <Validation formProps={formProps} />
        <p
          className={`${responseProps.status} has-text-centered has-text-weight-semibold`}
        >
          {" "}
          {responseProps.message}{" "}
        </p>
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              name="email"
              onChange={e => this.handleOnChange(e)}
              className="input is-info"
              type="email"
              placeholder="Email Address"
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
          <div className="control has-icons-left has-icons-right">
            <input
              name="password"
              onChange={e => this.handleOnChange(e)}
              className="input is-info"
              type="password"
              placeholder="Password min (6 characters)"
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
          <div className="control has-icons-left has-icons-right">
            <input
              name="confirm_password"
              onChange={e => this.handleOnChange(e)}
              className="input is-info"
              type="password"
              placeholder="Confirm password"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
            {/* <span className="icon is-small is-right">
  <i className="fa fa-exclamation-triangle"></i>
</span> */}
          </div>
        </div>

        <div className="field has-text-black">
          <input
            name="termsCheckbox"
            onChange={e => this.handleOnChange(e)}
            className="is-checkradio"
            id="termsCheckbox"
            type="checkbox"
          />
          <label for="termsCheckbox">
            {" "}
            I agree to the{" "}
            <a href="#" className="has-text-primary">
              Terms and Conditions
            </a>
          </label>
        </div>

        <div className="field">
          <p className="control">
            <button
              className="button is-info is-fullwidth is-rounded"
              onClick={this.register}
            >
              Confirm
            </button>
          </p>
        </div>
        <div className="is-divider has-text-black" data-content="OR"></div>
        <div className="field has-addons has-addons-centered">
          <p className="control has-text-black">Already a member?</p>
        </div>
        <div className="field has-addons has-addons-centered">
          <p className="control">
            <button
              className="button is-info is-inverted"
              onClick={() => setDefaultForm(true)}
            >
              Login
            </button>
          </p>
        </div>
      </>
    );
  }
}

Register.contextType = AuthServiceContext;

export default Register;
