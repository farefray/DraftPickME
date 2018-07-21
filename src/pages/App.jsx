import React from "react";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { PrivateRoute } from "../components/PrivateRoute";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { NProgress } from "redux-nprogress";

import { Homepage } from "./Homepage";
import { Login } from "./Login";
import { Register } from "./Register";
import { Profile } from "./Profile";
import { EditProfile } from "./login/EditProfile";
import { Alerts } from "../components/Alerts";
import history from "../helpers/history";

const PageFade = props => (
  <CSSTransition
    {...props}
    classNames="fadeTranslate"
    timeout={1000}
    mountOnEnter={true}
    unmountOnExit={true}
  />
);

const Layout = ({ children }) => <div id="root">{children}</div>;

const AuthRoute = ({ component: Component, path, auth, ...rest }) => (
  <Route
    {...rest}
    path={path}
    render={props => <Component auth={auth} {...props} />}
  />
);

AuthRoute.propTypes = {
  component: PropTypes.any.isRequired,
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    user: PropTypes.object
  }),
  path: PropTypes.string.isRequired
};

const Main = props => {
  const locationKey = props.location.pathname;

  return (
    <Layout>
      <TransitionGroup>
        <PageFade key={locationKey}>
          <Switch location={props.location}>
            <Route exact path="/" component={Homepage} />
            <Route path="/login" component={Login} />
            <PrivateRoute
              path="/editprofile"
              isAuthenticated={props.auth.loggedIn}
              component={EditProfile}
            />
            <Route path="/register" component={Register} />
          </Switch>
        </PageFade>
      </TransitionGroup>
      <AuthRoute path="/p/:username" component={Profile} auth={props.auth} />
    </Layout>
  );
};

Main.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    user: PropTypes.object
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

class App extends React.Component {
  render() {
    console.log("App");
    console.log(this.props);
    return (
      <div>
        <NProgress color="#78cc78" />
        <Alerts />
        <Router history={history}>
          <AuthRoute path="/" component={Main} auth={this.props.auth} />
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    user: PropTypes.object
  }).isRequired,
};

function mapStateToProps(state) {
  const { authentication, app } = state;
  return {
    app,
    auth: authentication ? authentication : {}
  };
}

export default connect(mapStateToProps)(App);
