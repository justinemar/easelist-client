import React from "react";

class Register extends React.Component {
  constructor() {
    super();
  }

  render() {
    const [defaultForm, setDefaultForm] = this.props.contextProps;

    return (
      <>
        <div class="is-divider has-text-black" data-content="OR"></div>

        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-info"
              type="email"
              placeholder="Email Address"
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
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-info"
              type="passsword"
              placeholder="Password min (6 characters)"
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
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-info"
              type="passsword"
              placeholder="Confirm password"
            />
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
            {/* <span class="icon is-small is-right">
  <i class="fa fa-exclamation-triangle"></i>
</span> */}
          </div>
        </div>

        <div class="field has-text-black">
          <input
            class="is-checkradio"
            id="exampleCheckbox"
            type="checkbox"
            name="exampleCheckbox"
          />
          <label for="exampleCheckbox">
            {" "}
            I agree to the{" "}
            <a href="#" class="has-text-primary">
              Terms and Conditions
            </a>
          </label>
        </div>

        <div class="field">
          <p class="control">
            <button class="button is-info is-fullwidth is-rounded">
              Confirm
            </button>
          </p>
        </div>
        <div class="is-divider has-text-black" data-content="OR"></div>
        <div class="field has-addons has-addons-centered">
          <p class="control has-text-black">Already a member?</p>
        </div>
        <div class="field has-addons has-addons-centered">
          <p class="control">
            <button
              class="button is-info is-inverted"
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
