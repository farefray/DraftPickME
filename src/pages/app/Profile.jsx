import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Drilldown from "react-router-drilldown";
import { Navigation } from "../components/Navigation";
import { userService } from "@/services";

import {
  About,
  Qualification,
  Experience,
  Contact,
  Home,
  EditProfile
} from "./profile";
import { FreeUsername } from "./profile/FreeUsername";

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
  return (
    <div>
      <Drilldown animateHeight={true} fillParent={true}>
        <RouteWithProps
          path={"/p/" + username + "/about"}
          component={About}
          profile={props.profile}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/qualification"}
          component={Qualification}
          profile={props.profile}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/experience"}
          component={Experience}
          profile={props.profile}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/contact"}
          component={Contact}
          profile={props.profile}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/edit"}
          profile={props.profile}
          component={EditProfile}
          canEdit={props.canEdit}
        />
      </Drilldown>
    </div>
  );
};

ProfileHandler.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired
    })
  }),
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
      loading: true,
      profile: null
    };

    console.log("Profile");
    console.log(props);
  }

  componentDidMount() {
    userService.getByUsername(this.state.username).then(profile => {
      this.setState({
        profile: profile,
        loading: false
      });
    }).catch(() => {
      this.setState({
        profile: null,
        loading: false
      });
    });
  }

  render() {
    const { profile, loading } = this.state;
    const { authUser } = this.props;

    let canEditProfile = !!(
      authUser &&
      profile &&
      profile.email &&
      profile.email == authUser.email
    );
    
    return (
      <div>
        <Navigation
          username={this.state.username}
          canEdit={canEditProfile}
          exist={profile !== null}
        />
        {profile ? (
          <div id="drilldown">
            <Drilldown animateHeight={true} fillParent={true}>
              <RouteWithProps
                exact
                path="/p/:username"
                profile={profile}
                canEdit={canEditProfile}
                component={Home}
              />
              <RouteWithProps
                path="/p/:username/:page"
                profile={profile}
                canEdit={canEditProfile}
                component={ProfileHandler}
              />
            </Drilldown>
          </div>
        ) : loading === false && profile === null ? (
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

function mapStateToProps(state) {
  const { authUser } = state.authentication;
  return {
    authUser
  };
}

const connectedProfile = connect(mapStateToProps)(Profile);
export { connectedProfile as Profile };
