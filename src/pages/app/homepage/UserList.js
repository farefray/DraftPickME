import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const profileLink = username => {
  return "/p/" + username;
};

const UserList = (props) => {
  const { users } = props;

  if (users === null) {
    return "Loading...";
  }

  return  (<div>
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
  </div>);
}

UserList.propTypes = {
  users: PropTypes.object
};

export default UserList;
