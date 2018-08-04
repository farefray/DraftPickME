import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  initHeader,
  initAnimation,
  addListeners
} from "../../../js/homepageAnimation.js";

class Home extends React.Component {
  static propTypes = {
    profile: PropTypes.object
  };

  componentDidMount() {
    initHeader();
    initAnimation();
    addListeners();
  }

  render() {
    console.log("profile");
    let { profile } = this.props;
    return (
      <div id="home" className="large-header">
        <canvas id="demo-canvas" />
        <div id="large-header">
          <div className="relative-table">
            <div className="table-cell">
              <div className="container">
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
                    <Link to={"/p/" + profile.username + "/about"} className="button-style-2 text-center smooth">
                      <i className="fa fa-file-text" /> More About Me
                    </Link>
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
