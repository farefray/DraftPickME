import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../helpers";
import { alertActions } from "../actions";
import { PrivateRoute } from "../components";
import { HomePage, LoginPage, RegisterPage, ProfilePage, Navigation } from "./";

// Our global styles
import "../styles/bootstrap.min.css";
import "../styles/font-awesome.min.css";
import "../styles/material-design-iconic-font.min.css";
import "../styles/magnific-popup.css";
import "../styles/style.css";
import "../styles/color.css";

class App extends React.Component {
  state = {
    loading: true
  };

  emulateLoading() {
    // Todo hide loadingAnimation somehow based on state
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2000);
  }

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });

    this.emulateLoading();
  }

  render() {
    const loadingAnimation = (
      <div className="loading">
        <div className="table-cell">
          <div className="cp-spinner cp-round" />
        </div>
      </div>
    );

    const { alert } = this.props;
    return (
      <div id="root">
        {loadingAnimation}
        <Navigation />
        <div className="jumbotron">
          <div className="container">
            <div className="col-sm-8 col-sm-offset-2">
              {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
              <Router history={history}>
                <div>
                  <Route exact path="/" component={HomePage} />
                  <PrivateRoute path="/profile" component={ProfilePage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                </div>
              </Router>
            </div>
          </div>
        </div>
      </div>
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
