import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { userActions } from "@/actions";
import Uploads from "./editprofile/Uploads";
import Forbidden from "@/pages/components/Forbidden";

const emptyFiles = {
  cvFile: {
    name: "",
    path: ""
  },
  photo: ""
};

const emptyUploads = {
  // actually storing this just to avoid redrawing of uploaded component once upload successed
  cvFile: emptyFiles.cvFile,
  photo: emptyFiles.photo
};

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    let profile = { ...props.profile };
    this.state = {
      profile: {
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        username: profile.username || "",
        email: profile.email || "",
        phone: profile.phone || "",
        title: profile.title || "",
        enabled: profile.enabled || false,
        cvFile: profile.cvFile || emptyFiles.cvFile,
        photo: profile.photo || emptyFiles.photo,
        github: profile.github || "",
        facebook: profile.facebook || "",
        linkedin: profile.linkedin || ""
      },
      uploads: emptyUploads
    };
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired
  };

  handleSubmit = event => {
    const { profile, uploads } = this.state;
    if (uploads.cvFile.path !== "" && uploads.cvFile.path !== profile.cvFile.path || uploads.cvFile.name !== profile.cvFile.name) {
      profile.cvFile = uploads.cvFile;
    }

    if (uploads.photo !== "" && uploads.photo !== profile.photo) {
      profile.photo = uploads.photo;
    }

    // Issue. This way we are not updating userprofile which is currently being used for pages. Changes will be updated only after page reload. This need to be fixed, by storing profile in redux and updating it.
    console.log(profile);
    this.props.dispatch(userActions.edit(profile));
    event.preventDefault();
  }

  profileChange = (name, value) => {
    let { profile } = this.state;
    profile[name] = value;
    this.setState(() => ({ profile: profile }));
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    return this.profileChange(name, value);
  };

  render() {
    if (!this.props.canEdit) {
      // todo better way handle authorized page. I know its bad. P3
      return <Forbidden />;
    }

    const { profile } = this.state;
    return (
      <div id="profile_edit">
        <div className="row">
          <div className="col-md-6 col-md-offset-2">
            <h2>
              <span className="thin">Hello</span> {this.props.profile.firstName}
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
                disabled="true"
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
            <Uploads
              onSuccessfullUpload={(name, value) => {
                let { uploads } = this.state;
                uploads[name] = value;
                this.setState(() => ({ uploads: uploads }));
              }}
              profile={profile}
              removeFile={type => {
                let { profile, uploads } = this.state;
                profile[type] = emptyFiles[type];
                uploads[type] = emptyFiles[type];
                this.setState({
                  profile,
                  uploads
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(dispatch);
const connectedEditProfile = connect(mapDispatchToProps)(EditProfile);
export { connectedEditProfile as EditProfile };
