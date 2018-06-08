import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../helpers";
import { alertActions } from "../actions";
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
// https://hackernoon.com/animated-page-transitions-with-react-router-4-reacttransitiongroup-and-animated-1ca17bd97a1a
import TransitionGroup from "react-transition-group/TransitionGroup";

// Our global styles
import "../styles/bootstrap.min.css";
import "../styles/font-awesome.min.css";
import "../styles/material-design-iconic-font.min.css";
import "../styles/magnific-popup.css";
import "../styles/animate.css";
import "../styles/style.css";
import "../styles/color.css";

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <BrowserRouter history={history}>
        <div id="root">
          <Loader />
          <Navigation />
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <div id="router-pages">
          <Route
              exact
              path="/"
              children={({ match, ...rest }) => (
                <TransitionGroup component={firstChild}>
                  {match && <HomePage {...rest} />}
                </TransitionGroup>
            )}/>
            <Route
   path="/about"
   children={({ match, ...rest }) => (
     <TransitionGroup component={firstChild}>
       {match && <AboutPage {...rest} />}
     </TransitionGroup>
)}/>
            <Route exact path="/education" component={EducationPage} />
            <Route exact path="/experience" component={ExperiencePage} />
            <Route exact path="/portfolio" component={PortfolioPage} />
            <Route exact path="/contact" component={ContactPage} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </div>
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
