import React from "react";
import { Route, Switch } from "react-router-dom";
import Drilldown from "react-router-drilldown";
import { Navigation } from "../components/Navigation";
import {
  AboutPage,
  EducationPage,
  ExperiencePage,
  PortfolioPage,
  ContactPage,
  Home
} from "./profile/";

const ProfilePage = ({ match }) => (
  // here's a nested div
  <div>
    <Route
      path={"/p" + match.params.username + "/about"}
      component={AboutPage}
    />
    <Route
      exact
      path={"/p" + match.params.username + "/education"}
      component={EducationPage}
    />
    <Route
      exact
      path={"/p" + match.params.username + "/experience"}
      component={ExperiencePage}
    />
    <Route
      exact
      path={"/p" + match.params.username + "/portfolio"}
      component={PortfolioPage}
    />
    <Route
      exact
      path={"/p" + match.params.username + "/contact"}
      component={ContactPage}
    />
  </div>
);

export { ProfilePage };

function Profile(props) {
  return (
    <div>
      <Navigation username={props.match.params.username}/>
      <Drilldown animateHeight={true} fillParent={true}>
        <Route exact path="/p/:username" component={Home} />
        <Route path="/p/:username" component={ProfilePage} />
      </Drilldown>
    </div>
  );
}

export { Profile };
