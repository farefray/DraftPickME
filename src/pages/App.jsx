import React from "react";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NProgress } from "redux-nprogress";
import { Alerts } from "./components/Alerts";
import history from "../helpers/history";

import Homepage from "./app/Homepage";
import { Login } from "./app/Login";
import { Register } from "./app/Register";
import { Profile } from "./app/Profile";
import { EditProfile } from "./app/login/EditProfile";

import { firebase } from "@/firebase";

const RouteWithAuth = ({ component: Component, path, authUser, ...rest }) => (
  <Route
    {...rest}
    path={path}
    render={props => <Component authUser={authUser} {...props} />}
  />
);

RouteWithAuth.propTypes = {
  component: PropTypes.any.isRequired,
  authUser: PropTypes.object,
  path: PropTypes.string.isRequired
};

const Main = props => {
  return (
    <div id="root">
      <TransitionGroup>
        <CSSTransition
            key={props.location.pathname}
            classNames="fadeTranslate"
            timeout={1000}
            mountOnEnter={true}
            unmountOnExit={true}
          >
          <Switch location={props.location}>
            <RouteWithAuth
              exact
              path="/"
              component={Homepage}
              authUser={props.authUser}
            />
            <Route path="/login" component={Login} />
            <PrivateRoute
              path="/editprofile"
              isAuthenticated={props.authUser !== null}
              component={EditProfile}
            />
            <Route path="/register" component={Register} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <RouteWithAuth
        path="/p/:username"
        component={Profile}
        authUser={props.authUser}
      />
    </div>
  );
};

Main.propTypes = {
  authUser: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    // changing authUser by trigger from firebase (probably must be moved into Redux instead of passing by props)
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <div>
        <NProgress color="#78cc78" />
        <Alerts />
        <Router history={history}>
          <RouteWithAuth path="/" component={Main} authUser={this.state.authUser} />
        </Router>
      </div>
    );
  }
}

export default App;
