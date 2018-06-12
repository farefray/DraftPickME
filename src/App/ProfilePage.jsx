import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../actions";

class ProfilePage extends React.Component {
  componentDidMount() {
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

              {users && !users.error ? usersBlock : ""}
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
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
