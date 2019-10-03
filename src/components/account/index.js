import React from "react";
import { AuthServiceContext } from "../../utils/index";

class Account extends React.Component {
  state = {
    hideUpgrade: localStorage.getItem("hideUpgrade") || false
  };
  static authContext = this.context;

  componentDidMount() {}

  hideMessage = () => {
    this.setState({
      hideUpgrade: true
    });
  };

  handleCheckBox = event => {
    localStorage.setItem("hideUpgrade", event.target.checked);
  };

  render() {
    const {
      userData: { first_name, last_name }
    } = this.context;
    const { hideUpgrade } = this.state;
    const message = hideUpgrade ? null : (
      <article class="message is-info">
        <div class="message-header">
          <p>Upgrade Account</p>
          <button
            class="delete"
            aria-label="delete"
            onClick={() => this.hideMessage()}
          ></button>
        </div>
        <div class="message-body">
          Are you a professional <strong>Broker</strong>? Upgrade to a
          professional broker account to receive professional features.
          <div className="buttons">
            <a className="button is-info">Upgrade Now</a>
            <a className="button is-info">Learn more</a>
            <input
              className="is-checkradio"
              id="exampleCheckbox"
              type="checkbox"
              name="exampleCheckbox"
              onClick={e => this.handleCheckBox(e)}
            />
            <label for="exampleCheckbox">Never show again</label>
          </div>
        </div>
      </article>
    );
    return (
      <div className="account-menu">
        {message}
        <div className="menu-controls">
          <div className="menu-header">
            <h1 className="menu-label has-text-black is-size-4">Information</h1>
          </div>
          <div className="columns">
            <div className="column is-two-thirds">
              <div className="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label">Contact Details</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-light"
                        type="text"
                        placeholder={first_name || "First Name"}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-light"
                        type="text"
                        placeholder={last_name || "Last Name"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label"></div>
                <div class="field-body">
                  <div class="field is-expanded">
                    <div class="field has-addons">
                      <p class="control">
                        <a class="button is-static">+63</a>
                      </p>
                      <p class="control is-expanded">
                        <input
                          class="input is-light"
                          type="tel"
                          placeholder="Your phone number"
                        />
                      </p>
                    </div>
                    <p class="help has-text-black">
                      Your phone number is not verified
                    </p>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label">Login Info</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-light"
                        type="email"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="field has-addons">
                    <div class="control">
                      <input
                        disabled
                        class="input is-light"
                        type="text"
                        placeholder="*******"
                      />
                    </div>
                    <div class="control">
                      <a class="button is-info">Change Password</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label"></div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <button class="button is-info">Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Account.contextType = AuthServiceContext;

export default Account;
