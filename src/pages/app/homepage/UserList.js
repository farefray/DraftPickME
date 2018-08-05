import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const profileLink = username => {
  return "/p/" + username;
};

const UserList = (props) => {
  const { users } = props;

  if (users === null) {
    return <div>Loading...</div>;
  }

  return (<li className="m-dropdown">
	<div className="e-button open">
		View profiles
		<div className="e-burger">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
	<ul className="e-list">
    {Object.keys(users).map(
      key =>
        users[key].enabled ? (
          <li key={key}>
            <Link to={profileLink(users[key].username)}>
              {users[key].firstName + " " + users[key].lastName}
            </Link>{" "}
          </li>
        ) : (
          ""
        )
    )}
	</ul>
</li>);
}

UserList.propTypes = {
  users: PropTypes.object
};

export default UserList;
