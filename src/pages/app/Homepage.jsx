import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { db } from "@/firebase"; // move to service or action TODO P2
import SignOutButton from "@/pages/components/SignOut";

import {
  initHeader,
  initAnimation,
  addListeners
} from "@/js/homepageAnimation";

const profileLink = username => {
  return "/p/" + username;
};

const UserList = ({ users }) => (
  <div>
    <h2>List of users</h2>
    {Object.keys(users).map(
      key =>
        users[key].enabled ? (
          <div key={key}>
            <Link to={profileLink(users[key].username)}>
              {users[key].firstName + " " + users[key].lastName}
            </Link>{" "}
          </div>
        ) : (
          ""
        )
    )}
  </div>
);

UserList.propTypes = {
  users: PropTypes.object.isRequired
};

class Homepage extends React.Component {
  state = {
    users: null
  };

  static propTypes = {
    authUser: PropTypes.object
  };

  componentDidMount() {
    initHeader();
    initAnimation();
    addListeners();

    // todo move to some service P2
    db.onceGetUsers().then(snapshot => {
      this.setState({ users: snapshot.val() });
    });
  }

  render() {
    const { users } = this.state;
    const { authUser } = this.props;

    console.log(this.props);
    const usersBlock = (
      <div>
        {!users && <em>Loading users...</em>}
        {!!users && <UserList users={users} />}
      </div>
    );

    return (
      <div id="home" className="large-header">
        <canvas id="demo-canvas" />
        <div id="large-header">
          <div className="relative-table">
            <div className="table-cell">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    What does it mean to be a draft pick? A draft is a process
                    used in some countries and sports to allocate certain
                    players to teams. In a draft, teams take turns selecting
                    from a pool of eligible players. When a team selects a
                    player, the team receives exclusive rights to sign that
                    player to a contract, and no other team in the league may
                    sign the player.
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-md-offset-3">
                    <div>{users && usersBlock}</div>
                    {!authUser ? (
                      <Link to="/login" className="right">
                        Login / Register
                      </Link>
                    ) : (
                      <SignOutButton />
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
  const { authUser } = state.authentication;
  return {
    authUser
  };
}

const connectedHomepage = connect(mapStateToProps)(Homepage);
export { connectedHomepage as Homepage };
