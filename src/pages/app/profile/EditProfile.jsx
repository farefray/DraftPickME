import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withAuthorization from "@/pages/components/WithAuthorization";
import { userActions } from "@/actions";

// Import React FilePond and file type validation for it
import { FilePond, File, registerPlugin } from "react-filepond";
import FilepondPluginFileValidateType from "filepond-plugin-file-validate-type";
registerPlugin(FilepondPluginFileValidateType);

// Import FilePond styles
import "filepond/dist/filepond.min.css";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    // todo better way descructing, ||?
    let { profile } = props;
    console.log(profile);
    this.state = {
      profile: {
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        username: profile.username || "",
        email: profile.email || "",
        phone: profile.phone || "",
        title: profile.title || "",
        enabled: profile.enabled || false,
        cvFile: [],
        photo: [],
        github: profile.github || "",
        facebook: profile.facebook || "",
        linkedin: profile.linkedin || ""
      }
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
    let updatedUser = this.state.user;
    updatedUser[name] = value;
    this.setState({
      user: updatedUser
    });
  }

  handleSubmit(event) {
    const { user } = this.state; // todo make user inside of state and {user}
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
    const { profile } = this.state;
    return (
      <div id="profile_edit">
        <div className="row">
          <div className="col-md-6 col-md-offset-2">
            <h2>
              <span className="thin">Hello</span> {profile.firstName}
              <span className="thin">
                ! Edit your profile before publishing!
              </span>
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
                  value={profile.firstName}
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
                  value={profile.lastName}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="titleInput">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="titleInput"
                  placeholder="Job title"
                  name="title"
                  value={profile.title}
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
                    data-toggle="tooltip"
                    title="Your login and profile URL"
                    name="username"
                    value={profile.username}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="githubInput">GitHub</label>
                <input
                  type="text"
                  className="form-control"
                  id="githubInput"
                  placeholder="GitHub profile"
                  name="github"
                  value={profile.github}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="LinkedInInput">LinkedIn</label>
                <input
                  type="text"
                  className="form-control"
                  id="LinkedInInput"
                  placeholder="LinkedIn profile"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="facebookInput">Facebook</label>
                <input
                  type="text"
                  className="form-control"
                  id="facebookInput"
                  placeholder="Facebook profile"
                  name="facebook"
                  value={profile.facebook}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="checkbox-inline" htmlFor="enabledCheckbox">
                  Profile enabled:
                  <input
                    id="enabledCheckbox"
                    name="enabled"
                    type="checkbox"
                    checked={profile.enabled}
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
                      to={"/p/" + profile.username}
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
              <label htmlFor="emailInput">Email</label>
              <input
                type="text"
                className="form-control"
                id="emailInput"
                placeholder="john.doe@gmail.com"
                name="email"
                value={profile.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneInput">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phoneInput"
                placeholder="+XXXXXXXXXXXX"
                name="phone"
                value={profile.phone}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="surnameInput">Upload your CV:</label>
              <FilePond
                allowFileTypeValidation={true}
                acceptedFileTypes={[
                  "application/msword",
                  "application/vnd.oasis.opendocument.text",
                  "application/rtf",
                  "text/plain",
                  "text/html",
                  "application/pdf"
                ]}
                allowMultiple={false}
                maxFiles={1}
                labelIdle={
                  'Drag & Drop or <span class="filepond--label-action"> Browse </span>'
                }
                server="/api/upload">
                {profile.cvFile.map(file => (
                  <File key={file} source={file} />
                ))}
              </FilePond>
            </div>
            <div className="form-group">
              <label htmlFor="surnameInput">Upload your photo:</label>
              <FilePond
                allowFileTypeValidation={true}
                acceptedFileTypes={["image/jpeg", "image/png"]}
                allowMultiple={false}
                maxFiles={1}
                labelIdle={
                  'Drag & Drop or <span class="filepond--label-action"> Browse </span>'
                }
                server="/api/upload">
                {profile.photo.map(file => (
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

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(EditProfile);
