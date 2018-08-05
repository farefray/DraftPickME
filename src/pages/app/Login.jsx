import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "@/actions";
import { AwesomeButton } from "react-awesome-button";

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    // reset login status
    this.state = {
      email: "",
      password: "",
      error: null
    };
  }

  render() {
    const { email, password } = this.state;
    const cannotSubmit = password === "" || email === "";

    return (
      <div id="login" className="col-md-6 col-md-offset-3">
        <h2>Authorize Yourself</h2>
        <form
          name="form"
          onSubmit={e => {
            e.preventDefault();

            const { email, password } = this.state;
            if (email && password) {
              this.props.dispatch(userActions.login(email, password));
            }
          }}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={event => {
                let { email } = this.state;
                email = event.target.value;
                this.setState({ email });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={event => {
                let { password } = this.state;
                password = event.target.value;
                this.setState({ password });
              }}
            />
          </div>
          <div className="form-group">
            <AwesomeButton disabled={cannotSubmit} type="primary">
              Sign In
            </AwesomeButton>

            <AwesomeButton type="secondary" element={Link} to={`/register`}>
            Register
            </AwesomeButton>

            <Link to="/" className="btn btn-link right">
              Back
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);
const connectedLogin = connect(mapDispatchToProps)(Login);
export { connectedLogin as Login };
