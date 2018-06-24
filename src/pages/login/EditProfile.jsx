
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class EditProfile extends React.Component {

  handleLogout() {
    return e => this.props.dispatch(userActions.logout());
  }

  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1>
              <span className="thin">Hi! I'm</span>{" "}
              {user && user.firstName ? user.firstName : "guest"}
            </h1>
            <div>
              {user && <p>You're logged in with React!!</p>}

            </div>

            <Link to="/">Back</Link>
            <Link to="/" className="right" onClick={
              this.handleLogout()
              }>Logout</Link>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedEditProfile = connect(mapStateToProps)(EditProfile);
export { connectedEditProfile as EditProfile };
