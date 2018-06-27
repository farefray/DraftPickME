import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../actions';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    // todo better way. Object desctructing or smt
    this.state = {
      id: props.user.id,
      firstName: props.user.firstName ? props.user.firstName : '',
      lastName: props.user.lastName ? props.user.lastName : '',
      username: props.user.username ? props.user.username : '',
      title: props.user.title ? props.user.title : '',
      enabled: props.user.enabled ? props.user.enabled : false
    };

    console.log(this.state);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log('change event');
    console.log(name, value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const user = this.state; // todo make user inside of state and {user}
    const { dispatch } = this.props;
    dispatch(userActions.edit(user));

    event.preventDefault();
  }

  handleLogout() {
    return e => this.props.dispatch(userActions.logout());
  }

  saveProfile() {}

  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1>
              <span className="thin">Hello</span> {user.firstName}!
            </h1>
            <div>
              <h4>Here you can edit your profile:</h4>
              <div className="row">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nameInput">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameInput"
                      placeholder="Jane"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="surnameInput">Surname</label>
                    <input
                      type="text"
                      className="form-control"
                      id="surnameInput"
                      placeholder="Doe"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="titleInput">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="titleInput"
                      placeholder="experienced IT Engineer / Webdeveloper"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">#</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-describedby="basic-addon1"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label
                      className="checkbox-inline"
                      htmlFor="enabledCheckbox"
                    >
                      Profile enabled:
                      <input
                        id="enabledCheckbox"
                        name="enabled"
                        type="checkbox"
                        checked={this.state.enabled}
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-success">
                      Save my profile
                    </button>
                    <div className="right">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <Link to="/" className="btn btn-primary">
                          Back
                        </Link>
                        <Link
                          to="/"
                          className="btn btn-primary"
                          onClick={this.handleLogout()}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
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
