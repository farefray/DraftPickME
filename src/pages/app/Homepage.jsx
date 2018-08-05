import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { db } from "@/firebase"; // move to service or action TODO P2
import SignOutButton from "@/pages/components/SignOut";
import { AwesomeButton } from "react-awesome-button";

import {
  initHeader,
  initAnimation,
  addListeners
} from "@/js/homepageAnimation";

import UserList from "./homepage/UserList";

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
                    <UserList users={users} />
                    {!authUser ? (
                      <AwesomeButton
                        type="primary"
                        element={Link}
                        to={`/login`}>
                        Login / Register
                      </AwesomeButton>
                    ) : (
                      <div
                        className="btn-group right"
                        role="group"
                        aria-label="Action buttons">
                        <Link
                          to={
                            "/p/" +
                            (users && authUser && authUser.uid
                              ? users[authUser.uid].username
                              : "") +
                            "/edit"
                          }
                          className="btn btn-success right">
                          Edit your profile
                        </Link>
                        <SignOutButton />
                      </div>
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
