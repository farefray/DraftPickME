import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Drilldown from "react-router-drilldown";
import { Navigation } from "../components/Navigation";
import { userActions } from "../actions";

import {
  AboutPage,
  SkillsPage,
  ExperiencePage,
  ContactPage,
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

const ProfilePage = props => {
  console.log(props);
  return (
    <div>
      <Drilldown animateHeight={true} fillParent={true}>
        <RouteWithProps
          path={"/p/" + props.match.params.username + "/about"}
          component={AboutPage}
          user={props.user}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + props.match.params.username + "/skills"}
          component={SkillsPage}
          user={props.user}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + props.match.params.username + "/experience"}
          component={ExperiencePage}
          user={props.user}
          canEdit={props.canEdit}
        />
        <RouteWithProps
          exact
          path={"/p/" + props.match.params.username + "/contact"}
          component={ContactPage}
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

    this.state = {
      username: this.props.match.params.username
        ? this.props.match.params.username
        : "",
      user: {},
      loaded: false,
      canEdit: false
    };

    console.log('Profile');
    console.log(props);
    userActions.getByName(this.state.username).then(data => {
      // todo case when no such user!
      let { user } = data.response;
      console.log(user);
      console.log(props);
      this.setState({ user: user, loaded: true, canEdit: !!(props.auth.user && user.id === props.auth.user.id) });
    });
  }

  render() {
    return (
      <div>
        <Navigation username={this.state.username} />
        {this.state.loaded ? (
          <div id="drilldown">
            <Drilldown animateHeight={true} fillParent={true}>
              <RouteWithProps
                exact
                path="/p/:username"
                user={this.state.user}
                canEdit={this.state.canEdit}
                component={Home}
              />
              <RouteWithProps
                path="/p/:username/:page"
                user={this.state.user}
                canEdit={this.state.canEdit}
                component={ProfilePage}
              />
            </Drilldown>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.any,
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    user: PropTypes.object
  })
};

export { Profile };
