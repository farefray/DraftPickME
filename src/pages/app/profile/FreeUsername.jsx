import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

class FreeUsername extends React.PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired
  };

  render() {
    const { username } = this.props;

    return (
      <section id="username_404">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 container-404">
              <h2>404 - No such profile.</h2>
              <hr className="container-404-hr" />
              <div className="container-404-form">
                Username `{username}` is free to use. Would you like to <Link to="/register">register</Link> your resume using such nickname?
              </div>
              <p>&nbsp;</p>
              <Link to="/" className="btn btn-link">Back to main</Link>
              <Link to="/register" className="btn btn-link right">Register</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export { FreeUsername };
