import React, { Route } from "react";
import { AuthServiceContext } from "../utils/index";
class UserProfile extends React.Component {
  static authContext = this.context;

  componentDidMount() {
    console.info("MOUNTED WITH CONTEXT", this.context);
  }

  render() {
    return (
      <>
        <div className="columns">
          <div className="column is-one-thid">
            <aside className="menu">
              <p className="menu-label">{}</p>
              <p className="menu-label">General</p>
              <ul className="menu-list">
                <li>
                  <a href="/customers">Dashboard</a>
                </li>
                <li>
                  <a>Customers</a>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column is-one-thid">
            <Route path="/customers" component={Customers} />
          </div>
        </div>
      </>
    );
  }
}

function Customers() {
  return <h1>Customers</h1>;
}
UserProfile.contextType = AuthServiceContext;
export default UserProfile;
