import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '@/actions';


const INITIAL_STATE = {
  user: {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  },
  error: null,
};

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  handleSubmit = event => {
    const { user } = this.state;

    this.props.dispatch(userActions.register(user));

    event.preventDefault();
  };

  render() {
    const { username, email, password, passwordConfirm } = this.state.user;
    const { error } = this.state;

    const cannotSubmit =
      password !== passwordConfirm ||
      password === '' ||
      email === '' ||
      username === '';

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={event => {
                const { user } = this.state;
                user.username = event.target.value;
                this.setState({ user });
              }}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={event => {
                const { user } = this.state;
                user.email = event.target.value;
                this.setState({ user });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              value={password}
              onChange={event => {
                const { user } = this.state;
                user.password = event.target.value;
                this.setState({ user });
              }}
              type="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              className="form-control"
              value={passwordConfirm}
              onChange={event => {
                const { user } = this.state;
                user.passwordConfirm = event.target.value;
                this.setState({ user });
              }}
              type="password"
            />
          </div>
          <div className="form-group">{error && <p>{error.message}</p>}</div>
          <div className="form-group">
            <button className="btn btn-primary" disabled={cannotSubmit}>
              Register
            </button>
            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const connectedRegistration = connect()(Register);
export { connectedRegistration as Register };
