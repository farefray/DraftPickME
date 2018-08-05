import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const profileLink = username => {
  return "/p/" + username;
};

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.buttonRef = React.createRef();
    this.listRef = React.createRef();

    this.state = {
      opened: false
    };
  }

  render() {
    const { users } = this.props;
    const { opened } = this.state;
    
    if (users === null) {
      return <div>Loading...</div>;
    }
  
    let eButtonClass = "e-button" + (opened ? " open" : "");
    let listClass = "e-list" + (!opened ? " closed" : "");
    return (<li className="m-dropdown">
    <div className={eButtonClass} onClick={() => {
      console.log('asd');
      this.setState((prevState) => {
        return {opened: !prevState.opened};
      });
    }}>
      View profiles
      <div className="e-burger">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <ul className={listClass}>
      {Object.keys(users).map(
        key =>
          users[key].enabled ? (
            <li key={key}>
              <Link to={profileLink(users[key].username)}>
                {users[key].firstName + " " + users[key].lastName}
                <span className="thin">{users[key].title ? ", " + users[key].title : ""}</span>
              </Link>
            </li>
          ) : (
            ""
          )
      )}
    </ul>
  </li>);
  }
}


UserList.propTypes = {
  users: PropTypes.object
};

export default UserList;
