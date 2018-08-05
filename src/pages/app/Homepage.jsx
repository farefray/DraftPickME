import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { db } from "@/firebase"; // move to service or action TODO P2
import SignOutButton from "@/pages/components/SignOutButton";
import { AwesomeButton } from "react-awesome-button";
import {
  initHeader,
  initAnimation,
  addListeners
} from "@/js/homepageAnimation";
import UserList from "./homepage/UserList";
import LogoBlock from "./homepage/LogoBlock";

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
          <div className="homepage-container">
            <div className="col-md-6">
              <LogoBlock />
            </div>

            <div className="project-description col-md-3">
              <h3>Hello, my name is Maksym Fedan.</h3>
              <h4>This website was created in order to learn React and to partially show off my learning posibilities and developing skills. Here, you can create a resume profile for yourself, or browse existing.</h4>
            </div>
            
            <div className="user-list">
              <UserList users={users} />
            </div>

            <div className="action-buttons">
              {!authUser ? (
                <AwesomeButton type="primary" element={Link} to={`/login`}>
                  Login / Register
                </AwesomeButton>
              ) : (
                <React.Fragment>
                  <AwesomeButton
                    type="primary"
                    element={Link}
                    to={
                      "/p/" +
                      (users && authUser && authUser.uid
                        ? users[authUser.uid].username
                        : "") +
                      "/edit"
                    }>
                    Edit your profile
                  </AwesomeButton>

                  <SignOutButton />
                </React.Fragment>
              )}
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
