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
    users: null,
    loaded: false
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
      this.setState({ users: snapshot.val(), loaded: true });
    });
  }

  render() {
    let { users, loaded } = this.state;
    const { authUser } = this.props;

    return (
      <div id="home" className="large-header">
        <canvas id="demo-canvas" />
        <div id="large-header">
          <div className="homepage-container">
            <div className="homepage-logo animated fadeIn">
              <LogoBlock />
              <div className="user-list">
                <UserList users={users} />
              </div>
            </div>

            <div className="project-description col-md-5 animated fadeIn">
              <h3>Hello, my name is Maksym Fedan.</h3>
              <h4>This website was created in order to learn React and to partially show my learning and developing skills. Now I`m searching for a job as the Frontend/Full-stack developer and here you can see <span className="fancy"><Link to="/p/farefray">more information</Link></span> about my skills and experience. <br/>In case you are also seeking for an experienced QA <span className="fancy"><Link to="/p/julz">I can recommend you one ;)</Link></span> And if you are not a recrutier but a person who is searching for a job just like me, you can <span className="fancy"><Link to="/register">create a resume profile</Link></span> for yourself.</h4>
            </div>
            
            {loaded ? <div className="action-buttons animated fadeIn">
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
            </div> : <div/>}
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
