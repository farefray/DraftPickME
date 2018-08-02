import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "@/actions";
import { storage } from "@/firebase";
// Import React FilePond and file type validation for it
import { FilePond, File, registerPlugin } from "react-filepond";
import FilepondPluginFileValidateType from "filepond-plugin-file-validate-type";
registerPlugin(FilepondPluginFileValidateType);

// Import FilePond styles
import "filepond/dist/filepond.min.css";

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
        cvFile: [], // TODO 
        photo: [],
        github: profile.github || "",
        facebook: profile.facebook || "",
        linkedin: profile.linkedin || ""
      }
    };
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired,
    authUser: PropTypes.object.isRequired
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    console.log("change event");
    console.log(name, value);

    let profile = this.state.profile;
    profile[name] = value;
    this.setState({
      profile
    });
  };

  render() {
    if (!this.props.canEdit) {
      // todo better way handle authorized page. I know its bad.
      return (
        <section id="username_404">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 container-404">
                <h2>403 - Forbidden.</h2>
                <hr className="container-404-hr" />
                <div className="container-404-form">Access restricted.</div>
                <p>&nbsp;</p>
                <Link to="/" className="btn btn-link">
                  Return
                </Link>
              </div>
            </div>
          </div>
        </section>
      );
    }

    const handleProcessing = (fieldName, file, metadata, load, error, progress, abort) => {
      // handle file upload here
      console.log(" handle file upload here");
      console.log(file);
  
      let uploadTask = storage.uploadFile(file);
      progress(true, 0, 1);
      uploadTask.on(
        `state_changed`,
        snapshot => {
          console.log(snapshot.bytesTransferred, snapshot.totalBytes);
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentage);
            progress(true, percentage, 1);
        },
        error => {
          //Error
          console.log(error);
          abort();
        },
        () => {
          //Success
          
        }
      );
  
      uploadTask.then(snapshot => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          load(downloadURL);
  
          let profile = this.state.profile;
          profile.cvFile[0] = downloadURL;
          this.setState({
            profile
          });
        });
      });
    }

    const handleInputChange = event => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      console.log("change event");
      console.log(name, value);

      let profile = this.state.profile;
      profile[name] = value;
      this.setState({
        profile
      });
    };

    const handleSubmit = event => {
      const { profile } = this.state;
      this.props.dispatch(userActions.edit(this.props.authUser.uid, profile));
      event.preventDefault();
    };

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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nameInput">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  placeholder="Jane"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                server={{ process: handleProcessing }}>
                {profile.cvFile.map((file, index) => <File key={index} source={file} />)}
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
                {profile.photo.map(file => <File key={file} source={file} />)}
              </FilePond>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authUser } = state.authentication;
  return {
    authUser
  };
}

const connectedEditProfile = connect(mapStateToProps)(EditProfile);
export { connectedEditProfile as EditProfile };
