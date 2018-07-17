import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Drilldown from 'react-router-drilldown';
import { Navigation } from '../components/Navigation';
import { userActions } from '../actions';

import {
  AboutPage,
  ExperiencePage,
  PortfolioPage,
  ContactPage,
  Home
} from './profile';

const RouteWithProps = ({ component: Component, path, user, ...rest }) => (
  <Route
    {...rest}
    render={props => <Component path={path} user={user} {...props} />}
  />
);

RouteWithProps.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const ProfilePage = props => {
  console.log(props);
  return (
    <div>
      <Drilldown animateHeight={true} fillParent={true}>
        <RouteWithProps
          path={'/p/' + props.match.params.username + '/about'}
          component={AboutPage}
          user={props.user}
        />
        <RouteWithProps
          exact
          path={'/p/' + props.match.params.username + '/experience'}
          component={ExperiencePage}
          user={props.user}
        />
        <RouteWithProps
          exact
          path={'/p/' + props.match.params.username + '/portfolio'}
          component={PortfolioPage}
          user={props.user}
        />
        <RouteWithProps
          exact
          path={'/p/' + props.match.params.username + '/contact'}
          component={ContactPage}
          user={props.user}
        />
      </Drilldown>
    </div>
  );
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.username
        ? this.props.match.params.username
        : '',
      user: {},
      loaded: false
    };

    // TODO Fixme
    // Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
    userActions.getByName(this.state.username).then(data => {
      this.setState({ user: data.response.user, loaded: true });
    });
  }

  render() {
    return (
      <div>
        <Navigation username={this.state.username} />
        {this.state.loaded ? (
          <Drilldown animateHeight={true} fillParent={true}>
            <RouteWithProps
              exact
              path="/p/:username"
              user={this.state.user}
              component={Home}
            />
            <RouteWithProps
              path="/p/:username/:page"
              user={this.state.user}
              component={ProfilePage}
            />
          </Drilldown>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    );
  }
}

export { Profile };
