import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Drilldown from 'react-router-drilldown'
import { connect } from "react-redux";

import { PrivateRoute } from "../components";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  Navigation,
  AboutPage,
  EducationPage,
  ExperiencePage,
  PortfolioPage,
  ContactPage
} from "./";
import { Loader } from "../components/Loader.jsx";

// Our global styles
import "../styles/bootstrap.min.css";
import "../styles/font-awesome.min.css";
import "../styles/material-design-iconic-font.min.css";
import "../styles/magnific-popup.css";
import "../styles/animate.css";
import "../styles/style.css";
import "../styles/color.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { alert } = this.props;
    /* Example for nested router and probably dynamic route (draftpickit.com/fare => user = fare)
    const ContactPageRoute = ({ match }) => (
      <Drilldown>
        <Route exact path={match.path} component={ContactPage} />
        <Route path={`${match.url}/fare`} component={ContactPageFare} />
      </Drilldown>
    ) */

    return (
      <BrowserRouter>
        <div id="root">
          <Loader />
          <Navigation />
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
            <div className="table">
            <div className="table-cell">
            <Drilldown>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/education" component={EducationPage} />
              <Route exact path="/experience" component={ExperiencePage} />
              <Route exact path="/portfolio" component={PortfolioPage} />
              <Route exact path="/contact" component={ContactPage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <Route path="/login" component={LoginPage} />
             <Route path="/register" component={RegisterPage} />
            </Drilldown>
          </div></div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
