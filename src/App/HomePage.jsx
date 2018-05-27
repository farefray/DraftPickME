import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../actions";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
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

    return (
      <div className="col-md-12">
        <div className="col-md-6 col-md-offset-3">
          <Link to="/profile">Edit profile</Link>
        </div>
        <div className="col-md-6 col-md-offset-3">
          <h1>Hi {user && user.firstName ? user.firstName : "guest"}!</h1>
          {user && <p>You're logged in with React!!</p>}

          {users && !users.error ? usersBlock : ""}

          {authBlock}
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
