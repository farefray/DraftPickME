import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../actions";

// Import React FilePond
import { FilePond, File } from "react-filepond";
import FilepondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Import FilePond styles
import "filepond/dist/filepond.min.css";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    // todo better way. Object desctructing or smt
    let { user } = props;
    this.state = {
      id: user.id,
      firstName: user.firstName ? user.firstName : "",
      lastName: user.lastName ? user.lastName : "",
      username: user.username ? user.username : "",
      title: user.title ? user.title : "",
      enabled: user.enabled ? user.enabled : false,
      cv_file: [],
      photo: []
    };

    console.log(this.state);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    console.log("change event");
    console.log(name, value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const user = this.state; // todo make user inside of state and {user}
    this.props.dispatch(userActions.edit(user));

    event.preventDefault();
  }

  handleLogout() {
    return e => {
      e.preventDefault();
      this.props.dispatch(userActions.logout(true));
    };
  }

  saveProfile() {}

  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-md-offset-2">
            <h2>
              <span className="thin">Hello</span> {user.firstName}<span className="thin">! Edit your profile before publishing!</span>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-md-offset-2">
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
                <label className="checkbox-inline" htmlFor="enabledCheckbox">
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
                    aria-label="Basic example">
                    <Link
                      to={"/p/" + this.state.username}
                      className="btn btn-primary">
                      Back
                    </Link>
                    <a
                      href="#"
                      className="btn btn-primary"
                      onClick={this.handleLogout()}>
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="surnameInput">Upload your CV:</label>
              <FilePond
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/jpeg']}
                allowMultiple={false}
                maxFiles={1}
                labelIdle={
                  'Drag & Drop or <span class="filepond--label-action"> Browse </span>'
                }
                server="/api/upload">
                {this.state.cv_file.map(file => (
                  <File key={file} source={file} />
                ))}
              </FilePond>
            </div>
            <div className="form-group">
              <label htmlFor="surnameInput">Upload your photo:</label>
              <FilePond
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/jpeg', 'image/png']}
                allowMultiple={false}
                maxFiles={1}
                labelIdle={
                  'Drag & Drop or <span class="filepond--label-action"> Browse </span>'
                }
                server="/api/upload">
                {this.state.photo.map(file => (
                  <File key={file} source={file} />
                ))}
              </FilePond>
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
