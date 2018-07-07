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
    console.log(this.props);
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.remove(id));
  }

  handleLogout() {
    return e => this.props.dispatch(userActions.logout());
  }

  render() {
    const { currentUser, users, auth } = this.props;

    const profileLink = username => {
      return "/p/" + username;
    };

    // todo access control
    const userDeleteBlock = user => (
      <span>
        {user.deleting ? (
          <em> - Deleting...</em>
        ) : user.deleteError ? (
          <span className="text-danger"> - ERROR: {user.deleteError}</span>
        ) : (
          <span>
            {" "}
            - <a onClick={this.handleDeleteUser(user.id)}>Delete</a>
          </span>
        )}
      </span>
    );

    const usersBlock = (
      <div>
        {users.loading && <em>Loading users...</em>}
        {users.error && <span>Error: {users.error}</span>}
        {users.items && (
          <div>
            <h3>Take a look at our resumes:</h3>
            <ul>
              {users.items.map((user, index) => (
                <li key={user.id}>
                  <Link to={profileLink(user.username)}>
                    {user.firstName + " " + user.lastName}
                  </Link>
                  {userDeleteBlock(user)}
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
                      {auth && currentUser.firstName
                        ? currentUser.firstName
                        : "guest"}
                    </h1>
                    <div>{users && !users.error ? usersBlock : ""}</div>

                    {!auth ? (
                      <Link to="/login" className="right">
                        Login / Register
                      </Link>
                    ) : (
                      <Link
                        to="/"
                        className="btn btn-primary right"
                        onClick={this.handleLogout()}
                      >
                        Logout
                      </Link>
                    )}
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
  console.log(state);
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    currentUser: user,
    users,
    auth: !!(authentication && authentication.loggedIn)
  };
}

const connectedHomepage = connect(mapStateToProps)(Homepage);
export { connectedHomepage as Homepage };
