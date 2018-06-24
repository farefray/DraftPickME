import React from "react";
import { Route } from "react-router-dom";
import Drilldown from "react-router-drilldown";
import { Navigation } from "../components/Navigation";
import { userActions } from "../actions";

import {
  AboutPage,
  EducationPage,
  ExperiencePage,
  PortfolioPage,
  ContactPage,
  Home
} from "./profile/";

const RouteWithProps = ({ component: Component, path, user, ...rest }) =>
  <Route
    {...rest}
    render={props => <Component path={path}
    user={user} {...props} />}
  />;

const ProfilePage = ({ match }) => (
  <div>
    <Drilldown animateHeight={true} fillParent={true}>
      <Route
        path={"/p/" + match.params.username + "/about"}
        component={AboutPage}
      />
      <Route
        exact
        path={"/p/" + match.params.username + "/education"}
        component={EducationPage}
      />
      <Route
        exact
        path={"/p/" + match.params.username + "/experience"}
        component={ExperiencePage}
      />
      <Route
        exact
        path={"/p/" + match.params.username + "/portfolio"}
        component={PortfolioPage}
      />
      <Route
        exact
        path={"/p/" + match.params.username + "/contact"}
        component={ContactPage}
      />
    </Drilldown>
  </div>
);

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.username ? this.props.match.params.username : '',
      user: {}
    };

    userActions.getByName(this.state.username).then((data) => {
      this.setState({ user: data.response.user });
    });
  }

  render() {
    return (
      <div>
        <Navigation username={this.state.username} />
        <Drilldown animateHeight={true} fillParent={true}>
          <RouteWithProps exact path="/p/:username" user={this.state.user} component={Home} />
          <RouteWithProps path="/p/:username/:page" user={this.state.user} component={ProfilePage} />
        </Drilldown>
      </div>
    );
  }
}

export { Profile };
