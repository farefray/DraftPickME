import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Drilldown from "react-router-drilldown";
import { Navigation } from "../components/Navigation";
import { userActions } from "../../actions";

import {
  About,
  Qualification,
  Experience,
  Contact,
  Home
} from "./profile";

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
      canEdit: false
    };

    console.log('Profile');
    console.log(props);
    userActions.getByName(username);

    this.props.dispatch(userActions.getByName(username));
  }

  render() {
    console.log('profile render')
    console.log(this.state);
    console.log(this.props);
    return (
      <div>
        <Navigation username={this.state.username} />
        {!this.props.loading && !!this.props.profile ? (
          <div id="drilldown">
            <Drilldown animateHeight={true} fillParent={true}>
              <RouteWithProps
                exact
                path="/p/:username"
                user={this.props.profile}
                canEdit={this.state.canEdit}
                component={Home}
              />
              <RouteWithProps
                path="/p/:username/:page"
                user={this.props.profile}
                canEdit={this.state.canEdit}
                component={ProfileHandler}
              />
            </Drilldown>
          </div>
        ) : (
            this.props.user === null ? <div>Such username is free. Would you like to register?</div> :
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
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    user: PropTypes.object
  }),
  dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  console.log('profile redux state');
  console.log(state);
  const { user, loading } = state.profile;
  return {
    profile: user, 
    loading
  };
}

const connectedProfile = connect(mapStateToProps)(Profile);
export { connectedProfile as Profile };
