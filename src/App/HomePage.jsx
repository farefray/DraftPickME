import React from "react";
import { connect } from "react-redux";


import {
  initHeader,
  initAnimation,
  addListeners
} from "../js/homepageAnimation.js";

class HomePage extends React.Component {
  componentDidMount() {
    // TODO configurable particles based on profile
    initHeader();
    initAnimation();
    addListeners();
  }

  render() {
    let backgroundImageStyle = {
      background:
        "url('http://placehold.it/1920x1280') no-repeat center center fixed",
      backgroundSize: "cover",
      backgroundColor: "#333",
      backgroundBlendMode: "overlay",
      height: "100%"
    };

    return (
      <div id="home" style={backgroundImageStyle}>
        <div id="particles-js">
          <div className="container">
            <div className="row">
              <div className="table">
                <div className="table-cell">
                  <div className="container">
                    <div className="col-md-8">
                      <h1><span className="thin">Hi! I'm</span> Johnathan Doe</h1>
                      <h4 className="sup-home">experienced IT Engineer / Webdeveloper</h4>
                      <a className="button text-center" href="downloads/cv.pdf"><i className="fa fa-download"></i> Download Cv</a>
                      <a className="button-style-2 text-center smooth" href="#about"><i className="fa fa-file-text"></i> More About Me</a>
                    </div>
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

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
