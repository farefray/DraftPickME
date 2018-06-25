import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../actions";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    };

    console.log(this.state);


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert("submit");
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
                      value={this.state.user.firstName}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="surnameInput">Surname</label>
                    <input
                      type="email"
                      className="form-control"
                      id="surnameInput"
                      placeholder="Doe"
                      value={this.state.user.lastName}
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
                      value={this.state.user.title}
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
                        value={this.state.user.username}
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
                        name="profileEnabled"
                        type="checkbox"
                        checked={this.state.user.profileEnabled}
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={this.saveProfile()}
                    >
                      Save my profile
                    </button>
                    <Link
                      to="/"
                      className="right btn btn-default"
                      onClick={this.handleLogout()}
                    >
                      Logout
                    </Link>
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
