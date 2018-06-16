import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../actions";

import {
  initHeader,
  initAnimation,
  addListeners
} from "../js/homepageAnimation.js";

class Homepage extends React.Component {
  componentDidMount() {
    initHeader();
    initAnimation();
    addListeners();

    this.props.dispatch(userActions.getAll());
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  handleLogout() {
    return e => this.props.dispatch(userActions.logout());
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

    let backgroundImageStyle = {
      background:
        "url('http://placehold.it/1920x1280') no-repeat center center fixed",
      backgroundSize: "cover",
      backgroundColor: "#333",
      backgroundBlendMode: "overlay",
      height: "100%"
    };

    return (
      <div id="home" className="large-header" style={backgroundImageStyle}>
        <canvas id="demo-canvas" />
        <div id="large-header">
          <div className="relative-table">
            <div className="table-cell">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-md-offset-3">
                    <h1>
                      <span className="thin">Hello </span>{" "}
                      {user && user.firstName ? user.firstName : "guest"}
                    </h1>
                    <div>
                      {users && !users.error ? usersBlock : ""}
                    </div>

                    <Link to="/">Back</Link>
                    <Link
                      to="/"
                      className="right"
                      onClick={this.handleLogout()}
                    >
                      Logout
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

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomepage = connect(mapStateToProps)(Homepage);
export { connectedHomepage as Homepage };
