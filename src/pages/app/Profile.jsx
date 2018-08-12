import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RouteWithProps } from "@/pages/components/RouteWithProps";
import Drilldown from "react-router-drilldown";
import { Navigation } from "../components/Navigation";
import { userService } from "@/services";
import Loader from "react-loaders";
import {
  ProfileContext,
  withProfile
} from "./profile/components/ProfileContext";
import { userActions } from "@/actions";
import _ from "lodash";

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
        <RouteWithProps
          exact
          path={"/p/" + username + "/about"}
          component={withProfile(About)}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/qualification"}
          component={withProfile(Qualification)}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/experience"}
          component={withProfile(Experience)}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/contact"}
          component={withProfile(Contact)}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + username + "/edit"}
          component={withProfile(EditProfile)}
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
  canEdit: PropTypes.bool.isRequired
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    let username = props.match.params.username;
    this.state = {
      username: username,
      profileLoading: true,
      providerContext: {
        profile: null
      }
    };

    this.updateProfileContext = profile => {
      this.setState(
        (prevState) => {
          // very dirty way, to merge states without losing part of profile
          let {profile: prevProfile} = prevState.providerContext;
          let updatedProfile = _.assign(prevProfile, profile);
          const updatedContext = _.assign(
            prevState.providerContext, {
              profile: updatedProfile
            }
          )
          return {providerContext: updatedContext};
        },
        () => {
          let { profile: profileFromContext } = this.state.providerContext;
          console.log(_.cloneDeep(profileFromContext));
          console.log(_.cloneDeep(profile));
          profile = _.assign(profileFromContext, profile);
          console.log(_.cloneDeep(profile));
          this.props.dispatch(userActions.edit(profile));
        }
      );
    };

    this.updateProfileValue = (name, value) => {
      let { profile } = this.state.providerContext;
      profile[name] = value;
      this.setState(
        () => ({
          providerContext: {
            profile: profile,
            updateProfileContext: this.updateProfileContext,
            updateProfileValue: this.updateProfileValue
          }
        }),
        () => {
          this.props.dispatch(userActions.editProfileValue(name, value));
        }
      );
    };
  }

  componentDidMount() {
    userService
      .getByUsername(this.state.username)
      .then(profile => {
        this.setState({
          profileLoading: false,
          providerContext: {
            profile: profile,
            updateProfileContext: this.updateProfileContext,
            updateProfileValue: this.updateProfileValue
          }
        });
      })
      .catch(() => {
        this.setState({
          profileLoading: false,
          profileContext: {
            profile: false
          }
        });
      });
  }

  render() {
    const { authUser } = this.props;
    const { profileLoading } = this.state;
    const { profile } = this.state.providerContext;
    const canEdit = !!(
      authUser &&
      profile &&
      profile.email &&
      profile.email == authUser.email
    ); /// Should be reworked, but no bugs cuz of that, P3

    // TODO P1 - after state.providerContext/context was updated, we got full redraw which is useless and messy :(
    return (
      <ProfileContext.Provider value={this.state.providerContext}>
        {profile === null || (
          <Navigation username={this.state.username} canEdit={canEdit} />
        )}
        {profile ? (
          <div id="drilldown">
            <Drilldown animateHeight={true} fillParent={true}>
              <RouteWithProps
                exact
                path="/p/:username"
                component={withProfile(Main)}
              />
              <RouteWithProps
                path="/p/:username/:page"
                component={ProfileHandler}
                authUser={this.props.authUser}
                canEdit={canEdit}
              />
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
