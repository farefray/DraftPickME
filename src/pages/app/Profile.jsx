import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Route } from "react-router-dom";
import Drilldown from "react-router-drilldown";
import { Navigation } from "../components/Navigation";
import { userService } from "@/services";
import Loader from "react-loaders";
import {
  ProfileContext,
  withProfile
} from "./profile/components/ProfileContext";
import { userActions } from "@/actions";

import {
  About,
  Qualification,
  Experience,
  Contact,
  Main,
  EditProfile
} from "./profile";
import { FreeUsername } from "./profile/FreeUsername";

const ProfileHandler = props => {
  let username = props.match.params.username;
  return (
    <div>
      <Drilldown animateHeight={true} fillParent={true}>
        <Route path={"/p/" + username + "/about"} component={About} />
        <Route
          exact
          path={"/p/" + username + "/qualification"}
          component={Qualification}
        />
        <Route
          exact
          path={"/p/" + username + "/experience"}
          component={Experience}
        />
        <Route exact path={"/p/" + username + "/contact"} component={Contact} />
        <Route
          exact
          path={"/p/" + username + "/edit"}
          component={withProfile(EditProfile)}
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
  })
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    let username = props.match.params.username;
    this.state = {
      username: username,
      profileLoading: true,
      profile: null
    };
  }

  componentDidMount() {
    userService
      .getByUsername(this.state.username)
      .then(profile => {
        this.setState({
          profile: profile,
          profileLoading: false
        });
      })
      .catch(() => {
        this.setState({
          profile: false,
          profileLoading: false
        });
      });
  }

  updateProfile = profile => {
    this.props.dispatch(userActions.edit(profile));
    this.setState({ profile: profile });
  };

  render() {
    const { profile, profileLoading } = this.state;
    const { authUser } = this.props;

    let canEditProfile = !!(
      authUser &&
      profile &&
      profile.email &&
      profile.email == authUser.email
    );

    return (
      <ProfileContext.Provider
        value={{
          profile: profile,
          canEdit: canEditProfile,
          updateProfile: this.updateProfile
        }}>
        {profile === null || <Navigation username={this.state.username} />}
        {profile ? (
          <div id="drilldown">
            <Drilldown animateHeight={true} fillParent={true}>
              <Route exact path="/p/:username" component={Main} />
              <Route path="/p/:username/:page" component={ProfileHandler} />
            </Drilldown>
          </div>
        ) : profileLoading === false && profile === false ? (
          <FreeUsername username={this.state.username} />
        ) : (
          <div className="profile-loading">
            <Loader type="ball-clip-rotate-multiple" />
          </div>
        )}
      </ProfileContext.Provider>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired
    })
  }),
  dispatch: PropTypes.func.isRequired,
  authUser: PropTypes.object
};

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);
function mapStateToProps(state) {
  const { authUser } = state.authentication;
  return {
    authUser
  };
}

const connectedProfile = connect(mapStateToProps)(Profile);
const withDispatch = connect(mapDispatchToProps)(connectedProfile);
export { withDispatch as Profile };
