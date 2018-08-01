import React from "react";
import PropTypes from "prop-types";

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
    let backgroundImageStyle = {
      background:
        "darkgray no-repeat center center fixed",
      backgroundSize: "cover",
      backgroundColor: "#333",
      backgroundBlendMode: "overlay",
      height: "100%"
    };

    console.log('profile');
    console.log(this.props);
    return (
      <div id="home" className="large-header" style={backgroundImageStyle}>
        <canvas id="demo-canvas"></canvas>
        <div id="large-header">
          <div className="relative-table">
            <div className="table-cell">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h1><span className="thin">Hi! I'm {this.props.profile.firstName} {this.props.profile.lastName}</span></h1>
                    <h4 className="sup-home">{this.props.profile.title}</h4>
                    <a className="button text-center" href="downloads/cv.pdf"><i className="fa fa-download"></i> Download Cv</a>
                    <a className="button-style-2 text-center smooth" href="#about"><i className="fa fa-file-text"></i> More About Me</a>
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

export {Home};
