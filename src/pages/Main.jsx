import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { PrivateRoute } from "../components/PrivateRoute";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Homepage } from "./Homepage";
import { Login } from "./Login";
import { Register } from "./Register";
import { Profile } from "./Profile";
import { EditProfile } from "./login/EditProfile";
import { Loader } from "../components/Loader.jsx";
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

const Layout = ({ children }) => (
  <div id="root">
    <Loader />
    {children}
  </div>
);

const App = props => {
  console.log(props);
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
              isAuthenticated={props.auth}
              component={EditProfile}
            />
            <Route path="/register" component={Register} />
          </Switch>
        </PageFade>
      </TransitionGroup>
      <Route path="/p/:username" component={Profile} />
    </Layout>
  );
};

class Main extends React.Component {
  render() {
    const { alert } = this.props; // todo
    const alertBlock = alert.message && (
      <div className={`alert ${alert.type}`}>{alert.message}</div>
    );
    return (
      <div>
        {alertBlock}
        <Router history={history}>
          <Route path="/" component={App} />
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, authentication } = state;
  return {
    alert,
    auth: !!(authentication && authentication.loggedIn)
  };
}

export default connect(mapStateToProps)(Main);
