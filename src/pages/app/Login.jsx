import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../../actions";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    // reset login status
    this.state = { ...INITIAL_STATE };

    // todo get rid of bind
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(userActions.login(email, password));
    }
  };

  render() {
    const { email, password } = this.state;
    const cannotSubmit = password === "" || email === "";

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Authorize Yourself</h2>
        <form name="form" onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" disabled={cannotSubmit}>
              Sign In
            </button>
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
            <Link to="/" className="btn btn-link right">
              Back
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };
