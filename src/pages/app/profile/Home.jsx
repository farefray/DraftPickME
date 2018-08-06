import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import { initHeader, initAnimation, addListeners } from "../../../js/homepageAnimation.js";

class Home extends React.Component {
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
    let { profile } = this.props;
    return (
      <div id="home" className="large-header">
        <canvas id="demo-canvas" />
        <div id="large-header">
          <div className="relative-table">
            <div className="table-cell">
              <div className="container animated fadeIn">
                <div className="row">
                  <div className="col-md-12">
                    <h1>
                      <span className="thin">
                        Hi! I'm {profile.firstName} {profile.lastName}
                      </span>
                    </h1>
                    <h4 className="sup-home">{profile.title}</h4>
                    {profile.cvFile && profile.cvFile.path ? (
                      <a
                        className="button text-center"
                        href={profile.cvFile.path}
                        target="_blank"
                        rel="noopener noreferrer">
                        <i className="fa fa-download" /> Download CV
                      </a>
                    ) : (
                      ""
                    )}
                    <AwesomeButton type="primary" size="large" className="text-center" element={Link} to={"/p/" + profile.username + "/about"}>
                    <i className="fa fa-file-text" /> More About Me
                    </AwesomeButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Home };
