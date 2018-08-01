import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Drilldown from 'react-router-drilldown';
import { Navigation } from '../components/Navigation';
import { db } from '@/firebase';

import { About, Qualification, Experience, Contact, Home } from './profile';
import { FreeUsername } from './profile/FreeUsername';

const RouteWithProps = ({
  component: Component,
  path,
  profile,
  canEdit,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Component path={path} profile={profile} canEdit={canEdit} {...props} />
    )}
  />
);

RouteWithProps.propTypes = {
  component: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  profile: PropTypes.object
};

const ProfileHandler = props => {
  let username = props.match.params.username;
  console.log(props);
  return (
    <div>
      <Drilldown animateHeight={true} fillParent={true}>
        <RouteWithProps
          path={'/p/' + username + '/about'}
          component={About}
          profile={props.profile}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={'/p/' + username + '/qualification'}
          component={Qualification}
          profile={props.profile}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={'/p/' + username + '/experience'}
          component={Experience}
          profile={props.profile}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={'/p/' + username + '/contact'}
          component={Contact}
          profile={props.profile}
          canEdit={props.canEdit}
        />
      </Drilldown>
    </div>
  );
};

ProfileHandler.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  profile: PropTypes.object
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    let username = props.match.params.username;
    this.state = {
      username: username,
      canEdit: false,
      loading: true,
      profile: null
    };

    console.log('Profile');
    console.log(props);
  }

  componentDidMount() {
    // todo move to some service
    db.onceGetUserByUsername(this.state.username).then(snapshot => {
      const value = snapshot.val();
      let profileValue = null;
      if (value && typeof value === 'object' && Object.keys(value).length >= 0) {
        // there must be better way
        profileValue = value[Object.keys(value)[0]];
      }

      this.setState({
        profile: profileValue,
        loading: false
      });
    });
  }

  render() {
    return (
      <div>
        <Navigation
          username={this.state.username}
          exist={this.state.profile !== null}
        />
        {this.state.profile ? (
          <div id="drilldown">
            <Drilldown animateHeight={true} fillParent={true}>
              <RouteWithProps
                exact
                path="/p/:username"
                profile={this.state.profile}
                canEdit={this.state.canEdit}
                component={Home}
              />
              <RouteWithProps
                path="/p/:username/:page"
                profile={this.state.profile}
                canEdit={this.state.canEdit}
                component={ProfileHandler}
              />
            </Drilldown>
          </div>
        ) : this.state.loading === false && this.state.profile === null ? (
          <FreeUsername username={this.state.username} />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired
    })
  }),
  authUser: PropTypes.object
};

export { Profile };
