import React from "react";

class Register extends React.Component {
  constructor() {
    super();
  }

  render() {
    const [defaultForm, setDefaultForm] = this.props.contextProps;

    return (
      <>
        <div className="is-divider has-text-black" data-content="OR"></div>

        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
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
              className="input is-info"
              type="passsword"
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
              className="input is-info"
              type="passsword"
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
            className="is-checkradio"
            id="exampleCheckbox"
            type="checkbox"
            name="exampleCheckbox"
          />
          <label for="exampleCheckbox">
            {" "}
            I agree to the{" "}
            <a href="#" className="has-text-primary">
              Terms and Conditions
            </a>
          </label>
        </div>

        <div className="field">
          <p className="control">
            <button className="button is-info is-fullwidth is-rounded">
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

export default Register;
