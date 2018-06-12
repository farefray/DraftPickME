import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Drilldown from 'react-router-drilldown';
import { connect } from 'react-redux';
import history from '../helpers/history';
import { PrivateRoute } from '../components';
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
} from './';
import { Loader } from '../components/Loader.jsx';

// Our global styles
import '../styles/bootstrap.min.css';
import '../styles/font-awesome.min.css';
import '../styles/material-design-iconic-font.min.css';
import '../styles/magnific-popup.css';
import '../styles/animate.css';
import '../styles/style.css';
import '../styles/color.css';

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

    /*
      Only resume pages being animated with drilldown, else loading all the pages inside drilldown makes login logic fails.
      Todo: when user inside non-resume pages(profile, login, register), set some state and hide main menu.
    */
    return (
      <Router history={history}>
        <div id="root">
          <Loader />
          <Navigation />
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <div className="table">
            <div className="table-cell">
              <Switch>
                <Route path="/login" component={LoginPage} />
                <PrivateRoute
                  path="/profile"
                  isAuthenticated={this.props.auth}
                  component={ProfilePage}
                />
                <Route path="/register" component={RegisterPage} />

                <Drilldown>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/about" component={AboutPage} />
                  <Route exact path="/education" component={EducationPage} />
                  <Route exact path="/experience" component={ExperiencePage} />
                  <Route exact path="/portfolio" component={PortfolioPage} />
                  <Route exact path="/contact" component={ContactPage} />
                  <Route exact path="/" component={HomePage} />
                </Drilldown>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert, authentication } = state;
  console.log(!!(authentication && authentication.loggedIn));
  return {
    alert,
    auth: !!(authentication && authentication.loggedIn)
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
