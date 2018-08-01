import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Drilldown from "react-router-drilldown";
import { Navigation } from "../components/Navigation";
import { db } from "@/firebase";

import {
  About,
  Qualification,
  Experience,
  Contact,
  Home
} from "./profile";
import { FreeUsername } from './profile/FreeUsername';

const RouteWithProps = ({ component: Component, path, user, canEdit, ...rest }) => (
  <Route
    {...rest}
    render={props => <Component path={path} user={user} canEdit={canEdit} {...props} />}
  />
);

RouteWithProps.propTypes = {
  component: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  user: PropTypes.object
};

const ProfileHandler = props => {
  return (
    <div>
      <Drilldown animateHeight={true} fillParent={true}>
        <RouteWithProps
          path={"/p/" + props.match.params.username + "/about"}
          component={About}
          user={props.user}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + props.match.params.username + "/qualification"}
          component={Qualification}
          user={props.user}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + props.match.params.username + "/experience"}
          component={Experience}
          user={props.user}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + props.match.params.username + "/contact"}
          component={Contact}
          user={props.user}
          canEdit={props.canEdit}
        />
      </Drilldown>
    </div>
  );
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

    // todo move to some service
    db.onceGetUserByUsername(username).then(snapshot => {
      this.setState({ profile: snapshot.val(), loading: false });
    });
  }

  render() {
    console.log('profile render')
    console.log(this.state);
    console.log(this.props.authUser);
    return (
      <div>
        <Navigation username={this.state.username} exist={this.state.profile !== null}/>
        {this.state.profile ? (
          <div id="drilldown">
            <Drilldown animateHeight={true} fillParent={true}>
              <RouteWithProps
                exact
                path="/p/:username"
                user={this.state.profile}
                canEdit={this.state.canEdit}
                component={Home}
              />
              <RouteWithProps
                path="/p/:username/:page"
                user={this.state.profile}
                canEdit={this.state.canEdit}
                component={ProfileHandler}
              />
            </Drilldown>
          </div>
        ) : (
            this.state.loading === false && this.state.profile === null ?
              <FreeUsername username={this.state.username} /> :
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

export {Profile};
