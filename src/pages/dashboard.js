import React from "react";
import Account from "../components/account/index";
import { Route, Switch, NavLink } from "react-router-dom";
import { AuthServiceContext } from "../utils/index";
import "./index.scss";
class DashBoard extends React.Component {
  static authContext = this.context;

  componentDidMount() {
    console.info("MOUNTED WITH CONTEXT", this.context);
  }

  render() {
    const {
      userData: { first_name, last_name }
    } = this.context;
    return (
      <>
        <div className="columns account-dashboard">
          <div className="column is-one-quarter menu-tab">
            <aside className="menu">
              <p className="menu-label is-size-5">
                {first_name} {last_name}
              </p>
              <p className="menu-label">General</p>
              <ul className="menu-list">
                <li>
                  <NavLink to="/dashboard/account" activeClassName="activeTab">
                    Account
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/leads" activeClassName="activeTab">
                    Leads
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/properties"
                    activeClassName="activeTab"
                  >
                    Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/save" activeClassName="activeTab">
                    Save Properties
                  </NavLink>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column">
            <Switch>
              <Route path="/dashboard/leads" render={() => <Leads />} />
              <Route path="/dashboard/account" render={() => <Account />} />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const Leads = props => {
  return <h1>leads</h1>;
};
DashBoard.contextType = AuthServiceContext;

export default DashBoard;
