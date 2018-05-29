import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../actions";

import {
  initHeader,
  initAnimation,
  addListeners
} from "../js/homepageAnimation.js";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());

    // TODO configurable particles based on profile
    initHeader();
    initAnimation();
    addListeners();
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  render() {
    const { user, users } = this.props;

    const usersBlock = (
      <div>
        {users.loading && <em>Loading users...</em>}
        {users.error && <span>Error: {users.error}</span>}
        {users.items && (
          <div>
            <h3>All registered users:</h3>
            <ul>
              {users.items.map((user, index) => (
                <li key={user.id}>
                  {user.firstName + " " + user.lastName}
                  {user.deleting ? (
                    <em> - Deleting...</em>
                  ) : user.deleteError ? (
                    <span className="text-danger">
                      {" "}
                      - ERROR: {user.deleteError}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      - <a onClick={this.handleDeleteUser(user.id)}>Delete</a>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );

    const authBlock = (
      <p>
        {user ? (
          <Link to="/login">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </p>
    );

    let backgroundImageStyle = {
      background:
        "url('http://placehold.it/1920x1280') no-repeat center center fixed",
      backgroundSize: "cover",
      backgroundColor: "#333",
      backgroundBlendMode: "overlay",
      height: "100%"
    };

    return (
      <div id="home" className="demo-1">
        <div
          id="large-header"
          className="large-header"
          style={backgroundImageStyle}
        >
          <canvas id="demo-canvas" />
          <div className="container">
            <div className="row">
              <div className="table">
                <div className="table-cell">
                  <div className="container">
                    <div className="col-md-8">
                      <h1>
                        <span className="thin">Hi! I'm</span>{" "}
                        {user && user.firstName ? user.firstName : "guest"}
                      </h1>
                      <h4 className="sup-home">
                        experienced IT Engineer / Webdeveloper
                      </h4>
                      <div>
                        {user && <p>You're logged in with React!!</p>}

                        {users && !users.error ? usersBlock : ""}
                        <Link to="/profile">Edit profile</Link>
                        {authBlock}
                      </div>
                      <a className="button text-center" href="downloads/cv.pdf">
                        <i className="fa fa-download" /> Download Cv
                      </a>
                      <a
                        className="button-style-2 text-center smooth"
                        href="#about"
                      >
                        <i className="fa fa-file-text" /> More About Me
                      </a>
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
