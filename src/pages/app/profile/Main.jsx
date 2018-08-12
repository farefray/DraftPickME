import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import { ProfileContext } from "./components/ProfileContext";
import {
  initHeader,
  initAnimation,
  addListeners
} from "@/js/homepageAnimation";

class Main extends React.Component {
  static propTypes = {
    profile: PropTypes.object
  };

  componentDidMount() {
    // TODO P3 animation not working once its router redirect from main page
    initHeader();
    initAnimation();
    addListeners();
  }

  render() {
    return (
      <ProfileContext.Consumer>
        {profileContext => (
          <div id="home" className="large-header">
            <canvas className="demo-canvas" />
            <div className="large-header">
              <div className="relative-table">
                <div className="table-cell">
                  <div className="container animated fadeIn">
                    <div className="row">
                      <div className="col-md-12">
                        <h1>
                          <span className="thin">
                            Hi! I'm {profileContext.profile.firstName} {profileContext.profile.lastName}
                          </span>
                        </h1>
                        <h4 className="sup-home">{profileContext.profile.title}</h4>
                        <AwesomeButton
                          type="primary"
                          size="large"
                          className="text-center"
                          element={Link}
                          to={"/p/" + profileContext.profile.username + "/about"}>
                          <i className="fa fa-file-text" /> More About Me
                        </AwesomeButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ProfileContext.Consumer>
    );
  }
}

export { Main };
