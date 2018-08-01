import React from "react";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NProgress } from "redux-nprogress";
import { Alerts } from "./components/Alerts";
import history from "../helpers/history";
import { Homepage } from "./app/Homepage";
import { Login } from "./app/Login";
import { Register } from "./app/Register";
import { Profile } from "./app/Profile";
import { userActions } from "@/actions";
import { firebase } from "@/firebase";

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
            <Route
              exact
              path="/"
              component={Homepage}
            />
            <Route path="/login" component={Login} />          
            <Route path="/register" component={Register} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Route
        path="/p/:username"
        component={Profile}
      />
    </div>
  );
};

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    // changing authUser by trigger from firebase (probably must be moved into Redux instead of passing by props)
    firebase.auth.onAuthStateChanged(authUser => {
      this.props.dispatch(userActions.authChanged(authUser));
    });
  }

  render() {
    return (
      <div>
        <NProgress color="#78cc78" />
        <Alerts />
        <Router history={history}>
          <Route path="/" component={Main}/>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);
const connectedApp = connect(mapDispatchToProps)(App);
export { connectedApp as App };
