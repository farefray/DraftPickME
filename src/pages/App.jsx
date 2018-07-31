import React from "react";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { NProgress } from "redux-nprogress";

import Homepage from "./app/Homepage";
import { Login } from "./app/Login";
import { Register } from "./app/Register";
import { Profile } from "./app/Profile";
import { EditProfile } from "./app/login/EditProfile";
import { Alerts } from "./components/Alerts";
import history from "../helpers/history";
import { firebase } from "@/firebase";

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
Layout.propTypes = {
  children: PropTypes.array.isRequired
}

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
  const locationKey = props.location.pathname;

  console.log('main props');
  console.log(props);
  return (
    <Layout>
      <TransitionGroup>
        <PageFade key={locationKey}>
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
        </PageFade>
      </TransitionGroup>
      <RouteWithAuth
        path="/p/:username"
        component={Profile}
        authUser={props.authUser}
      />
    </Layout>
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
    firebase.auth.onAuthStateChanged(authUser => {
      console.log('auth changed');
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    console.log("App");
    console.log(this.props);
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
